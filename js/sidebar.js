function toggleSidebar(i) {
	switch (i) {
		case 0: // default
			if ($('#sidebar0').hasClass('hidden')) {
				$('#sidebar0').addClass('col-md-3');
				$('#sidebar0').removeClass('hidden');
				$('#sidebar0').addClass('open');
			}
			if ($('#sidebar1').hasClass('open')) {
				$('#sidebar1').removeClass('col-md-3');
				$('#sidebar1').removeClass('open');
				$('#sidebar1').addClass('hidden');
			}
			if ($('#sidebar2').hasClass('open')) {
				$('#sidebar2').removeClass('col-md-3');
				$('#sidebar2').removeClass('open');
				$('#sidebar2').addClass('hidden');
			}
			if ($('#sidebar3').hasClass('open')) {
				$('#sidebar3').removeClass('col-md-3');
				$('#sidebar3').removeClass('open');
				$('#sidebar3').addClass('hidden');
			}
			if ($('#sidebar4').hasClass('open')) {
				$('#sidebar4').removeClass('col-md-3');
				$('#sidebar4').removeClass('open');
				$('#sidebar4').addClass('hidden');
			}
			break;
		case 1: // block
		if ($('#sidebar1').hasClass('hidden')) {
				$('#sidebar1').addClass('col-md-3');
				$('#sidebar1').removeClass('hidden');
				$('#sidebar1').addClass('open');
			}
			if ($('#sidebar0').hasClass('open')) {
				$('#sidebar0').removeClass('col-md-3');
				$('#sidebar0').removeClass('open');
				$('#sidebar0').addClass('hidden');
			}
			if ($('#sidebar2').hasClass('open')) {
				$('#sidebar2').removeClass('col-md-3');
				$('#sidebar2').removeClass('open');
				$('#sidebar2').addClass('hidden');
			}
			if ($('#sidebar3').hasClass('open')) {
				$('#sidebar3').removeClass('col-md-3');
				$('#sidebar3').removeClass('open');
				$('#sidebar3').addClass('hidden');
			}
			if ($('#sidebar4').hasClass('open')) {
				$('#sidebar4').removeClass('col-md-3');
				$('#sidebar4').removeClass('open');
				$('#sidebar4').addClass('hidden');
			}
			break;
		case 2: // action
			if ($('#sidebar2').hasClass('hidden')) {
				$('#sidebar2').addClass('col-md-3');
				$('#sidebar2').removeClass('hidden');
				$('#sidebar2').addClass('open');
			}
			if ($('#sidebar1').hasClass('open')) {
				$('#sidebar1').removeClass('col-md-3');
				$('#sidebar1').removeClass('open');
				$('#sidebar1').addClass('hidden');
			}
			if ($('#sidebar0').hasClass('open')) {
				$('#sidebar0').removeClass('col-md-3');
				$('#sidebar0').removeClass('open');
				$('#sidebar0').addClass('hidden');
			}
			if ($('#sidebar3').hasClass('open')) {
				$('#sidebar3').removeClass('col-md-3');
				$('#sidebar3').removeClass('open');
				$('#sidebar3').addClass('hidden');
			}
			if ($('#sidebar4').hasClass('open')) {
				$('#sidebar4').removeClass('col-md-3');
				$('#sidebar4').removeClass('open');
				$('#sidebar4').addClass('hidden');
			}
			break;
		case 3: // context
			if ($('#sidebar3').hasClass('hidden')) {
				$('#sidebar3').addClass('col-md-3');
				$('#sidebar3').removeClass('hidden');
				$('#sidebar3').addClass('open');
			}
			if ($('#sidebar1').hasClass('open')) {
				$('#sidebar1').removeClass('col-md-3');
				$('#sidebar1').removeClass('open');
				$('#sidebar1').addClass('hidden');
			}
			if ($('#sidebar2').hasClass('open')) {
				$('#sidebar2').removeClass('col-md-3');
				$('#sidebar2').removeClass('open');
				$('#sidebar2').addClass('hidden');
			}
			if ($('#sidebar0').hasClass('open')) {
				$('#sidebar0').removeClass('col-md-3');
				$('#sidebar0').removeClass('open');
				$('#sidebar0').addClass('hidden');
			}
			if ($('#sidebar4').hasClass('open')) {
				$('#sidebar4').removeClass('col-md-3');
				$('#sidebar4').removeClass('open');
				$('#sidebar4').addClass('hidden');
			}
			break;
		case 4: // objective
			if ($('#sidebar4').hasClass('hidden')) {
				$('#sidebar4').addClass('col-md-3');
				$('#sidebar4').removeClass('hidden');
				$('#sidebar4').addClass('open');
			}
			if ($('#sidebar1').hasClass('open')) {
				$('#sidebar1').removeClass('col-md-3');
				$('#sidebar1').removeClass('open');
				$('#sidebar1').addClass('hidden');
			}
			if ($('#sidebar2').hasClass('open')) {
				$('#sidebar2').removeClass('col-md-3');
				$('#sidebar2').removeClass('open');
				$('#sidebar2').addClass('hidden');
			}
			if ($('#sidebar3').hasClass('open')) {
				$('#sidebar3').removeClass('col-md-3');
				$('#sidebar3').removeClass('open');
				$('#sidebar3').addClass('hidden');
			}
			if ($('#sidebar0').hasClass('open')) {
				$('#sidebar0').removeClass('col-md-3');
				$('#sidebar0').removeClass('open');
				$('#sidebar0').addClass('hidden');
			}
			break;
		
	}
}