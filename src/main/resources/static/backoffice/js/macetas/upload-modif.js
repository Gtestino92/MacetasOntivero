var addLinkToForm = function(res, links) {
	if (res.success === true) {
		var link = res.data.link.replace(/^http:\/\//i, 'https://');
		document.querySelector('.status').classList.add('bg-success');
		$('.status').css('width','150%');
		$('.status').show();
		document.querySelector('.status').innerHTML = '<br>' + '<br>'
				+ '<img class="img" alt="Imgur-Upload" src=\"' + link + '\"/>';

		$('#form-modif-modelo').find('#upload-img-new').append(
				'<input name="linkImagenNew' + global.cantLinksNew + '" value="'
						+ link + '" type="hidden"/>');
		global.cantLinksNew = global.cantLinksNew + 1;
		$('#form-modif-modelo').find('input[name="cantLinksNew"]').val(global.cantLinksNew);
	}
};

var imgurClientId = window.IMGUR_CLIENT_ID;

if (imgurClientId) {
	new Imgur({
		clientid : imgurClientId,
		callback : addLinkToForm
	});
}
