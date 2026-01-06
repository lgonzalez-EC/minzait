$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            $.ajax({
                url: "https://api.web3forms.com/submit",
                type: "POST",
                data: {
                    access_key: "51a0f322-b0a4-4d50-b6b6-15e8431e24fd",
                    name: name,
                    email: email,
                    phone: phone,
                    subject: subject,
                    message: message
                },
                cache: false,
                success: function (data) {
                    if (data.success) {
                        $('#modalMessage').text("Tu mensaje ha sido enviado exitosamente.");
                        $('#successModal').modal('show');
                        $('#contactForm').trigger("reset");
                    } else {
                        $('#modalMessage').text("Error: " + data.message);
                        $('#successModal').modal('show');
                    }
                },
                error: function () {
                    $('#modalMessage').text("Lo sentimos, parece que hay un problema con el servidor. Por favor, intenta de nuevo más tarde.");
                    $('#successModal').modal('show');
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
