import _ from "lodash";

export const abilityModifier = (ability) => {
  return Math.floor((ability - 10) / 2);
};

export const isBelongigToClass = (attributeArray, chosenClass) => {
  const attributes = {};
  attributeArray.forEach((item) => {
    const x = {
      [item.name]: item.value,
    };
    Object.assign(attributes, x);
  });

  console.log(attributes);
  console.log(chosenClass);

  return _.isEqualWith(attributes, chosenClass, (val1, val2) => {
    if (_.isObject(val1) && _.isObject(val2)) {
      for (const key in val1) {
        if (attributes[key] < chosenClass[key]) {
          return false;
        }
      }
    }
    return true;
  });
};
