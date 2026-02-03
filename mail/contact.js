$(function () {

    $("#quoteForm input, #quoteForm textarea, #quoteForm select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();

            var $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            // Using Formspree for GitLab Pages compatibility (no PHP needed)
            $.ajax({
                url:"https://formspree.io/f/xeezdgln",
                type: "POST",
                data: $form.serialize(),
                dataType: "json",
                cache: false,
                success: function () {
                    window.location.href = "thank-you.html";
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später noch einmal."));
                    $('#success > .alert-danger').append('</div>');
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

