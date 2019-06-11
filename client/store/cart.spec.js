import {expect} from 'chai'
import {addProductOrChnageQty, removeProduct, submitOrderThunk} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart actions and thunks', () => {
  let store
  let mockAxios

  const initialState = {user: {}, cart: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('add product', () => {
    it('adds a key value pair to the cart with a qty', () => {
      store.dispatch(addProductOrChnageQty(1, 5))
      store.dispatch(addProductOrChnageQty(2, 4))
      store.dispatch(addProductOrChnageQty(3, 3))
      const actions = store.getActions()
      expect(actions.length).to.be.equal(3)
    })
  })

  describe('changing qty', () => {
    it('updates the quautity in the store', () => {
      store.dispatch(addProductOrChnageQty(34))
      let actions = store.getActions()
      expect(actions.length).to.be.equal(1)
      store.dispatch(addProductOrChnageQty(34, 10))
      actions = store.getActions()
      expect(actions.length).to.be.equal(2)
      expect(actions[0].productId).to.be.equal(34)
      expect(actions[1].productId).to.be.equal(34)
    })
  })

  describe('successful order submit', () => {
    it('empties the cart', async () => {
      store.dispatch(addProductOrChnageQty(3, 4))
      store.dispatch(addProductOrChnageQty(56, 3))
      store.dispatch(addProductOrChnageQty(10, 2))
      mockAxios.onPut('api/order').replyOnce(204)
      await store.dispatch(submitOrderThunk({}))
      const actions = store.getActions()
      expect(actions.length).to.be.equal(4)
    })
  })

  describe('failed order submit', () => {
    it('doesnt empty the cart', async () => {
      store.dispatch(addProductOrChnageQty(3, 4))
      store.dispatch(addProductOrChnageQty(56, 3))
      store.dispatch(addProductOrChnageQty(10, 2))
      mockAxios.onPut('api/order').replyOnce(500)
      await store.dispatch(submitOrderThunk({}))
      const actions = store.getActions()
      expect(actions.length).to.be.equal(3)
    })
  })
})
