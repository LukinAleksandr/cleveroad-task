import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { storage, database } from '../firebase'
import './CreatePage.sass'
import ProductCard from '../components/ProductCard/ProductCard'
import Input from '../components/UI/Input/Input'
import { validateInput } from '../validate/validateInput'
import { useInput } from '../hooks/input.hook'

const CreatePage = () => {
  const history = useHistory()
  const { changeTextInput, changeFileInput } = useInput()
  const userId = useSelector((state) => state.auth.userId)
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
    isValid: false,
    width: null,
    height: null,
  })
  const [filePreview, setFilePreview] = useState(null)
  const [image, setImage] = useState(null)
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

  const toggleCheckbox = (ev, callback) => {
    if (!ev.target.checked) {
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
    callback(ev.target.checked)
  }
  const clickHandler = () => {
    const uploadTask = storage.ref(`${userId}/${image.name}`).put(image)
    uploadTask.on(
      'state_changet',
      (snapshot) => {},
      (error) => {
        console.log(error)
      },
      () => {
        storage
          .ref(userId)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            writeInDatabase(url)
          })
      }
    )
  }

  const writeInDatabase = (url) => {
    const date =
      dateInput.value.trim() !== '' ? new Date(dateInput.value).getTime() : null

    const productRef = database.ref(userId)
    productRef.push({
      title: titleInput.value,
      picture: url,
      pictureName: image.name,
      description: descriptionInput.value,
      price: priceInput.value,
      discount: discountInput.value.trim() !== '' ? discountInput.value : null,
      date: date,
    })
    history.push('/products')
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
      <div className="wrapper">
        <div className="preview">
          <h5>Предварительный просмотр</h5>
          <ProductCard
            title={titleInput.value}
            picture={filePreview}
            description={descriptionInput.value}
            discount={discountInput.value || null}
            price={priceInput.value}
            date={new Date(dateInput.value).getTime() || null}
          />
        </div>
        <div id="form-create">
          <Input
            value={titleInput.value}
            name="title"
            label="Название"
            touched={!!titleInput.value}
            errorMessage="Введите название длинной 20-60 символов!"
            valid={titleInput.isValid}
            onChange={(ev) => changeTextInput(ev, setTitleInput)}
          ></Input>
          <Input
            type="file"
            errorMessage="Добавте фото размерами 200-4000px!"
            touched={!!fileInput.name}
            valid={fileInput.isValid}
            label="Фото"
            onChange={(ev) =>
              changeFileInput(ev, setFileInput, setImage, setFilePreview)
            }
          ></Input>
          <Input
            value={descriptionInput.value}
            name="description"
            label="Описание"
            touched={!!descriptionInput.value}
            errorMessage="Максимальная длинна 200 символов!"
            valid={descriptionInput.isValid}
            onChange={(ev) => changeTextInput(ev, setDescriptionInput)}
          ></Input>
          <Input
            value={priceInput.value}
            name="price"
            label="Стоимость"
            touched={!!priceInput.value}
            errorMessage="Некорректная стоимость!"
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
            <button
              className="btn btn-primary"
              onClick={clickHandler}
              disabled={!validForm}
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
