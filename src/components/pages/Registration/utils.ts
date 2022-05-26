import { InferType, object, ref, string } from 'yup'

export const RegistrationFESchema = object().shape({
    name: string()
        .min(4, 'Слишком мало символов!')
        .max(30, 'Слишком много символов!')
        .required('Обязательное поле'),
    email: string().email().required('Обязательное поле'),
    password: string()
        .min(4, 'Слишком мало символов')
        .max(30, 'Слишком много символов!')
        .required('Обязательное поле'),
    repeatPassword: string()
        .min(4, 'Слишком мало символов')
        .max(30, 'Слишком много символов!')
        .oneOf([ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
})

export const RegistrationBESchema = RegistrationFESchema.omit(['repeatPassword'])

export type RegistrationInputs = InferType<typeof RegistrationFESchema> & {
    readonly showPassword: boolean
}
