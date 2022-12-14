import Select from '@components/ui/select/select'
import { Control, Controller, FieldPath, FieldPathValue, FieldValues, RegisterOptions, useForm } from 'react-hook-form'

interface SelectInputProps {
    control: any
    rules?: any
    name: string
    options?: any
    [key: string]: unknown
}

const SelectInput = ({
    control,
    options,
    name,
    rules,
    getOptionLabel,
    getOptionValue,
    isMulti,
    isClearable,
    isLoading,
    ...rest
}: SelectInputProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            {...rest}
            render={({ field }) => (
                <Select
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
