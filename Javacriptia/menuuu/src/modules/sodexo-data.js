import SodexoLunchMenu from '../assets/sodexo-day-example.json';

console.log(SodexoLunchMenu.courses);

let coursesEn = [];
let coursesFi = [];

/**
 * Extract courses from Sodexo's json object to menu arrays
 *
 * @param {Object} sodexoDailyMenu
 */
const parseSodexoMenu = (sodexoDailyMenu) => {
  const courses = Object.values(sodexoDailyMenu);
  for (const course of courses) {
    coursesFi.push(course.category + ": " +  course.title_fi);
    coursesEn.push(course.title_en);
  }
};

parseSodexoMenu(SodexoLunchMenu.courses);

const SodexoData = {coursesEn, coursesFi};

export default SodexoData;