import { useCallback } from 'react'
import { validateInput } from '../validate/validateInput'

export const useInput = () => {
  const changeTextInput = useCallback((ev, callback) => {
    const str = ev.target.value
    ev.target.touched = true
    callback((prevState) => {
      return {
        ...prevState,
        isValid: validateInput(str, prevState.validation),
        value: str,
      }
    })
  }, [])
  const changeFileInput = useCallback(
    (ev, fileCallback, imageCallback, previewCallback) => {
      let file = ev.target.files[0]
      imageCallback(file)
      if (file.type.split('/')[0] === 'image') {
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        let objectUrl = _URL.createObjectURL(file)
        previewCallback(objectUrl)
        img.onload = function () {
          _URL.revokeObjectURL(objectUrl)
          fileCallback((prevState) => {
            return {
              ...prevState,
              width: this.width,
              height: this.height,
              isValid: validateInput(
                {
                  width: this.width,
                  height: this.height,
                },
                {
                  minSize: 200,
                  maxSize: 4000,
                }
              ),
              name: file.name,
            }
          })
        }
        img.src = objectUrl
      } else {
        fileCallback((prevState) => {
          return {
            ...prevState,
            width: null,
            height: null,
            isValid: false,
            name: file.name,
          }
        })
      }
    },
    []
  )

  return { changeTextInput, changeFileInput }
}
