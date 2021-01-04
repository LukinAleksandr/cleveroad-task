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
  if (prop.hasOwnProperty('number')) {
    console.log(input * 1)
    isValid = is.number(input * 1) && isValid
  }
  if (prop.hasOwnProperty('minLength')) {
    isValid = input.trim().length >= prop.minLength && isValid
  }
  if (prop.hasOwnProperty('maxLength')) {
    isValid = input.trim().length <= prop.maxLength && isValid
  }
  if (prop.hasOwnProperty('minSize')) {
    isValid =
      input.width >= prop.minSize && input.height >= prop.minSize && isValid
  }
  if (prop.hasOwnProperty('maxSize')) {
    isValid =
      input.width <= prop.maxSize && input.height <= prop.maxSize && isValid
  }
  if (prop.hasOwnProperty('image')) {
    isValid = input.file.type.split('/')[0] === 'image' && isValid
  }
  if (prop.hasOwnProperty('min')) {
    const penny = input.split('.')[1] || '00'
    isValid = Number(input) >= prop.min && isValid && penny.length < 3
  }
  if (prop.hasOwnProperty('max')) {
    const penny = input.split('.')[1] || '00'
    isValid = Number(input) <= prop.max && isValid && penny.length < 3
  }

  return isValid
}
