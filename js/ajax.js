$(document).ready(function () {
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'https://digital-spectr.com/ac/academy.php',
            method: 'post',
            dataType: 'html',
            data: $(this).serialize(),
            success: function (data) {
                alert(data);
            },
            error: function (data) {
                alert(data);
            }
        });
    })
});



