import * as Yup from 'yup'

export const RegistrationSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
    password: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
    repeatPassword: Yup.string()
        .min(4, 'Too Short!')
        .max(30, 'Too Long!')
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
})
