import axios from 'axios'
import {awaitExpression} from '@babel/types'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'

/**
 * INITIAL STATE
 */
const productList = {allProducts: {}, selectedProduct: {}}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

const getOneProduct = product => ({type: GET_ONE_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getOneProductThunk = pId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${pId}`)
    console.log('thunk' + res.data)
    dispatch(getOneProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const addProductThunk = newData => async dispatch => {
  try {
    await axios({
      url: `/api/products`,
      method: 'POST',
      data: newData
    })
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateProductThunk = (pId, newData) => async dispatch => {
  try {
    await axios({
      url: `/api/products/${pId}`,
      method: 'PUT',
      data: newData
    })
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteProductThunk = pId => async dispatch => {
  try {
    await axios.delete(`/api/products/${pId}`)
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = productList, action) {
  const newBatchOfProducts = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case GET_PRODUCTS:
      newBatchOfProducts.allProducts = action.products
      return newBatchOfProducts
    case GET_ONE_PRODUCT:
      // return action.product
      newBatchOfProducts.selectedProduct = action.product
      return newBatchOfProducts
    default:
      return state
  }
}
