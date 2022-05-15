import { InferType, object, string } from 'yup'

export const LoginSchema = object({
    username: string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
    password: string().min(4, 'Too Short!').max(30, 'Too Long!').required('Обязательное поле'),
})
export type LoginInputs = InferType<typeof LoginSchema> & {
    readonly showPassword: boolean
}
