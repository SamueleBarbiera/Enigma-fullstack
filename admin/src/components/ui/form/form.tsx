import {useForm, UseFormReturn, SubmitHandler, FieldValues} from 'react-hook-form'

type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode
}

export const Form = <TFormValues extends Record<string, any> = Record<string, any>>({onSubmit, children}: FormProps<TFormValues>) => {
    const methods = useForm<TFormValues>()
    return <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
}
