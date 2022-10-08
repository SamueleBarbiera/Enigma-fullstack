import { Control, Controller, FieldErrors } from 'react-hook-form'
import { Switch } from '@headlessui/react'
import ValidationError from './form-validation-error'
import { useTranslation } from 'next-i18next'

interface Props {
    control: Control<any>
    errors: string | FieldErrors | TemplateStringsArray | (string | TemplateStringsArray)[]
    label: string
    name: string
}

const SwitchInput = ({ control, label, name, errors }: Props) => {
    const { t } = useTranslation()
    return (
        <div>
            <div>{label}</div>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Switch
                        checked={value as boolean | undefined}
                        onChange={onChange}
                        className={`${
                            value ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                        <span className="sr-only">Enable {label}</span>
                        <span
                            className={`${
                                value ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-light`}
                        />
                    </Switch>
                )}
            />
            <ValidationError message={t(errors[name]?.message)} />
        </div>
    )
}

export default SwitchInput
