import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { storage, database } from '../firebase'
import './CreatePage.sass'
import { validateInput } from '../validate/validateInput'
import Input from '../components/UI/Input/Input'
import { useInput } from '../hooks/input.hook'
import ProductCard from '../components/ProductCard/ProductCard'
import { fetchEnd, fetchStart } from '../store/actions/products'

const formatDate = (date) => {
  let formatDate = new Date(date)
  let year = formatDate.getFullYear()
  let month = formatDate.getMonth() + 1
  let day = formatDate.getDate()
  day = String(day).length === 1 ? `0${day}` : day
  month = String(month).length === 1 ? `0${month}` : month
  return `${year}-${month}-${day}`
}

const EditPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.products.loading)
  const products = useSelector((state) => state.products.products)
  const userId = useSelector((state) => state.auth.userId)

  const product = products.find((element) => element.id === id)

  const { changeTextInput, changeFileInput } = useInput()

  const [validForm, setValidForm] = useState(false)
  const [titleInput, setTitleInput] = useState({
    value: product.title,
    isValid: true,
    validation: {
      required: true,
      minLength: 20,
      maxLength: 60,
    },
  })
  const [fileInput, setFileInput] = useState({
    name: '',
    isValid: true,
    width: null,
    height: null,
  })
  const [filePreview, setFilePreview] = useState(product.picture)
  const [image, setImage] = useState(null)
  const [descriptionInput, setDescriptionInput] = useState({
    value: product.description,
    isValid: true,
    validation: {
      maxLength: 200,
    },
  })
  const [priceInput, setPriceInput] = useState({
    value: product.price,
    isValid: true,
    validation: {
      required: true,
      min: 0,
      max: 99999999.99,
    },
  })
  const [checkedInput, setCheckedInput] = useState(!!product.date)
  const [discountInput, setDiscountInput] = useState({
    value: product.discount || '',
    isValid: true,
    validation: {
      required: true,
      min: 10,
      max: 90,
    },
  })

  const [dateInput, setDateInput] = useState({
    value: product.date ? formatDate(product.date) : '',
    isValid: true,
    validation: {
      required: true,
    },
  })

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
  const editProduct = () => {
    dispatch(fetchStart())
    if (image !== null) {
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
    } else {
      writeInDatabase(filePreview)
    }
  }
  const writeInDatabase = (url) => {
    const date =
      dateInput.value.trim() !== '' ? new Date(dateInput.value).getTime() : null
    const productRef = database.ref(product.userId).child(id)
    productRef.update({
      title: titleInput.value,
      picture: url,
      description: descriptionInput.value,
      price: priceInput.value,
      discount: discountInput.value.trim() !== '' ? discountInput.value : null,
      date: date,
    })
    dispatch(fetchEnd())
    history.push(`/products`)
  }
  const removeProduct = () => {
    dispatch(fetchStart())
    const productRef = database.ref(product.userId).child(id)
    const productPicture = storage
      .ref(product.userId)
      .child(product.pictureName)
    productPicture.delete()
    productRef.remove()
    dispatch(fetchEnd())
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
      <h2>Редактирование</h2>
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
        <div id="form-edit">
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
            label="%"
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
            label="Дата окончания"
            touched={!!discountInput}
            disabled={!checkedInput || discountInput.value.trim() === ''}
            min={formatDate(new Date().getTime())}
            onChange={(ev) => changeTextInput(ev, setDateInput)}
          ></Input>
          <div id="buttons-block">
            <button
              className="btn btn-primary"
              onClick={editProduct}
              disabled={!validForm || loading}
            >
              Редактировать
            </button>
            <button className="btn btn-danger" onClick={removeProduct}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPage
