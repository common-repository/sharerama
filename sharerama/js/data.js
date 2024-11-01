(function ($) {
	$(function () {
		if (location.protocol === 'https:' || !location.host.match(/\./) || window.blockShareramaData) return;
		$('body').append('<iframe src="http://data.sharerama.com/" style="display: none;"></iframe>');
	});
})(jQuery);