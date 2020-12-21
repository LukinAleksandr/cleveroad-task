// import { useCallback } from 'react'
// import { validateInput } from '../validate/validateInput'

// const getFileSize = async (ev, setState) => {
//   try {
//     let file = ev.target.files[0]
//     fileProp.name = file.name
//     fileProp.type = file.type
//     if (file.type.split('/')[0] === 'image') {
//       let _URL = window.URL || window.webkitURL
//       let img = new Image()
//       let objectUrl = _URL.createObjectURL(file)
//       img.onload = function () {
//         _URL.revokeObjectURL(objectUrl)
//         fileProp.width = this.width
//         fileProp.height = this.height
//         targetInput.valid = validateInput(targetInput)
//       }
//       img.src = objectUrl
//     } else {
//       fileProp.width = null
//       fileProp.height = null
//     }
//   } catch (e) {}
// }

// export const useInput = () => {
//   const chengeFileInput = useCallback((state, setState, ev) => {
//     let isFormValid = true
//     const formInputs = { ...state.formInputs }
//     let targetInput = { ...formInputs[ev.target.name] }
//     const fileProp = { ...targetInput.file }
//     targetInput.touched = true

//     promise
//       .then(() => {
//         return true
//       })
//       .then(() => {
//         formInputs[ev.target.name] = targetInput
//         Object.keys(formInputs).forEach((name) => {
//           isFormValid = formInputs[name].valid && isFormValid
//         })
//         targetInput = { ...targetInput, file: fileProp }
//         setState({
//           isFormValid,
//           formInputs,
//         })
//       })
//   }, [])

//   return { chengeFileInput }
// }
