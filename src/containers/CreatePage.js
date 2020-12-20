import React, { useState } from 'react'
import './CreatePage.sass'
import { validateInput } from '../validate/validateInput'
import Input from '../components/UI/Input/Input'

const CreatePage = () => {
  let [form, setForm] = useState({
    isFormValid: false,
    formInputs: {
      title: {
        value: '',
        type: 'text',
        name: 'title',
        label: 'Название товара',
        errorMessage: 'Введите название товара длинной 20-60 символов!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 20,
          maxLength: 60,
        },
        event: (ev) => chengeHandler(ev),
      },
      file: {
        type: 'file',
        name: 'file',
        label: 'Фото товара',
        errorMessage: 'Добавте фото товара размерами 200-4000px!',
        valid: false,
        touched: false,
        file: {
          name: '',
          type: '',
          width: null,
          height: null,
        },
        validation: {
          required: true,
          image: true,
          minSize: 200,
          maxSize: 4000,
        },
        event: (ev) => chengeHandler(ev),
      },
      description: {
        value: '',
        type: 'text',
        name: 'description',
        label: 'Описание товара',
        errorMessage: 'Максимальная длинна 200 символов!',
        valid: false,
        touched: false,
        validation: {
          maxLength: 200,
        },
        event: (ev) => chengeHandler(ev),
      },
      price: {
        value: '',
        type: 'number',
        name: 'price',
        label: 'Стоимость товара',
        errorMessage: 'Введите стоимость товара!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          min: 0,
          max: 99999999.99,
        },
        event: (ev) => chengeHandler(ev),
      },
      checkbox: {
        value: '',
        type: 'checkbox',
        name: 'checkbox',
        checked: false,
        valid: true,
        label: 'Добавить скидку',
        event: (ev) => checkboxToggle(ev),
      },
      discount: {
        value: '',
        type: 'number',
        name: 'discount',
        label: 'Процент скидки',
        disabled: true,
        errorMessage: 'Процент скидки от 10 до 90!',
        valid: true,
        touched: false,
        validation: null,
        event: (ev) => chengeHandler(ev),
      },
      date: {
        value: '',
        type: 'date',
        name: 'date',
        label: 'Дата окончания скидки',
        disabled: true,
        errorMessage: 'Введите корректную дату!',
        valid: true,
        touched: false,
        validation: null,
        event: (ev) => chengeHandler(ev),
      },
    },
  })

  const checkboxToggle = (ev) => {
    let formInputs = { ...form.formInputs }
    const discount = { ...formInputs.discount }
    const date = { ...formInputs.date }
    const checkbox = { ...formInputs.checkbox }
    checkbox.checked = ev.target.checked

    if (ev.target.checked) {
      discount.disabled = false
      discount.valid = false
      discount.validation = {
        required: true,
        min: 10,
        max: 90,
      }
      date.disabled = false
      date.valid = false
      date.validation = {
        required: true,
        data: true,
      }
    } else {
      discount.disabled = true
      discount.valid = true
      discount.validation = null
      date.validation = true
      date.valid = true
      date.validation = null
    }
    formInputs = { ...formInputs, discount, date, checkbox }
    console.log(formInputs)

    setForm((state) => ({
      ...state,
      formInputs,
    }))
  }
  const chengeHandler = (ev) => {
    setForm((prevState) => {
      let isFormValid = true
      const formInputs = { ...prevState.formInputs }
      const targetInput = { ...formInputs[ev.target.name] }
      targetInput.touched = true
      let promise = new Promise((res, rej) => {
        if (targetInput.name === 'file') {
          let file = ev.target.files[0]
          targetInput.file.name = file.name
          targetInput.file.type = file.type
          if (file.type.split('/')[0] === 'image') {
            let _URL = window.URL || window.webkitURL
            let img = new Image()
            let objectUrl = _URL.createObjectURL(file)
            img.src = objectUrl
            img.onload = function () {
              _URL.revokeObjectURL(objectUrl)
              targetInput.file.width = this.width
              targetInput.file.height = this.height
              res()
            }
          } else {
            targetInput.file.width = null
            targetInput.file.height = null
            res()
          }
        } else {
          targetInput.value = ev.target.value
          res()
        }
      })
      promise
        .then((data) => {
          targetInput.valid = validateInput(targetInput)
          return true
        })
        .then((data) => {
          formInputs[ev.target.name] = targetInput
          Object.keys(formInputs).forEach((name) => {
            isFormValid = formInputs[name].valid && isFormValid
          })
          setForm({
            isFormValid,
            formInputs,
          })
          console.log(form)
        })
    })
  }

  return (
    <div className="content">
      <h2>Добавить товар</h2>
      <h3>Even: {form.formInputs.checkbox.checked ? 'true' : 'false'}</h3>
      <div id="form-create">
        {Object.keys(form.formInputs).map((item, index) => {
          const input = form.formInputs[item]
          return (
            <Input
              key={input.type + index}
              values={input.value}
              type={input.type}
              label={input.label}
              name={input.name}
              checked={input.checked}
              disabled={input.disabled || false}
              errorMessage={input.errorMessage}
              valid={input.valid}
              event={input.event || null}
              touched={input.touched}
              shouldValidate={!!input.validation}
              onChange={input.event}
            />
          )
        })}

        <div id="buttons-block">
          <button
            className="btn btn-primary"
            disabled={!form.isFormValid}
            // onClick={() => authHandler('log')}
          >
            Добавить
          </button>
        </div>
      </div>
      {/* <span className="error">{error}</span> */}
    </div>
  )
}

export default CreatePage
