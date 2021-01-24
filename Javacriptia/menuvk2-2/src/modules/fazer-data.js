import FazerLunchMenuEn from '../assets/fazer-week-example-en.json';
import FazerLunchMenu from '../assets/fazer-week-example.json';

/**
 * Parses a menu for a day from Fazer weekly json data
 *
 * @param {*} menuData - json data
 * @param {*} dayOfWeek - index number of the day (0: Monday)
 * @returns {Array} - meals for a day
 */
const parseDailyMenu = (menuData, dayOfWeek) => {
  // console.log('raw fazer menu data', menuData.LunchMenus[dayOfWeek]);
  let dailyMenu = menuData.LunchMenus[dayOfWeek].SetMenus.map(setMenu => {
    let mealName = setMenu.Name;
    // Go through meals and pick dish names and diets
    let dishes = setMenu.Meals.map(dish => `${dish.Name} (${dish.Diets.join(', ')})`);
    // Convert dishes array to string separated by commas
    dishes = dishes.join(', ');
    // Use meal name it it exists
    return mealName ? `${mealName}: ${dishes}` : dishes;
  });
  return dailyMenu;
};
// Usage
let coursesFi = parseDailyMenu(FazerLunchMenu, 0);
// console.log('parsed fazer menu', coursesFi);
let coursesEn = parseDailyMenu(FazerLunchMenuEn, 0);;

const getParsedMenu = (lang = 'fi') => {
  return (lang == 'fi') ? coursesFi : coursesEn;
};

export {getParsedMenu as getParsedMenuFazer};