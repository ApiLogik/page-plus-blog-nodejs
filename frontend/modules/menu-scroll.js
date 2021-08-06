//--------------MENU SCROLL--------------------
import { slideDown, slideUp } from './custom-lib.js';

export const initMenuMobile = () => {
	const menuMobile = document.querySelector(".menu-mobile");
	const speed = 400;
	const delay = speed * 1.1; //re-click allowed after: speed + 10%
	let menuDown = false; //down = true; up = false
	let clicked = true;

	document.querySelector('.icon-menu-mob').addEventListener('click', () => {
		while (clicked) {
			if (!menuDown) {
				slideDown(menuMobile, speed);
				menuDown = true;
			} else {
				slideUp(menuMobile, speed);
				menuDown = false;
			}
			clicked = false;
			setTimeout(() => clicked = true, delay);
		}
	});

	document.querySelector('body,html').addEventListener('click', () => {
		while (clicked) {
			if (menuDown) {
				slideUp(menuMobile, speed);
				menuDown = false;
			}
			clicked = false;
			setTimeout(() => clicked = true, delay);
		}
	})

	window.addEventListener('scroll', () => {
		if (window.scrollY > 0 && menuDown) {
			slideUp(menuMobile, speed);
			menuDown = false;
		}
	})

}//End initMenuMobile

