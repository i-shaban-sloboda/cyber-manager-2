import { defineMessages } from 'react-intl'

export const inputValidationErrors = defineMessages({
    tooShort: {
        defaultMessage: 'Слишком мало символов!',
    },
    tooLong: {
        defaultMessage: 'Слишком мало символов!',
    },
    required: {
        defaultMessage: 'Обязательное поле',
    },
    passwordsShouldBeEqual: {
        defaultMessage: 'Пароли должны совпадать',
    },
})
