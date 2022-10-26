'use strict';

;(function (win, doc, undefined) {

	'use strict';

	var el_body = doc.querySelector('body');
	var el_html = doc.querySelector('html');
	var el_header = doc.querySelector('.base-header');
	var btn_menu = doc.querySelector('.btn-menu');
	var btn_close = doc.querySelector('.btn-close');
	var page = HyperloungeUI.state.page();

	String.prototype.startsWith = function(search, pos) {
		return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
};

	HyperloungeUI.common = {
		init: function init() {

			btn_menu.addEventListener('click', HyperloungeUI.common.naveOpen);
			btn_close.addEventListener('click', HyperloungeUI.common.naveClose);
			window.addEventListener('load', HyperloungeUI.common.inital);
		},
		inital: function inital() {
			el_body.dataset.n = 0;
			el_body.removeAttribute('class');
			el_body.classList.add('step0');
			el_html.classList.remove('is-bar');
			el_html.classList.remove('page-service');
			el_html.classList.remove('page-overview');
			el_html.classList.remove('page-apply');
			el_html.classList.remove('scroll');
			el_header.classList.remove('type-b');
			el_header.classList.remove('type-c');
			HyperloungeUI.common.naveClose();
			window.removeEventListener('scroll', HyperloungeUI.parallax.act);
			HyperloungeUI.parallax.init(page);

			if (page.startsWith("apply-") == true){
				el_html.classList.add('page-apply-common');
			} else {
				if(page != "" && page != "index" && page != "overview" && page != "apply"){
					el_html.classList.add('page-common');
				} else {
					el_html.classList.add('page-' + page);
				}				
			}

			// if (page === 'index' || page === '') {
			// 	setTimeout(function () {
			// 		document.querySelector('.service-item.n1 .line').classList.add('act');
			// 		setTimeout(function () {
			// 			document.querySelector('html').classList.add('scroll');
			// 		}, 600);
			// 	}, 1100);
			// }

			window.scrollTo({
				top: 0,
				left: 0
			});
		},
		naveOpen: function naveOpen() {
			var el_html = doc.querySelector('html');

			el_html.classList.add('nav-open');
		},
		naveClose: function naveClose() {
			var el_html = doc.querySelector('html');

			el_html.classList.remove('nav-open');
		}
	};

	document.addEventListener("DOMContentLoaded", function () {
		HyperloungeUI.common.init();
	});
})(window, document);

function layer(id, type) {
	var el_layer = document.querySelector('#' + id);
	if (type == 'open') {
		el_layer.style.display = "block";
	} else if (type == 'close') {
		el_layer.style.display = "none";
	}
}