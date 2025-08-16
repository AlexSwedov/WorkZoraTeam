"use strict"

// визначення браузерів
const isMmobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i)
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i)
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i)
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i)
	},
	any: function () {
		return (
			isMmobile.Android() ||
			isMmobile.BlackBerry() ||
			isMmobile.iOS() ||
			isMmobile.Opera() ||
			isMmobile.Windows());
	}
};

// відображення меню в мобільних браузерах тачскрін
if (isMmobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length>0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			})
		}
	}

	// відображення меню у браузері комп'ютера
} else {
	document.body.classList.add('_pc');
}

// меню бургер

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// прокрутка по розділах з шапки меню

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove("_active");
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
