import SodexoData from './modules/sodexo-data';
import {getParsedMenuFazer} from './modules/fazer-data';


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}


let lang = 'fi';

/**
 * Sorts an array alphapetically
 *
 * @param {Array} courses - Menu array
 * @param {Array} order - 'asc' or 'desc'
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
 * Renders html list items from menu data
 *
 * @param {string} restaurant - name of the selector/restaurant
 * @param {Array} menu - menu data
 */
const renderMenu = (restaurant, menu) => {
  const list = document.querySelector('#' + restaurant);
  list.innerHTML = '';
  for (const item of menu) {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  }
};

/**
 * Picks a random course item from an array
 *
 * @param {Array} courses
 * @returns {string} course
 */
const pickRandomCourse = courses => {
  const randomIndex = Math.floor(Math.random() * courses.length);
  return courses[randomIndex];
};
const displayRandomCourse = () => {
  // TODO: add support for Fazer menu and lang
  alert(pickRandomCourse(SodexoData.coursesFi));
};

const switchLanguage = () => {
  if (lang === 'fi') {
    lang = 'en';
    renderMenu('sodexo', SodexoData.coursesEn);
    renderMenu('fazer', getParsedMenuFazer('en'));
  } else {
    lang = 'fi';
    renderMenu('sodexo', SodexoData.coursesFi);
    renderMenu('fazer', getParsedMenuFazer('fi'));
  }
};

const renderSortedMenu = () => {
  // TODO: fix lang issue
  renderMenu('sodexo', sortCourses(SodexoData.coursesFi));
  renderMenu('fazer', sortCourses(getParsedMenuFazer('fi')));
};

const init = () => {
  renderMenu('sodexo', SodexoData.coursesFi);
  renderMenu('fazer', getParsedMenuFazer('fi'));
  document.querySelector('#switch-lang').addEventListener('click', switchLanguage);
  document.querySelector('#sort-menu').addEventListener('click', renderSortedMenu);
  document.querySelector('#pick-dish').addEventListener('click', displayRandomCourse);
};

init();