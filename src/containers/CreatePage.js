import React, { useState, useEffect } from 'react'
import './CreatePage.sass'
import { validateInput } from '../validate/validateInput'
import Input from '../components/UI/Input/Input'

const CreatePage = () => {
  const [validForm, setValidForm] = useState(false)
  const [titleInput, setTitleInput] = useState({
    value: '',
    isValid: false,
    validation: {
      required: true,
      minLength: 20,
      maxLength: 60,
    },
  })
  const [fileInput, setFileInput] = useState({
    name: '',
    type: '',
    isValid: false,
    width: null,
    height: null,
  })
  const [descriptionInput, setDescriptionInput] = useState({
    value: '',
    isValid: false,
    validation: {
      maxLength: 200,
    },
  })
  const [priceInput, setPriceInput] = useState({
    value: '',
    isValid: false,
    validation: {
      required: true,
      min: 0,
      max: 99999999.99,
    },
  })
  const [checkedInput, setCheckedInput] = useState(false)
  const [discountInput, setDiscountInput] = useState({
    value: '',
    isValid: true,
    validation: {
      required: true,
      min: 10,
      max: 90,
    },
  })
  const [dateInput, setDateInput] = useState({
    value: '',
    isValid: true,
    validation: {
      required: true,
    },
  })

  const changeTextInput = (ev, callback) => {
    const str = ev.target.value
    ev.target.touched = true
    callback((prevState) => {
      return {
        ...prevState,
        isValid: validateInput(str, prevState.validation),
        value: str,
      }
    })
  }

  const changeFileInput = (ev, callback) => {
    let file = ev.target.files[0]
    if (file.type.split('/')[0] === 'image') {
      let _URL = window.URL || window.webkitURL
      let img = new Image()
      let objectUrl = _URL.createObjectURL(file)
      img.onload = function () {
        _URL.revokeObjectURL(objectUrl)
        console.log(
          validateInput(
            {
              width: this.width,
              height: this.height,
            },
            {
              minSize: 200,
              maxSize: 4000,
            }
          )
        )
        callback((prevState) => {
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
            type: file.type,
          }
        })
      }
      img.src = objectUrl
    } else {
      callback((prevState) => {
        return {
          ...prevState,
          width: null,
          height: null,
          isValid: false,
          name: file.name,
          type: file.type,
        }
      })
    }
  }
  const toggleCheckbox = (ev, callback) => {
    const status = ev.target.checked
    if (!status) {
      setDiscountInput((prevState) => {
        return {
          ...prevState,
          isValid: true,
          value: '',
        }
      })
      setDateInput((prevState) => {
        return {
          ...prevState,
          isValid: true,
          value: '',
        }
      })
    } else {
      setDiscountInput((prevState) => {
        return {
          ...prevState,
          isValid: validateInput(prevState.value, prevState.validation),
        }
      })
      setDateInput((prevState) => {
        return {
          ...prevState,
          isValid: validateInput(prevState.value, prevState.validation),
        }
      })
    }
    callback(status)
  }

  useEffect(() => {
    const validForm =
      titleInput.isValid &&
      fileInput.isValid &&
      descriptionInput.isValid &&
      priceInput.isValid &&
      discountInput.isValid &&
      dateInput.isValid
    setValidForm(validForm)
  }, [
    titleInput,
    fileInput,
    descriptionInput,
    priceInput,
    checkedInput,
    discountInput,
    dateInput,
  ])

  return (
    <div className="content">
      <h2>Добавить товар</h2>
      <div id="form-create">
        <Input
          value={titleInput.value}
          name="title"
          label="Название товара"
          touched={!!titleInput.value}
          errorMessage="Введите название товара длинной 20-60 символов!"
          valid={titleInput.isValid}
          onChange={(ev) => changeTextInput(ev, setTitleInput)}
        ></Input>
        <Input
          type="file"
          errorMessage="Добавте фото товара размерами 200-4000px!"
          touched={!!fileInput.name}
          valid={fileInput.isValid}
          label="Фото товара"
          onChange={(ev) => changeFileInput(ev, setFileInput)}
        ></Input>
        <Input
          value={descriptionInput.value}
          name="description"
          label="Описание товара"
          touched={!!descriptionInput.value}
          errorMessage="Максимальная длинна 200 символов!"
          valid={descriptionInput.isValid}
          onChange={(ev) => changeTextInput(ev, setDescriptionInput)}
        ></Input>
        <Input
          value={priceInput.value}
          name="price"
          label="Стоимость товара"
          touched={!!priceInput.value}
          errorMessage="Некорректная стоимость товара!"
          type="number"
          valid={priceInput.isValid}
          onChange={(ev) => changeTextInput(ev, setPriceInput)}
        ></Input>
        <Input
          checked={checkedInput}
          type="checkbox"
          label="Добавить скидку"
          onChange={(ev) => toggleCheckbox(ev, setCheckedInput)}
        ></Input>
        <Input
          value={discountInput.value}
          name="discount"
          label="Процент скидки"
          touched={!!discountInput.value}
          errorMessage="Процент скидки от 10 до 90!"
          type="number"
          disabled={!checkedInput}
          valid={!checkedInput ? true : discountInput.isValid}
          onChange={(ev) => changeTextInput(ev, setDiscountInput)}
        ></Input>
        <Input
          value={dateInput.value}
          name="date"
          errorMessage="Введите корректную дату!"
          type="date"
          valid={dateInput.isValid}
          label="Дата окончания скидки"
          touched={!!discountInput}
          disabled={!checkedInput || discountInput.value.trim() === ''}
          min={`${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`}
          onChange={(ev) => changeTextInput(ev, setDateInput)}
        ></Input>
        <div id="buttons-block">
          <button className="btn btn-primary" disabled={!validForm}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
