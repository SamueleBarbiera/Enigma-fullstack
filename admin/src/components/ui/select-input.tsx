import Select from '@components/ui/select/select'
import { Control, Controller, FieldPath, FieldPathValue, FieldValues, RegisterOptions, useForm } from 'react-hook-form'

export declare type ControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    shouldUnregister?: boolean
    defaultValue?: FieldPathValue<TFieldValues, TName>
    control?: Control<any>
    options?: any
    [key: string]: unknown
    getOptionLabel: unknown
    getOptionValue: unknown
    isMulti: unknown
    isClearable: unknown
    isLoading: boolean
}

const SelectInput = ({
    options,
    name,
    rules,
    getOptionLabel,
    getOptionValue,
    isMulti,
    isClearable,
    isLoading,
    ...rest
}: ControllerProps) => {
    const { control } = useForm()
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            {...rest}
            render={({ field }) => (
                <Select
                    key={field.value}
                    {...field}
                    getOptionLabel={getOptionLabel}
                    getOptionValue={getOptionValue}
                    isMulti={isMulti}
                    isClearable={isClearable}
                    isLoading={isLoading}
                    options={options}
                />
            )}
        />
    )
}

export default SelectInput
