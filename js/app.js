import { Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper'
Swiper.use([ Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation ])

import { gsap, Power2 } from 'gsap'

import MicroModal from 'micromodal'

document.addEventListener('DOMContentLoaded', () => {
	//modal

	MicroModal.init({
		openTrigger: 'data-micromodal-open',
		closeTrigger: 'data-micromodal-close',
		disableFocus: true,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,
	})

	//slider
	const swiperIMG = new Swiper('.slider-img', {
		loop: false,
		speed: 2400,
		parallax: true,
		pagination: {
			el: '.slider-pagination-count .total',
			type: 'custom',
			renderCustom: function(swiper, current, total) {
				return `0${total}`
			}
		}
		
	})

	const swiperText = new Swiper('.slider-text', {
		loop: false,
		speed: 2400,
		mousewheel: {
			invert: false
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true
		},
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next'
		}
	})

	swiperIMG.controller.control = swiperText
	swiperText.controller.control = swiperIMG

	let gear = document.querySelector('.slider-gear')

	swiperText.on('slideNextTransitionStart', function() {
		gsap.to(gear, 2.8, {
			rotation: '+=40',
			ease: Power2.easeOut
		})
	})

	swiperText.on('slidePrevTransitionStart', function() {
		gsap.to(gear, 2.8, {
			rotation: '-=40',
			ease: Power2.easeOut
		})
	})

	// slide change

	let curnum = document.querySelector('.slider-pagination-count .current'),
		pagcur = document.querySelector('.slider-pagination-current__num')

	swiperText.on('slideChange', function() {
		let ind = swiperText.realIndex + 1
		gsap.to(curnum, .2, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function() {
				gsap.to(curnum, .1, {
					force3D: true,
					y: 10
				})
				curnum.innerHTML = `0${ind}`
				pagcur.innerHTML = `0${ind}`
			}
		})
		gsap.to(curnum, .2, {
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: .3
		})
	})


	//cursor

	const body = document.querySelector('body'),
		  cursor = document.getElementById('cursor'),
		  links = document.getElementsByTagName('a')


	let mouseX = 0, mouseY = 0, posX = 0, posY = 0

	function mouseCoords(e) {
		mouseX = e.pageX
		mouseY = e.pageY
	}

	gsap.to({}, .01, {
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX / 10)
			posY += (mouseY - posY / 10)
			gsap.set(cursor, {
				css: {
					left: posX,
					top: posY
				}
			})
		}
	})

	body.addEventListener('mousemove', e => {
		mouseCoords(e)
	})
})
