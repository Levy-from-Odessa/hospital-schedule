
import { helpers } from 'vuelidate/lib/validators'
const regexp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

export default helpers.regex('isTime', regexp)
