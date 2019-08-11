function CustomValidation() {
    this.invalidities = []; // массив для сообщений об ошибках
    this.validityChecks = []; // массив для проверки валидности
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
        for (var i = 0; i < this.validityChecks.length; i++) {
            var isInvalid = this.validityChecks[i].isInvalid(input);
            if(isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
                this.validityChecks[i].element.classList.add('invalid');
                this.validityChecks[i].element.classList.remove('valid');
            } else {
                this.validityChecks[i].element.classList.remove('invalid');
                this.validityChecks[i].element.classList.add('valid');
            }
        }
    }
};

/* массивы с данными о валидности для каждого инпута */
var nameValidityChecks = [
    {
       isInvalid: function(input) {
           return input.value.length < 3;
        },
        invalidityMessage: 'Длина этого поля должна быть не менее 3 символов',
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
    }
];

var phoneValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length < 11;
        },
        invalidityMessage: 'Длина этого поля должна быть не менее 11 символов',
        element: document.querySelector('label[for="phone"] li:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            return input.value.length > 16;
        },
        invalidityMessage: 'Длина этого поля должна быть не более 16 символов',
        element: document.querySelector('label[for="phone"] li:nth-child(2)')
    },
    {
        isInvalid: function(input) {
            var legalCharacters = input.value.match(/\+?[7-8](\s|-)?\d{3}(\s|-)?\d{3}(\s|-)?\d{2}(\s|-)?\d{2}/);
            return !legalCharacters;
        },
        invalidityMessage: 'В этом поле допустимы только цифры, пробелы, - и +',
        element: document.querySelector('label[for="phone"] li:last-child')
    }
];

var emailValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length < 3;
        },
        invalidityMessage: 'Длина этого поля должна быть не менее 3 символов',
        element: document.querySelector('label[for="email"] li:nth-child(1)')
    },
    {
        isInvalid: function(input) {
            return input.value.length > 129;
        },
        invalidityMessage: 'Длина этого поля должна быть не более 129 символов',
        element: document.querySelector('label[for="email"] li:nth-child(2)')
    },
    {
        isInvalid: function (input) {
            var legalCharacters = input.value.match(/[^@]+@[^@.]+\.[^@]+$/);
            return !legalCharacters;
        },
        invalidityMessage: 'Валидный формат: *@*.*',
        element: document.querySelector('label[for="email"] li:last-child')
    }
];

/* проверяем инпут и устанавливаем свои сообщения об ошибках */
function checkInput(input) {
    input.CustomValidation.invalidities.splice(0, input.CustomValidation.invalidities.length)
    input.CustomValidation.checkValidity(input);
    if (input.CustomValidation.invalidities.length === 0 && input.value !== '') {
        input.setCustomValidity('');
    } else {
        var message = input.CustomValidation.getInvalidities();
        input.setCustomValidity(message);
    }
}

/* инициализируем свой прототип для каждого инпута и
    устанавливаем, какой массив нужно для него использовать */
var nameInput = document.getElementById('name');
var phoneInput = document.getElementById('phone');
var emailInput = document.getElementById('email');

nameInput.CustomValidation = new CustomValidation();
nameInput.CustomValidation.validityChecks = nameValidityChecks;

phoneInput.CustomValidation = new CustomValidation();
phoneInput.CustomValidation.validityChecks = phoneValidityChecks;

emailInput.CustomValidation = new CustomValidation();
emailInput.CustomValidation.validityChecks = emailValidityChecks;

/* отслеживаем события keyup в инпутах и click по кнопке */
var inputs = document.querySelectorAll('input:not([type="submit"])');
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function() {
        checkInput(this);
    });
}

var submit = document.querySelector('input[type="submit"]');
submit.addEventListener('click', function () {
    for (var i = 0; i < inputs.length; i++) {
        checkInput(this);
    }
});


