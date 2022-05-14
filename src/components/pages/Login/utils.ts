import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    username: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
    password: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
})
