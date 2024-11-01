(function ($) {
	function Popup ($button, options) {
		if (!$button.length) return;

		this.$button = $button;

		$.extend(this.options, options, this.$button.data());

		this.initialize();
	}

	Popup.prototype = {
		options: {
			common: {
				width: 600,
				height: 500
			},
			facebook: {},
			twitter: {
				height: 450
			},
			google: {}
		},
		getOption: function (option) {
			return this.options[option] || (this.options[this.service] || {})[option] || (this.options.common || {})[option];
		},
		initialize: function () {
			this.href = this.$button.attr('href');
			this.service = this.$button.attr('data-service');

			if (!this.href || !this.service) return;

			this.$button.on('click.sharerama', $.proxy(this.openPopup, this));
		},
		openPopup: function (e) {
			if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.wheel || e.button) return;

			var screenWidth = screen.width,
				screenHeight = screen.height,
				width = this.getOption('width'),
				height = this.getOption('height'),
				left = Math.round(screenWidth / 2 - width / 2),
				top = 0;
			if (screenHeight > height) {
				top = Math.round(screenHeight / 3 - height / 2);
			}

			var win = window.open(this.href, 'sl_' + this.service, 'left=' + left + ',top=' + top + ',' +
				'width=' + width + ',height=' + height + ',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
			if (win) {
				win.focus();
				e.preventDefault();
			}
		},
		destroy: function () {
			this.$button.off('click.sharerama');
		}
	};

	// expose factory
    window.ShareramaPopup = function($button, options) {
        return new Popup($button, options);
    };

	$.fn.ShareramaPopup = function () {
		return this.each(function () {
			new Popup($(this));
		});
	};

	$(function () {
		$('.sharerama__button').ShareramaPopup();
	});
})(jQuery);