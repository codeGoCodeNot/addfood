export const capitalize = (word) => {
  return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
};

export const calculateCalories = (carbs = 0, protein = 0, fats = 0) => {
  return carbs * 4 + protein * 4 + fats * 9;
};

console.log(calculateCalories(1, 1, 9));
