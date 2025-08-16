// блокування прокрутки екрану при відкритті меню/попапу ------------------------------------------------
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains("lock")) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
};
let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = "0px";
			}
			body.style.paddingRight = "0px";
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};
let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight =
			window.innerWidth -
			document.querySelector(".wrapper").offsetWidth +
			"px";
		}
		body.style.paddingRight =
			window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
};


// меню бургер ------------------------------------------------------------------------------------------------
function menuInit() {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", function (e) {
			if (bodyLockStatus && e.target.closest(".icon-menu")) {
				bodyLockToggle()
				document.documentElement.classList.toggle("menu-open")
			}
		})
	}
}
function menuOpen() {
	bodyLock()
	document.documentElement.classList.add("menu-open")
}
function menuClose() {
	bodyUnlock()
	document.documentElement.classList.remove("menu-open")
}
document.addEventListener("DOMContentLoaded", () => {
	menuInit()
})

// приховування/поява хедеру ----------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.header');
	let lastScrollTop = 0;

	window.addEventListener('scroll', () => {
		let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

		if (currentScroll > lastScrollTop && currentScroll > header.offsetHeight) {
			header.classList.add('hidden');
		} else {
			header.classList.remove('hidden');
		}

		lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
	});
});

// безперервний рядок marquee ---------------------------------------------------------------------------------
const marquee = document.querySelector('.fullscreen__marquee');
const content = marquee.querySelector('.fullscreen__marquee_inner');

const clone1 = content.cloneNode(true);
marquee.appendChild(clone1);
const clone2 = content.cloneNode(true);
marquee.appendChild(clone2);

function updateAnimationDuration() {
	const contentWidth = content.offsetWidth;
	const speed = 30;
	const duration = contentWidth / speed;
	
	marquee.style.setProperty('--marquee-duration', `${duration}s`);
}

window.addEventListener('load', updateAnimationDuration);
window.addEventListener('resize', updateAnimationDuration);

// блок збільшення/зменшення кількості продукту ---------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
	const forms = document.querySelectorAll('.product__quantity-form');

	const formatQuantity = (value) => {
		return value < 10 ? '0' + value : value.toString();
	};

	forms.forEach(form => {
		const minusButton = form.querySelector('.quantity-minus');
		const plusButton = form.querySelector('.quantity-plus');
		const quantityInput = form.querySelector('.quantity-input');

		quantityInput.value = formatQuantity(parseInt(quantityInput.value));

		minusButton.addEventListener('click', () => {
			let currentValue = parseInt(quantityInput.value);
			if (currentValue > parseInt(quantityInput.min)) {
				quantityInput.value = formatQuantity(currentValue - 1);
			}
		});

		plusButton.addEventListener('click', () => {
			let currentValue = parseInt(quantityInput.value);
			if (currentValue < parseInt(quantityInput.max)) {
				quantityInput.value = formatQuantity(currentValue + 1);
			}
		});

		quantityInput.addEventListener('change', () => {
			let currentValue = parseInt(quantityInput.value);
			if (currentValue < parseInt(quantityInput.min)) {
				currentValue = parseInt(quantityInput.min);
			} else if (currentValue > parseInt(quantityInput.max)) {
				currentValue = parseInt(quantityInput.max);
			}
			quantityInput.value = formatQuantity(currentValue);
		});

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			const productId = form.querySelector('input[name="productId"]').value;
			const quantity = quantityInput.value;

			console.log(`Додано в кошик: Товар ID ${productId}, Кількість: ${quantity}`);
			// Тут ви можете відправити дані на сервер через AJAX,
			// або оновити стан кошика на клієнті
		});
	});
});

// аккордеон для карток товару -------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
	const allAccordeonHeaders = document.querySelectorAll('.accordeon-header');

	allAccordeonHeaders.forEach(header => {
		header.addEventListener('click', () => {
			const currentAccordeon = header.closest('.product__accordeon');
			const currentContent = header.nextElementSibling; 
			const isOpen = header.getAttribute('aria-expanded') === 'true';
			if (isOpen) {
					header.setAttribute('aria-expanded', 'false');
					currentContent.setAttribute('hidden', '');
			} else {
				const headersInCurrentAccordeon = currentAccordeon.querySelectorAll('.accordeon-header');
				headersInCurrentAccordeon.forEach(otherHeader => {
					const otherContent = otherHeader.nextElementSibling;
					if (otherHeader !== header && otherHeader.getAttribute('aria-expanded') === 'true') {
						otherHeader.setAttribute('aria-expanded', 'false');
						otherContent.setAttribute('hidden', '');
					}
				});
				header.setAttribute('aria-expanded', 'true');
				currentContent.removeAttribute('hidden');
			}
		});
	});
});

// слайдер сертифікатів --------------------------------------------------------------------------------------
const certificatesSlider = new Swiper('.certificates__slider', {
	slidesPerView: 'auto',
	spaceBetween: 24,
	centeredSlides: true,
	loop: true,
	breakpoints: {
		320: {
			slidesPerView: 1.47,
			spaceBetween: 12,
		},
		426: {
			slidesPerView: 2,
			spaceBetween: 12,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 24,
		},
		1024: {
			slidesPerView: 4,
			centeredSlides: false,
		},
	},
	navigation: {
		nextEl: '.certificates-button-next',
		prevEl: '.certificates-button-prev',
	},
	watchOverflow: true,
});

// фансібокс для сертифікатів --------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
	Fancybox.bind("[data-fancybox='gallery']", {
		Thumbs: false,
		Toolbar: {
			display: {
				left: [],
				middle: [],
				right: ["close"],
			},
		},
	});
});

// слайдер відгуків ------------------------------------------------------------------------------------------
const reviewsSlider = new Swiper('.reviews__slider', {
	// slidesPerView: 'auto',
	slidesPerView: 2,
	centeredSlides: true,
	// spaceBetween: 24,
	loop: true,
	breakpoints: {
		320: {
			slidesPerView: 1.3,
			spaceBetween: 12,
		},
		426: {
			slidesPerView: 1.3,
			spaceBetween: 24,
		},
		767.5: {
			slidesPerView: 2,
			spaceBetween: 24,
		},
	},
	navigation: {
		nextEl: '.reviews-button-next',
		prevEl: '.reviews-button-prev',
	},
	watchOverflow: true,
});