document.addEventListener('DOMContentLoaded', () => {
	// 'use strict';

	const getData = (url, callback) => {
		//* через XMLHttpRequest
		/*const request = new XMLHttpRequest()
		request.open('GET', url)
		request.send()

		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) return
			if (request.status === 200) {
				const response = JSON.parse(request.response)
				callback(response)
			} else {
				console.log(new Error('Ошибка: ', request.statusText))
			}
		}) */

		//* через fetch
		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				throw new Error(response.statusText)
			})
			.then(callback)
			.catch(err => console.log(err))
	}

	const tabs = () => {
		const cardDetailChangeElms = document.querySelectorAll('.card-detail__change'),
			cardDetailTitleElem = document.querySelector('.card-details__title'),
			cardImageItemElem = document.querySelector('.card__image_item'),
			cardDetailsPriceElem = document.querySelector('.card-details__price'),
			descriptionMemoryElem = document.querySelector('.description__memory'),
			modalTitle = document.querySelector('.modal__title')

		const data = [
			{
				name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
				img: 'img/iPhone-graphite.png',
				price: 999,
				color: 'Графитовый',
				memoryROM: 128,
			},
			{
				name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
				img: 'img/iPhone-silver.png',
				price: 9967,
				color: 'Серебристый',
				memoryROM: 256,
			},
			{
				name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
				img: 'img/iPhone-blue.png',
				price: 2399,
				color: 'Тихоокеанский синий',
				memoryROM: 128,
			},
		]

		const deactivatedTab = () => {
			cardDetailChangeElms.forEach(btn => btn.classList.remove('active'))
		}
		const activatedTab = (btn, i) => {
			btn.classList.add('active')
			cardDetailTitleElem.textContent = data[i].name
			cardImageItemElem.src = data[i].img
			cardImageItemElem.alt = data[i].name
			cardDetailsPriceElem.textContent = data[i].price + '₽'
			descriptionMemoryElem.textContent = `Встроенная память (ROM) ${data[i].memoryROM} ГБ`
			modalTitle.textContent = data[i].name
		}

		cardDetailChangeElms.forEach((btn, i) => {
			btn.addEventListener('click', () => {
				deactivatedTab()
				if (!btn.classList.contains('active')) {
					activatedTab(btn, i)
				}
			})
		})
	}
	const accordion = () => {
		const characteristicsList = document.querySelector('.characteristics__list'),
			characteristicsItem = document.querySelectorAll('.characteristics__item')

		// ПЛАВНОСТЬ в случае если нужна одна раскрытая часть акордеона,('active' в верстке)
		characteristicsItem.forEach(elem => {
			if (elem.children[1].classList.contains('active')) {
				elem.children[1].style.height = `${elem.children[1].scrollHeight}px`
			}
		})

		const open = (button, dropdown) => {
			closeAllDrops()
			dropdown.style.height = `${dropdown.scrollHeight}px`
			button.classList.add('active')
			dropdown.classList.add('active')
		}
		const close = (button, dropdown) => {
			button.classList.remove('active')
			dropdown.classList.remove('active')
			dropdown.style.height = ''
		}
		// закрывает все кроме переданных элементов
		const closeAllDrops = (button, dropdown) => {
			characteristicsItem.forEach(elem => {
				if (elem.children[0] !== button && elem.children[1] !== dropdown) {
					close(elem.children[0], elem.children[1])
				}
			})
		}
		// диллигирование
		characteristicsList.addEventListener('click', event => {
			const target = event.target
			if (target.classList.contains('characteristics__title')) {
				const parent = target.closest('.characteristics__item')
				const description = parent.querySelector('.characteristics__description')
				description.classList.contains('active') ? close(target, description) : open(target, description)
			}
		})
		// закрытие при клике на любое место в странице
		document.body.addEventListener('click', event => {
			const target = event.target
			if (!target.closest('.characteristics__list')) {
				closeAllDrops()
			}
		})
	}

	const openModal = () => {
		const cardDetailsButtons = document.querySelector('.card-details__footer'),
			modal = document.querySelector('.modal'),
			modalSubtitle = document.querySelector('.modal__subtitle'),
			modalSubmit = document.querySelector('.modal__submit')

		const closeModal = () => {
			modal.classList.remove('open')
		}

		cardDetailsButtons.addEventListener('click', event => {
			const target = event.target
			modalSubtitle.textContent = target.classList.contains('card-details__button_buy')
				? `Оформить покупку`
				: `Доставка и оплата`
			modalSubmit.textContent = target.classList.contains('card-details__button_buy')
				? `Забрать из магазина`
				: `Заказать доставку`
			modal.classList.add('open')
		})

		window.addEventListener(
			'keydown',
			event => {
				if (event.key === 'Escape') {
					closeModal()
				}
			},
			true,
		)

		modal.addEventListener('click', event => {
			const target = event.target
			if (target.classList.contains('modal__close') || target.classList.contains('modal')) {
				closeModal()
			}
		})
	}

	const renderCrossSell = () => {
		const crossSellList = document.querySelector('.cross-sell__list')
		const crossSellAdd = document.querySelector('.cross-sell__add')
		const allGoods = []

		// const shuffle = arr => arr.sort(() => Math.random() - 0.5)

		//* алгоритм Тасование Фишера — Йетса.
		const shuffle = arr => {
			let j, temp
			for (let i = arr.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1))
				temp = arr[j]
				arr[j] = arr[i]
				arr[i] = temp
			}
			return arr
		}
		//* end

		const createCrossSellItem = good => {
			const liItem = document.createElement('li')
			liItem.innerHTML = `
         <article class="cross-sell__item">
            <img alt="${good.name}" class="cross-sell__image" src="${good.photo}">
            <h3 class="cross-sell__title">${good.name}</h3>
            <p class="cross-sell__price">${good.price}₽</p>
            <button type="button" class="button button_buy cross-sell__button">Купить</button>
         </article>
         `
			return liItem
		}

		const render = arr => {
			arr.forEach(item => {
				crossSellList.append(createCrossSellItem(item))
			})
		}
		// ограничитель по количеству вызовов для любой функции
		const wrapper = (fn, count) => {
			let counter = 0
			return (...args) => {
				if (counter === count) return
				counter++
				return fn(...args)
			}
		}

		const wrapRender = wrapper(render, 2)
		// end

		const createCrossSellList = (goods = []) => {
			allGoods.push(...shuffle(goods))
			const fourItems = allGoods.splice(0, 4)
			wrapRender(fourItems)
		}

		crossSellAdd.addEventListener('click', () => {
			wrapRender(allGoods)
			crossSellAdd.remove()
		})

		getData('cross-sell-dbase/dbase.json', createCrossSellList)
	}

	tabs()
	accordion()
	openModal()
	renderCrossSell()
	amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger')
})
