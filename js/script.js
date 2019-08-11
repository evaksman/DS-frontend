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
        for (var i = 0; i < nameValidityChecks.length; i++) {
            var isInvalid = nameValidityChecks[i].isInvalid(input);
            if(isInvalid) {
                this.addInvalidity(nameValidityChecks[i].invalidityMessage);
                nameValidityChecks[i].element.classList.add('invalid');
                nameValidityChecks[i].element.classList.remove('valid');
            } else {
                nameValidityChecks[i].element.classList.remove('invalid');
                nameValidityChecks[i].element.classList.add('valid');
            }
        }
    }
};

var nameValidityChecks = [
    {
       isInvalid: function(input) {
           return input.value.length < 3;
        },
        invalidityMessage: 'Длина этого поля должна быть не менее трех символов',
        element: document.querySelector('label[for="name"] li:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            return input.value.length > 255;
        },
        invalidityMessage: 'Длина этого поля должна быть не более 255 символов',
        element: document.querySelector('label[for="name"] li:nth-child(2)')
    },
    {
        isInvalid: function(input) {
            var legalCharacters = input.value.match(/[^А-Яа-яЁё\s-]+/);
            return !!legalCharacters;
        },
        invalidityMessage: 'В этом поле допустимы только русские буквы, пробелы и тире',
        element: document.querySelector('label[for="name"] li:last-child')
    },
];

var nameInput = document.getElementById('name');
nameInput.CustomValidation = new CustomValidation();
nameInput.addEventListener('keyup', function() {
    nameInput.CustomValidation.checkValidity(this);
});



