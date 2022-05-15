import { InferType, object, ref, string } from 'yup'

export const RegistrationFESchema = object().shape({
    name: string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
    email: string().email().required('Обязательное поле'),
    password: string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
    repeatPassword: string()
        .min(4, 'Too Short!')
        .max(30, 'Too Long!')
        .oneOf([ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
})

export const RegistrationBESchema = RegistrationFESchema.omit(['repeatPassword'])

export type RegistrationInputs = InferType<typeof RegistrationFESchema> & {
    readonly showPassword: boolean
}
