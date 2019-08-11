$(document).ready(function () {
    $('form').submit(function(event) {
        $.ajax({
            url: 'https://digital-spectr.com/ac/academy.php',
            method: 'post',
            dataType: 'html',
            data: $(this).serialize(),
            success: function (data) {
                alert('ОК');
            },
            error: function (data) {
                alert('НЕ ОК');
            }
        });
    })
});



