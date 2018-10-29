function recaptchaOnload() {
	grecaptcha.render('g-recaptcha', {
        'sitekey' : '6LcgUicUAAAAALxQ3aKiWmWNf4RyK3k2uQH4FD4u'
    });
}

$(document).ready(function(){
	$('#learnMoreButton').on('click', function(event) {
		$('html, body').animate({
			scrollTop: $('#main').offset().top
		}, 400);
	});

	$('#callForm').validate({
		rules: {
			firstname: 'required',
			lastname: 'required',
			phone: 'required',
			email: 'required'
		},
		messages: {
			firstname: 'Please enter your firstname',
			lastname: 'Please enter your lastname',
			phone: 'Please enter your phone number',
			email: 'Please enter your email address',
		}
	})

    $('#callForm').submit(function(event) {
        $.ajax({
            type: 'POST',
            url: '/form',
            data: $(event.target).serialize(),
            success: function(resp) {
            	var data = JSON.parse(resp);
            	if (data.success) {
            		$('#form-success').html(data.message);
            		$('#form-error').html('');
            	} else {
            		$('#form-success').html('');
            		$('#form-error').html(data.message);
            	}
            	$('#submit').removeClass('is-loading');
            	grecaptcha.reset();
            }
        })

        $('#submit').addClass('is-loading');

        event.preventDefault();
    });
});