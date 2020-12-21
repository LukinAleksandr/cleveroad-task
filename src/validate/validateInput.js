import is from 'is_js'

export const validateInput = (input, prop) => {
  if (!prop) {
    return true
  }
  let isValid = true

  if (prop.hasOwnProperty('required')) {
    isValid = input.trim() !== '' && isValid
  }
  if (prop.hasOwnProperty('email')) {
    isValid = is.email(input) && isValid
  }
  if (prop.hasOwnProperty('minLength')) {
    isValid = input.trim().length >= prop.minLength && isValid
  }
  if (prop.hasOwnProperty('maxLength')) {
    isValid = input.trim().length <= prop.maxLength && isValid
  }
  if (prop.hasOwnProperty('minSize')) {
    isValid =
      input.file.width >= prop.minSize &&
      input.file.height >= prop.minSize &&
      isValid
  }
  if (prop.hasOwnProperty('maxSize')) {
    isValid =
      input.file.width <= prop.maxSize &&
      input.file.height <= prop.maxSize &&
      isValid
  }
  if (prop.hasOwnProperty('image')) {
    isValid = input.file.type.split('/')[0] === 'image' && isValid
  }
  if (prop.hasOwnProperty('min')) {
    isValid = Number(input) >= prop.min && isValid
  }
  if (prop.hasOwnProperty('max')) {
    isValid = Number(input) <= prop.max && isValid
  }

  return isValid
}
