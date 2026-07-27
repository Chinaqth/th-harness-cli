function typeMatches(value, expected) {
  if (expected === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  if (expected === "array") {
    return Array.isArray(value);
  }
  if (expected === "integer") {
    return Number.isInteger(value);
  }
  if (expected === "number") {
    return typeof value === "number" && Number.isFinite(value);
  }
  if (expected === "null") {
    return value === null;
  }
  return typeof value === expected;
}

function stableValue(value) {
  if (value && typeof value === "object") {
    return JSON.stringify(value, Object.keys(value).sort());
  }
  return JSON.stringify(value);
}

export function validateInstance(value, schema, location = "$") {
  const errors = [];
  if (!schema || typeof schema !== "object") {
    return [`${location}: schema must be an object`];
  }

  if ("const" in schema && stableValue(value) !== stableValue(schema.const)) {
    errors.push(`${location}: must equal ${JSON.stringify(schema.const)}`);
  }
  if (Array.isArray(schema.enum) && !schema.enum.some((item) => stableValue(item) === stableValue(value))) {
    errors.push(`${location}: must be one of ${schema.enum.map((item) => JSON.stringify(item)).join(", ")}`);
  }
  if (schema.type && !typeMatches(value, schema.type)) {
    errors.push(`${location}: must be ${schema.type}`);
    return errors;
  }

  if (typeof value === "string") {
    if (Number.isInteger(schema.minLength) && value.length < schema.minLength) {
      errors.push(`${location}: must contain at least ${schema.minLength} character(s)`);
    }
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      errors.push(`${location}: must match required pattern`);
    }
  }

  if (typeof value === "number" && typeof schema.minimum === "number" && value < schema.minimum) {
    errors.push(`${location}: must be at least ${schema.minimum}`);
  }

  if (Array.isArray(value)) {
    if (Number.isInteger(schema.minItems) && value.length < schema.minItems) {
      errors.push(`${location}: must contain at least ${schema.minItems} item(s)`);
    }
    if (schema.uniqueItems) {
      const normalized = value.map(stableValue);
      if (new Set(normalized).size !== normalized.length) {
        errors.push(`${location}: items must be unique`);
      }
    }
    if (schema.items) {
      value.forEach((item, index) => {
        errors.push(...validateInstance(item, schema.items, `${location}[${index}]`));
      });
    }
  }

  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    const properties = schema.properties || {};
    for (const required of schema.required || []) {
      if (!(required in value)) {
        errors.push(`${location}: missing required property ${required}`);
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!(key in properties)) {
          errors.push(`${location}: unexpected property ${key}`);
        }
      }
    }
    for (const [key, child] of Object.entries(properties)) {
      if (key in value) {
        errors.push(...validateInstance(value[key], child, `${location}.${key}`));
      }
    }
  }

  return errors;
}
