import * as Validators from 'vuelidate/lib/validators'
import isTime from './customValidators/isTime'
import { ISchema } from '@/components/Form/types'

export interface IVuelidators {
  [key: string]: Validators.ValidationRule;
}

// WITHOUT SOLO FORM
export default (schema: ISchema) => {
  const normalValidators = {
    isTime,
    ...Validators
  } as unknown as IVuelidators

  return Object.keys(schema).reduce(
    (validateFields: any, elementName: string) => {
      const item = schema[elementName]

      const vueValidations: IVuelidators = {}

      if (!item.validations) {
        return validateFields
      }
      const itemValidations = item.validations

      Object.keys(itemValidations).forEach((rule: string) => {
        const { params } = itemValidations[rule]

        if (params) {
          vueValidations[rule] = normalValidators[rule](
            params
          ) as unknown as Validators.ValidationRule
        } else {
          vueValidations[rule] = normalValidators[rule]
        }
      })

      validateFields[elementName] = vueValidations
      return validateFields
    },
    {}
  )
}
