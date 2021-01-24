const menu = [
    {name: 'Lingonberry jam', price: 4.00},
    {name: 'Mushroom and bean casserole', price: 5.50},
    {name: 'Chili-flavoured wheat', price: 3.00},
    {name: 'Vegetarian soup', price: 4.80},
    {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00}
  ];
  
  // A
  
  // 1. a function that validates a name for a meal
  const validateMealName = (mealName) => {
    const namePattern = /^[A-ZÅÄÖ]{1}[a-zåäöA-ZÅÄÖ0-9\-\ \/,()]{3,63}$/;
    return namePattern.test(mealName);
  };
  // Testing the function
  console.log(validateMealName('Ääkkös-piiras, kuivattuja luteita (8) ja mansikkahilloa')); // true
  console.log(validateMealName('Abc')); // false, too short
  console.log(validateMealName('abcd')); // false, no capital letter
  for (const item of Object.values(menu)) {
    console.log(validateMealName(item.name));
  }
  
  // 2. Price based sort
  let result = menu.sort((a, b) => a.price - b.price);
  console.log('sorted', result);
  
  // 3. Items < 5€
  result = menu.filter(item => item.price < 5);
  console.log('filtered', result);
  
  // 4. Raise price 15%
  result = menu.map(item => item.price * 1.15);
  console.log('raised', result);
  
  // 5. Price sum (tip: https://stackoverflow.com/questions/5732043/javascript-reduce-on-array-of-objects)
  result = menu.reduce((a, b) => {
    return {price: a.price + b.price};
  });
  console.log('sum', result);
  
  // B
  
  import FazerMenu from './assets/fasu.json';
  // console.log(FazerMenu.LunchMenus[1].SetMenus);
  let vegeMeals = [];
  for (const setMenu of FazerMenu.LunchMenus[1].SetMenus) {
    for (const meal of setMenu.Meals) {
      if (meal.Diets.includes('Veg')) {
        vegeMeals.push(meal.Name);
      }
    }
  }
  console.log('vege meals', vegeMeals);
  // preserve some structure with .filter()
  vegeMeals = [];
  for (const setMenu of FazerMenu.LunchMenus[1].SetMenus) {
    vegeMeals.push(setMenu.Meals.filter(meal => meal.Diets.includes('Veg')));
  }
  console.log('vege meals with filter', vegeMeals);