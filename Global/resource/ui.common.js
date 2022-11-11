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
			HyperloungeUI.common.naveClose();
			window.removeEventListener('scroll', HyperloungeUI.parallax.act);
			window.addEventListener('resize', HyperloungeUI.parallax.act);
			HyperloungeUI.parallax.init(page);



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
