import SodexoLunchMenu from './assets/sodexo-menu.json';

console.log(SodexoLunchMenu.courses);

let coursesEn = [];
let coursesFi = [];
let lang = 'fi';
let menu = coursesFi;

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

/**
 * Sorts an array alphapetically
 *
 * @param {Array} courses - Menu array
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} sorted menu
 */
const sortCourses = (courses, order = 'asc') => {
  let sortedMenu = courses.sort();
  if (order === 'desc') {
    sortedMenu.reverse();
  }
  return sortedMenu;
};

/**
 * Picks a random course item from an array
 *
 * @param array courses
 * @returns String course
 */
const pickRandomCourse = courses => {
  const randomIndex = Math.floor(Math.random() * courses.length);
  return courses[randomIndex];
};

const renderMenu = () => {
  const list = document.querySelector('#sodexo');
  list.innerHTML = '';
  for (const item of menu) {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  }
};

const displayRandomCourse = () => {
  alert(pickRandomCourse(menu));
};

const switchLanguage = () => {
  if (lang === 'fi') {
    lang = 'en';
    menu = coursesEn;
  } else {
    lang = 'fi';
    menu = coursesFi;
  }
  renderMenu();
};

const renderSortedMenu = () => {
  sortCourses(menu);
  renderMenu();
};

const init = () => {
  parseSodexoMenu(SodexoLunchMenu.courses);
  renderMenu();
  document.querySelector('#switch-lang').addEventListener('click', switchLanguage);
  document.querySelector('#sort-menu').addEventListener('click', renderSortedMenu);
  document.querySelector('#pick-dish').addEventListener('click', displayRandomCourse);
};

init();