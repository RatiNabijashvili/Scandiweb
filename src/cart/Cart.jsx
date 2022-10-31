import React from 'react'
import Styles from './cart.module.css'
import Context from '../Context'
import CartComponent from './cartComponents/CartComponent'
import { Link } from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      data: undefined,
    }
  }

  getQuantitySum = (cartList) => {
    let sum = 0
    cartList.forEach((product) => {
      sum += product.quantity
    })
    return sum
  }

  getPriceSum = (cartList) => {
    const { index } = this.context
    let sum = 0
    cartList.forEach((product) => {
      sum += product.prices[index].amount * product.quantity
    })
    return sum
  }

  getTax = (cartList) => {
    const { index } = this.context
    let sum = 0
    cartList.forEach((product) => {
      sum += product.prices[index].amount * product.quantity
    })
    sum = (sum / 100) * 21
    return sum
  }

  render() {
    const { cartList, orderItem, index } = this.context
    return (
      <div className={Styles['main-container']}>
        <div>
          <h2 className={Styles['cart-text']}>Cart</h2>
        </div>
        <ul>
          {cartList.map((item) => {
            return (
              <CartComponent
                attributes={item.attributes}
                key={item.id}
                item={item.id}
                itemQuantity={item.quantity}
                addToCartItem={item}
                removeFromCartItem={item.id}
              />
            )
          })}
        </ul>
        {cartList.length !== 0 && (
          <div className={Styles.summary}>
            <div>
              <h2 className={Styles.text}>
                Tax21%: {cartList[0].prices[index].currency.symbol}
                {this.getTax(cartList)}
              </h2>
              <h2 className={Styles.text}>
                Quantity: {this.getQuantitySum(cartList)}
              </h2>
              <h2 className={Styles.text}>
                Total: {cartList[0].prices[index].currency.symbol}
                {this.getPriceSum(cartList)}
              </h2>
            </div>
            <Link to='/'>
              <button className={Styles.btn} onClick={orderItem}>
                order
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

Cart.contextType = Context

export default Cart
