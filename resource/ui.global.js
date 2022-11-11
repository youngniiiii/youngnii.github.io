'use strict';

//utils module
;(function (win, doc, undefined) {

	'use strict';

	const global = 'HyperloungeUI';

	win[global] = {};

	const Global = win[global];
	const UA = navigator.userAgent.toLowerCase();
	const deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows','samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];

	//components state 
	Global.state = {
		device: {
			info: (function() {
				for (let i = 0, len = deviceInfo.length; i < len; i++) {
					if (UA.match(deviceInfo[i]) !== null) {
						return deviceInfo[i];
					}
				}
			})(),
			width: window.innerWidth,
			height: window.innerHeight,
			breakpoint: null,
			colClass: null,
			ios: (/ip(ad|hone|od)/i).test(UA),
			android: (/android/i).test(UA),
			app: UA.indexOf('appname') > -1 ? tre : false,
			touch: null,
			mobile: null,
			os: (navigator.appVersion).match(/(mac|win|linux)/i)
		},
		browser: {
			ie: UA.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			local: (/^http:\/\//).test(location.href),
			firefox: (/firefox/i).test(UA),
			webkit: (/applewebkit/i).test(UA),
			chrome: (/chrome/i).test(UA),
			opera: (/opera/i).test(UA),
			safari: (/applewebkit/i).test(UA) && !(/chrome/i).test(UA),	
			size: null
		},
		keys: { 
			tab: 9, 
			enter: 13, 
			alt: 18, 
			esc: 27, 
			space: 32, 
			pageup: 33, 
			pagedown: 34, 
			end: 35, 
			home: 36, 
			left: 37, 
			up: 38, 
			right: 39, 
			down: 40
		},
		scroll: {
			y: 0,
			direction: 'down'
		},
		page: function() {
			const sOriginImgUrl = document.URL;
			const arSplitUrl   = sOriginImgUrl.split("/");  
			const nArLength     = arSplitUrl.length;
			const arFileName         = arSplitUrl[nArLength-1];  
			const arSplitFileName     = arFileName.split("."); 
			const pagename = arSplitFileName[0];
			return pagename
		},
		breakPoint: 984,
		effect: { //http://cubic-bezier.com - css easing effect
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		}
	}
	Global.parts = {
		resizeState: function() {
			let timerWin;

			const act = function() {
				const browser = Global.state.browser;
				const device = Global.state.device;

				device.width = window.innerWidth;
				device.height = window.innerHeight;

				device.touch = device.ios || device.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
				device.mobile = device.touch && (device.ios || device.android);
				device.os = device.os ? device.os[0] : '';
				device.os = device.os.toLowerCase();

				if (browser.ie) {
					browser.ie = browser.ie = parseInt( browser.ie[1] || browser.ie[2] );
					( 11 > browser.ie ) ? support.pointerevents = false : '';
					( 9 > browser.ie ) ? support.svgimage = false : '';
				} else {
					browser.ie = false;
				}

				const clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
				const clsMobileSystem = device.ios ? "ios" : device.android ? "android" : 'etc';
				const clsMobile = device.mobile ? device.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';
				const el_html = doc.querySelector('html');

				el_html.classList.add(clsMobile);
			
				const w = window.innerWidth;

				clearTimeout(timerWin);
				timerWin = setTimeout(function(){
					el_html.classList.remove('size-desktop');
					el_html.classList.remove('size-mobile');
					if (w < Global.state.breakPoint) {
						Global.state.browser.size = 'mobile';
						el_html.classList.add('size-mobile');
					} else {
						Global.state.browser.sizee = 'desktop';
						el_html.classList.add('size-desktop');
					}
				},200);
			}
			win.addEventListener('resize', act);
			act();
		},
	}
	Global.parts.resizeState();
	
	Global.parallax = {
		options: {
			psValue: [],
			page : 'index'
		},
		init: function(v) {
			// position: fixed 사용시 ie 떨림 현상 방지
			if( navigator.userAgent.match(/Trident\/7\./) ){
				document.querySelector('body').addEventListener("mousewheel", function(){
					event.preventDefault();

					var wheelDelta = event.wheelDelta,
						currentScrollPosition = window.pageYOffset;

					window.scrollTo(0, currentScrollPosition - wheelDelta);
				});
			}
			if(doc.querySelector('.ui-parallax') !== null){
				const el_area = window;
				const el_parallax = doc.querySelector('.ui-parallax');
				const el_wraps = el_parallax.querySelectorAll('.ui-parallax-item');
				const el_body = doc.querySelector('body');

				history.scrollRestoration = "manual";
				Global.parallax.options.page = v;
				el_body.removeAttribute('class');
				//el_body.classList.add('step0');
				
				function calc(){
					Global.parallax.options.psValue = [];
					win.scrollTop = 0;

					for (let i = 0, len = el_wraps.length; i < len; i++) {
						const that = el_wraps[i];
						let areaT = Math.floor(window.pageYOffset);

						if (v === 'index' && i === 2) {
							areaT = areaT - 140;
						}
						
						Global.parallax.options.psValue.push((that.getBoundingClientRect().top + areaT).toFixed(0));
					}
				}
		
				setTimeout(function(){
					calc();
					win.addEventListener('resize', calc);
					Global.parallax.act();
					el_area.addEventListener('scroll', Global.parallax.act);
				},100);
			}
		},
		act: function(){
			
			
			const $btnLang = doc.querySelector('.btn-language').parentElement;

			$btnLang.addEventListener('mouseenter', function(e) {
				e.target.classList.add('open');
			});
			$btnLang.addEventListener('mouseleave', function(e) {
				e.target.classList.remove('open');
			});

		

		

			

			let oldScrollY = window.scrollY;
			const btnTop = document.querySelector('.btn-top');


      window.onscroll = function(e) {
        if(oldScrollY < window.scrollY){
					btnTop.classList.remove('active');
        } else {
          btnTop.classList.add('active');
        }
        oldScrollY = window.scrollY;
				if(oldScrollY === 0){
					btnTop.classList.remove('active');
				}
      }

			
			
			const topbtn = doc.querySelector('.btn-top');
			const wT = Math.floor(window.pageYOffset);

			topbtn && topbtn.addEventListener('click', function(){
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth'
				});
			});

			const btnMenu = doc.querySelectorAll(".nav-link a");
			btnMenu.forEach(current => {
				current.addEventListener("click", function(e) {
					doc.querySelector("html").classList.remove('nav-open');
				})
			})

			doc.querySelector(".nav-dimmed").addEventListener("click", function(e) {
				doc.querySelector("html").classList.remove('nav-open');
			});

			
			win.addEventListener('resize', act);
			act();
			
			function act(){
				const parallax = doc.querySelector('.ui-parallax');
				const st = window.scrollY || doc.documentElement.scrollTop;
				const item = parallax.querySelectorAll('.unit-item');
				const itemFix = parallax.querySelectorAll('.unit-fix');
				let currentPage = parallax.querySelector('.currentPage');
				const vh = window.innerHeight;

				if (!!itemFix) {
					for (let i = 0, len = itemFix.length; i < len; i++) {
						const that = itemFix[i];
						const itemTop = that.getBoundingClientRect().top + st;
						const card = doc.querySelector('.card-list');
						const fixSecTop = doc.querySelector('.overview-item.n4').offsetTop;
						let gbn = fixSecTop;
						let gnb2 = 4
						let gbn3 = 5.5
						let cardw = vh;
						let ch = that.offsetHeight;
						let wh = that.offsetWidth;
						const ht = doc.querySelector('html');
						
						const fixHeight = doc.querySelector('.overview-item.n4 .unit.n2').getAttribute('data-original-height');


						if(ht.classList.contains('size-mobile') == true){
							gbn = gbn - fixHeight
							gnb2 = 5
							gbn3 = 6.5
						}

						if(wh > 700){
							if (st > itemTop && st < (ch/5) * gnb2  + gbn) {
								that.classList.add('fix');
								that.classList.remove('afterfix');
								card.style.transform = 'translateY('+ - (st - fixSecTop) +'px)';

								//card.style.transform = 'translateY('+ (-1 * window.scrollY) +'px)';
								currentPage.innerText = 1

								if (st - itemTop > (ch / gbn3) * 1) {
									//card.style.transform = 'translateY('+ (cardw * -1) +'px)';
									currentPage.innerText = 2
								} 
								if (st - itemTop > (ch / gbn3) * 2) {
									//card.style.transform = 'translateY('+ (cardw * -2) +'px)';
									currentPage.innerText = 3
								}
								if (st - itemTop > (ch / gbn3) * 3) {
									//card.style.transform = 'translateY('+ (cardw * -3) +'px)';
									currentPage.innerText = 4
								}
								if (st - itemTop > (ch / gbn3) * 4) {
									//card.style.transform = 'translateY('+ (cardw * -4) +'px)';
									currentPage.innerText = 5
								}
							} else {
									that.classList.remove('fix');
								if (st > (ch/5) * gnb2  + gbn) {
									that.classList.add('afterfix');
								} 
								card.style.transform = 'translateY(0px)';
							}
						} else {
							that.classList.remove('fix');
							that.classList.remove('afterfix');
							card.style.transform = 'translateY(0px)';
						}
					}
				}
				
				for (let i = 0, len = item.length; i < len; i++) {
					const that = item[i];
					let delay = Number(that.dataset.delay);
					const counter = that.dataset.conuteritem;
					const speed = that.dataset.speed;
					const itemTop = that.getBoundingClientRect().top + st;
					const n = st - (itemTop - vh);
					let s = vh / 10;

					if (!!delay) {
						s = vh / delay;
					}
					
					let nn = s - n;
					nn < 0 ? nn = 0 : '';

					if (st > itemTop - vh && st < itemTop - vh + s) {
						(!!counter) && Global.number.counterReset(counter);

						that.style.transform = 'translateY('+ nn +'px)';
						that.classList.remove('on');

					} else if (st > itemTop - vh + s) {
						that.style.transform = 'translateY(0px)';
						that.classList.add('on');

						(!!counter) && Global.number.counter(counter, speed);
					}
				}
			}
		}
	}

	Global.number = {
		counter: function(id , sp){
			const counter = doc.querySelector('#' + id);
			const speed = sp;
			const animate = function() {
				const value = +Number(counter.dataset.counter);
				const data = +counter.innerText;
				const time = value / speed;
				
				if (data < value) {
					counter.innerText = Global.number.comma(Math.ceil(data + time));
					setTimeout(animate, 1);
				}else{
					counter.innerText = Global.number.comma(value);
				}
			}

			if (!counter.dataset.state) {
				counter.innerText = 0;
				counter.dataset.state = 'ing';
				animate();
			}
		},
		recounter: function(id, sp){
			const counter = doc.querySelector('#' + id);
			const speed = sp;
			let n = counter.dataset.counter;
			const animate = function() {
				const value = +Number(counter.dataset.counter);
				const data = +n;
				const time = value / speed;

				if(parseInt(data) > 0) {
					n = Math.ceil(data - time);
					counter.innerText = Global.number.comma(Math.ceil(data - time));
					setTimeout(animate, 1);
				}else{
					counter.innerText = 0;
				}
			}

			if (!counter.dataset.state) {
				counter.innerText = Global.number.comma(counter.dataset.counter);
				counter.dataset.state = 'ing';
				animate();
			}
		},
		counterReset: function(id){
			const counter = doc.querySelector('#' + id);

			counter.innerText = 0;
			counter.removeAttribute('data-state');
		},
		recounterReset: function(id){
			const counter = doc.querySelector('#' + id);

			counter.innerText = Global.number.comma(counter.dataset.counter);
			counter.removeAttribute('data-state');
		},
		comma: function(n){
			const parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		}
	}

})(window, document);

