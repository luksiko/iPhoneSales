;(() => {
	let burgerWidth = 0
	let lastWidthItems = 0
	const init = (menu, menuList, itemsMenu, burgerMenu) => {
		itemsMenu.forEach(elem => {
			elem.classList.add('amenu__item')
		})
		burgerMenu.classList.add('amenu__burger')

		const [burgerBtn, burgerList] = createBurgerMenu(burgerMenu)

		updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu)

		window.addEventListener('resize', () => {
			updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu)
		})
	}

	const createBurgerMenu = parentBurger => {
		const burgerBtn = document.createElement('button')
		parentBurger.append(burgerBtn)
		burgerBtn.classList.add('amenu__burger-btn')

		// burgerBtn.addEventListener('click', () => {
		//    parentBurger.classList.toggle('amenu__burger-open')
		// })

		const burgerList = document.createElement('ul')
		parentBurger.append(burgerList)
		burgerList.classList.add('amenu__burger-list')

		return [burgerBtn, burgerList]
	}

	const updateMenu = (menu, menuList, burgerBtn, burgerList, burgerMenu) => {
		const menuItems = menuList.querySelectorAll('.amenu__item')
		const burgerItems = burgerList.querySelectorAll('.amenu__item')

		const widthMenu = menu.offsetWidth
		burgerWidth = burgerMenu.offsetWidth || burgerWidth

		const widthAllItems =
			[...menuItems].reduce((acc, elem) => {
				return acc + elem.offsetWidth + parseFloat(getComputedStyle(elem).marginRight)
			}, 0) + burgerWidth

		if (widthMenu < widthAllItems) {
			const lastItem = menuItems[menuItems.length - 1]
			lastWidthItems = lastItem.offsetWidth + parseFloat(getComputedStyle(lastItem).marginRight)
			burgerList.prepend(lastItem)
			return updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu)
		}
		if (widthMenu > widthAllItems + lastWidthItems && burgerItems.length) {
			const firstElem = burgerItems[0]
			menuList.append(firstElem)
			return updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu)
		}

		//add
		const displayType = burgerItems.length ? '' : 'none'
		burgerMenu.style.display = displayType

		checkBurgerItems(burgerItems.length, burgerBtn)
	}

	const checkBurgerItems = (burgerItemsCount, burgerBtn) => {
		if (burgerItemsCount) {
			burgerBtn.classList.add('amenu__burger-btn_active')
		} else {
			burgerBtn.classList.remove('amenu__burger-btn_active')
		}
	}

	window.amenu = (selectorMenu, selectorMenuList, selectorItemsMenu, selectorBurgerMenu) => {
		const menu = document.querySelector(selectorMenu),
			menuList = document.querySelector(selectorMenuList),
			itemsMenu = document.querySelectorAll(selectorItemsMenu),
			burgerMenu = document.querySelector(selectorBurgerMenu)

		init(menu, menuList, itemsMenu, burgerMenu)
	}
})()
