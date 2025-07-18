export class AppData {
  constructor() {
    this.food = [];
  }

  addFood(carbs, protein, fat) {
    this.food.push({
      carbs: Number.parseInt(carbs, 10),
      protein: Number.parseInt(protein, 10),
      fat: Number.parseInt(fat, 10),
    });
    console.log("Current food list:", this.food);
  }

  getTotalCarbs() {
    return this.food.reduce((total, item) => total + item.carbs, 0);
  }
  getTotalProtein() {
    return this.food.reduce((total, current) => total + current.protein, 0);
  }
  getTotalFat() {
    return this.food.reduce((total, current) => total + current.fat, 0);
  }

  getTotalCalories() {
    return (
      this.getTotalCarbs() * 4 +
      this.getTotalProtein() * 4 +
      this.getTotalFat() * 9
    );
  }
}