//DOM 생성 후
window.addEventListener('DOMContentLoaded', function(){

	const rollingBox = document.querySelectorAll('.rollingbanner');
	const rollWidth = [849,835,628,551,511];

	rollingBox.forEach(function(item,index,arr){
		const roller = item.querySelector('.roller');
		roller.id = `roller${index+1}`
		roller.classList.add('original');

		const clone = roller.cloneNode(true);
		clone.id = `roller${index+1}-2`
		clone.classList.add('clone');

		item.appendChild(clone);
		roller.style.left = '0px'
		clone.style.left = rollWidth[index] + 'px'
	});
});

var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
let currentOs = '';

if ( varUA.indexOf('android') > -1) {
		currentOs = "Android";
} else if ( varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 ||varUA.indexOf("ipod") > -1 || navigator.platform == "MacIntel") {
		currentOs = "iOS";
} else {
		currentOs = "unknown";
}


const btnDownload = document.querySelectorAll(".btnfor-tablet button");
btnDownload.forEach(function($this){ 
	$this.addEventListener("click",function(){
		if(currentOs == "iOS"){
			window.open("https://apps.apple.com/app/1576661686")
		} else {
			window.open("https://play.google.com/store/apps/details?id=com.hyperloungemobile")
		}
	});
}); 


document.querySelector('html').addEventListener("touchstart", function(e){
	document.querySelector('html').classList.add('is-touched');
});

