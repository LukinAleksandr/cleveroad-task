import is from 'is_js'

export const validateInput = (input) => {
  if (!input.validation) {
    return true
  }
  let isValid = true

  if (input.validation.required) {
    if (input.value) {
      isValid = input.value.trim() !== '' && isValid
    }
    if (input.file) {
      isValid = input.file.name !== '' && isValid
    }
  }
  if (input.validation.email) {
    isValid = is.email(input.value) && isValid
  }
  if (input.validation.minLength) {
    isValid = input.value.trim().length >= input.validation.minLength && isValid
  }
  if (input.validation.maxLength) {
    isValid = input.value.trim().length <= input.validation.maxLength && isValid
  }
  if (input.validation.minSize) {
    isValid =
      input.file.width >= input.validation.minSize &&
      input.file.height >= input.validation.minSize &&
      isValid
  }
  if (input.validation.maxSize) {
    isValid =
      input.file.width <= input.validation.maxSize &&
      input.file.height <= input.validation.maxSize &&
      isValid
  }
  if (input.validation.image) {
    isValid = input.file.type.split('/')[0] === 'image' && isValid
  }
  if (input.validation.min) {
    isValid = Number(input.value) >= input.validation.min && isValid
  }
  if (input.validation.max) {
    isValid = Number(input.value) <= input.validation.max && isValid
  }

  return isValid
}
