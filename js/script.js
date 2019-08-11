function CustomValidation() {
    this.invalidities = []; // массив для сообщений об ошибках
}

CustomValidation.prototype = {
    // добавление сообщений об ошибках в массив ошибок
    addInvalidity: function(message) {
        this.invalidities.push(message);
    },
    // получение общего текста сообщений об ошибках
    getInvalidities: function () {
        return this.invalidities.join('. \n');
    },
    // проверка валидности
    checkValidity: function (input) {
        /*if (input.value.length < 1 && input.classList.contains('required'))
            this.addInvalidity('Это поле не должно быть пустым');
        if (input.value.length > 1 && (!input.value.match(/[^А-Яа-яЁё\s-]+/)
            || !input.value.match(/\+?[7-8]{1}(\s|-)?\d{3}(\s|-)?\d{3}(\s|-)?\d{2}(\s|-)?\d{2}/)
            || !input.value.match(/^[^@]+@[^@.]+\.[^@]+$/)))
            this.addInvalidity('Неверный формат поля');*/
        console.log(document.querySelector('label[for="name"] li:nth-child(1)'));
        if (input.value.length < 3) {
            this.addInvalidity('Длина этого поля должна быть не менее трех символов');
            var element = document.querySelector('label[for="name"] li:nth-child(1)');
            element.classList.add('invalid');
            element.classList.remove('valid');
        } else {
            var element = document.querySelector('label[for="name"] li:nth-child(1)');
            element.classList.remove('invalid');
            element.classList.add('valid');
        }

        if (input.value.length > 255) {
            this.addInvalidity('Длина этого поля должна быть не более 255 символов');
            var element = document.querySelector('label[for="name"] li:nth-child(2)');
            element.classList.add('invalid');
            element.classList.remove('valid');
        } else {
            var element = document.querySelector('label[for="name"] li:nth-child(2)');
            element.classList.remove('invalid');
            element.classList.add('valid');
        }

        if (input.value.match(/[^А-Яа-яЁё\s-]+/)) {
            this.addInvalidity('В этом поле допустимы только русские буквы, пробелы и тире');
            var element = document.querySelector('label[for="name"] li:last-child');
            element.classList.add('invalid');
            element.classList.remove('valid');
        } else {
            var element = document.querySelector('label[for="name"] li:last-child');
            element.classList.remove('invalid');
            element.classList.add('valid');
        }
    }
};

var nameInput = document.getElementById('name');
nameInput.CustomValidation = new CustomValidation();
nameInput.addEventListener('keyup', function() {
    nameInput.CustomValidation.checkValidity(this);
});