const fixOriginalHeight = document.querySelector('.overview-item.n4 .unit.n2').clientHeight;
document.querySelector('.overview-item.n4 .unit.n2').setAttribute('data-original-height',fixOriginalHeight)

function touchLang(e){
		
	 document.querySelector('.btn-language').parentElement.removeEventListener('mouseenter', function(e) {
		e.target.classList.add('open');
	});
	 document.querySelector('.btn-language').parentElement.removeEventListener('mouseleave', function(e) {
		e.target.classList.remove('open');
	});
	 document.querySelector('.btn-language').parentElement.addEventListener('click',function(e){
		e.target.classList.toggle('open');
	})
}
console.log(document.querySelector('.overview-item.n8').offsetHeight);

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
	const scrollY = Math.floor(window.pageYOffset);
	
	if(scrollY > 0) {
		document.querySelector('.base-header').classList.add('on');
	} else {
		document.querySelector('.base-header').classList.remove('on');
		
	}
	
	document.querySelectorAll(".section[id]").forEach(current => {
		
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 60;
		const sectionId = current.getAttribute("id");
		if (
			scrollY > sectionTop &&
			scrollY <= sectionTop + sectionHeight
		){
			document.querySelector(".nav-link a[href*=" + sectionId + "]").parentElement.classList.add("active");
		} else {
			document.querySelector(".nav-link a[href*=" + sectionId + "]").parentElement.classList.remove("active");
		}
	});
}