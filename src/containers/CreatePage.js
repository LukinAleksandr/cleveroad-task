import React, { useEffect, useReducer, useState } from 'react'
import './CreatePage.sass'
import { validateInput } from '../validate/validateInput'
import Input from '../components/UI/Input/Input'
import reducer from '../store/reducers/creat'
import { useInput } from '../hooks/input.hook'

const CreatePage = () => {
  const [state, dispatch] = useReducer(reducer, {
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
        // event: (ev) => chengeHandler(ev),
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
        // event: (ev) => chengeFileInput(form, setForm, ev),
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
        // event: (ev) => chengeHandler(ev),
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
        // event: (ev) => chengeHandler(ev),
      },
      checkbox: {
        value: '',
        type: 'checkbox',
        name: 'checkbox',
        checked: false,
        valid: true,
        label: 'Добавить скидку',
        // event: (ev) => checkboxToggle(ev),
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
        // event: (ev) => chengeHandler(ev),
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
        // event: (ev) => chengeHandler(ev),
      },
    },
  })

  const [titleInput, setTitleInput] = useState('')
  const [fileInput, setFileInput] = useState('')
  const [file, setFile] = useState({
    name: '',
    type: '',
    width: null,
    height: null,
  })
  const [descriptionInput, setDescriptionInput] = useState('')
  const [priceInput, setPriceInput] = useState('')
  const [checkedInput, setCheckedInput] = useState(false)
  const [discountInput, setDiscountInput] = useState('')
  const [dateInput, setDateInput] = useState('')

  const addTextInput = (ev, callback) => {
    const str = ev.target.value
    ev.target.touched = true
    callback(str)
  }
  const toggleCheckbox = (ev, callback) => {
    const status = ev.target.checked
    if (!status) {
      setDiscountInput('')
      setDateInput('')
    }
    callback(status)
  }

  useEffect(() => {
    console.log(discountInput)
  }, [discountInput])

  return (
    <div className="content">
      <h2>Добавить товар</h2>
      <h3>Even: {checkedInput ? 'true' : 'false'}</h3>
      <div id="form-create">
        <Input
          value={titleInput}
          name="title"
          label="Название товара"
          touched={!!titleInput}
          errorMessage="Введите название товара длинной 20-60 символов!"
          valid={validateInput(titleInput, {
            required: true,
            minLength: 20,
            maxLength: 60,
          })}
          onChange={(ev) => addTextInput(ev, setTitleInput)}
        ></Input>
        <Input
          value={fileInput}
          type="file"
          errorMessage="Добавте фото товара размерами 200-4000px!"
          label="Фото товара"
        ></Input>
        <Input
          value={descriptionInput}
          name="description"
          label="Описание товара"
          touched={!!descriptionInput}
          errorMessage="Максимальная длинна 200 символов!"
          valid={validateInput(descriptionInput, {
            maxLength: 200,
          })}
          onChange={(ev) => addTextInput(ev, setDescriptionInput)}
        ></Input>
        <Input
          value={priceInput}
          name="price"
          label="Стоимость товара"
          touched={!!priceInput}
          errorMessage="Некорректная стоимость товара!"
          type="number"
          valid={validateInput(priceInput, {
            required: true,
            min: 0,
            max: 99999999.99,
          })}
          onChange={(ev) => addTextInput(ev, setPriceInput)}
        ></Input>
        <Input
          checked={checkedInput}
          type="checkbox"
          label="Добавить скидку"
          onChange={(ev) => toggleCheckbox(ev, setCheckedInput)}
        ></Input>
        <Input
          value={discountInput}
          name="discount"
          label="Процент скидки"
          touched={!!discountInput}
          errorMessage="Процент скидки от 10 до 90!"
          type="number"
          disabled={!checkedInput}
          valid={
            !checkedInput
              ? true
              : validateInput(discountInput, {
                  required: true,
                  min: 10,
                  max: 90,
                })
          }
          onChange={(ev) => addTextInput(ev, setDiscountInput)}
        ></Input>
        <Input
          value={dateInput}
          name="date"
          errorMessage="Введите корректную дату!"
          type="date"
          valid={(ev) =>
            validateInput(ev, {
              required: true,
            })
          }
          label="Дата окончания скидки"
          disabled={!checkedInput || discountInput.trim() === ''}
          min={`${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`}
          onChange={(ev) => addTextInput(ev, setDateInput)}
        ></Input>
        <div id="buttons-block">
          <button className="btn btn-primary" disabled={!state.isFormValid}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
