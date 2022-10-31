import React from 'react'
import Styles from './nav.module.css'
import Logo from './img/a-logo.svg'
import DownArrow from './img/DownArrow.svg'
import UpArrow from './img/UpArrow.svg'
import CartIcon from './img/Empty Cart.svg'
import { Link } from 'react-router-dom'
import Context from '../Context'
import CartDropDownElements from './cartDropDown/cartDropDownElements'

class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      dropDown: 'none',
    }
    this.containerRef = React.createRef()
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  handleCart = () => {
    const { setDropDownColor } = this.context
    const dropDown = this.state.dropDown === 'none' ? 'block' : 'none'
    setDropDownColor(1)
    this.setState({ dropDown: dropDown })
  }

  handleOutsideClick = (e) => {
    const { setDropDownColor, dropDownColorIndex } = this.context
    if (
      this.containerRef.current &&
      !this.containerRef.current.contains(e.target) &&
      dropDownColorIndex !== 0
    ) {
      setDropDownColor(1)
      this.setState({ dropDown: 'none' })
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
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

  render() {
    const { cartList, index } = this.context
    return (
      <div className={Styles['main-container']}>
        <div className={Styles['text-container']}>
          <Link to='/' onClick={() => this.setState({ index: 0 })}>
            <NavText
              name='all'
              color={this.state.index === 0 ? '#5ECE7B' : '#1d1f22'}
              border={this.state.index === 0 ? '2px solid #5ECE7B' : 'none'}
              weight={this.state.index === 0 ? '600' : '400'}
              paddingLeft={this.state.index === 0 ? '1em' : '0'}
              paddingRight={this.state.index === 0 ? '1em' : '0'}
            />
          </Link>
          <Link to='/tech' onClick={() => this.setState({ index: 1 })}>
            <NavText
              name='tech'
              color={this.state.index === 1 ? '#5ECE7B' : '#1d1f22'}
              border={this.state.index === 1 ? '2px solid #5ECE7B' : 'none'}
              weight={this.state.index === 1 ? '600' : '400'}
              paddingLeft={this.state.index === 1 ? '1em' : '0'}
              paddingRight={this.state.index === 1 ? '1em' : '0'}
            />
          </Link>
          <Link to='/clothes' onClick={() => this.setState({ index: 2 })}>
            <NavText
              name='clothes'
              color={this.state.index === 2 ? '#5ECE7B' : '#1d1f22'}
              border={this.state.index === 2 ? '2px solid #5ECE7B' : 'none'}
              weight={this.state.index === 2 ? '600' : '400'}
              paddingLeft={this.state.index === 2 ? '1em' : '0'}
              paddingRight={this.state.index === 2 ? '1em' : '0'}
            />
          </Link>
        </div>
        <div className={Styles['logo-container']}>
          <Link to={'/'}>
            <img src={Logo} className={Styles.logo} />
          </Link>
        </div>
        <div className={Styles['icon-container']}>
          <Child />
          <div>
            {cartList.length === 0 ? (
              <div>
                <img
                  src={CartIcon}
                  className={Styles['cart-icon']}
                  onClick={() => alert('Cart is empty')}
                />
              </div>
            ) : (
              <div
                className={Styles['cart-is-not-empty']}
                ref={this.containerRef}
              >
                <img
                  src={CartIcon}
                  className={Styles['cart-icon']}
                  onClick={this.handleCart}
                />
                <div className={Styles['cart-quantity']}>
                  {this.getQuantitySum(cartList)}
                </div>
                <div
                  className={Styles['cart-drop-down']}
                  style={{ display: this.state.dropDown }}
                >
                  <div className={Styles['text-container']}>
                    <h2 className={Styles['bag-text']}>My Bag,</h2>
                    <h2 className={Styles['item-quantity-text']}>
                      {this.getQuantitySum(cartList)} items
                    </h2>
                  </div>
                  <ul>
                    {cartList.map((item) => {
                      return (
                        <CartDropDownElements
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
                  <div className={Styles['total-price-container']}>
                    <h2 className={Styles.total}>Total</h2>
                    <h2 className={Styles.total}>
                      {cartList[0].prices[index].currency.symbol}
                      {this.getPriceSum(cartList)}
                    </h2>
                  </div>
                  <div>
                    <Link
                      to={'/cart'}
                      className={Styles['drop-down-btn-container']}
                    >
                      <button
                        className={Styles['bag-btn']}
                        onClick={this.handleCart}
                      >
                        view bag
                      </button>
                      <button
                        className={Styles['check-btn']}
                        onClick={this.handleCart}
                      >
                        Check Out
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

class Child extends React.Component {
  constructor() {
    super()
    this.state = {
      arrow: DownArrow,
      dropDown: 'none',
      currencyIcon: '$',
    }
    this.containerRef = React.createRef()
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }
  //This function handles drop down menu
  handleCurrency = () => {
    const arrow = this.state.arrow === DownArrow ? UpArrow : DownArrow
    const dropDown = this.state.arrow === UpArrow ? 'none' : 'block'
    this.setState({ arrow: arrow, dropDown: dropDown })
  }
  //

  //this function handles outside click, when user will click outside the drop down menu it will close drop down
  handleOutsideClick = (e) => {
    if (
      this.containerRef.current &&
      !this.containerRef.current.contains(e.target)
    ) {
      this.setState({ arrow: DownArrow, dropDown: 'none' })
    }
  }

  //

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick)
  }

  render() {
    const { setIndex } = this.context
    return (
      <div className={Styles['currency-div']} ref={this.containerRef}>
        <h2 className={Styles['dollar-icon']} onClick={this.handleCurrency}>
          {this.state.currencyIcon}
        </h2>
        <img
          src={this.state.arrow}
          className={Styles.arrow}
          onClick={this.handleCurrency}
        />
        <div
          className={Styles['drop-down']}
          style={{ display: this.state.dropDown }}
        >
          <DropDownText
            name='$ usd'
            click={() => {
              const newIndex = 0
              setIndex(newIndex)
              this.setState({
                currencyIcon: '$',
                dropDown: 'none',
                arrow: DownArrow,
              })
            }}
          />
          <DropDownText
            name='£ gbp'
            click={() => {
              const newIndex = 1
              setIndex(newIndex)
              this.setState({
                currencyIcon: '£',
                dropDown: 'none',
                arrow: DownArrow,
              })
            }}
          />
          <DropDownText
            name='A$ aud'
            click={() => {
              const newIndex = 2
              setIndex(newIndex)
              this.setState({
                currencyIcon: 'A$',
                dropDown: 'none',
                arrow: DownArrow,
              })
            }}
          />
          <DropDownText
            name='¥ jpy'
            click={() => {
              const newIndex = 3
              setIndex(newIndex)
              this.setState({
                currencyIcon: '¥',
                dropDown: 'none',
                arrow: DownArrow,
              })
            }}
          />
          <DropDownText
            name='₽ rub'
            click={() => {
              const newIndex = 4
              setIndex(newIndex)
              this.setState({
                currencyIcon: '₽',
                dropDown: 'none',
                arrow: DownArrow,
              })
            }}
          />
        </div>
      </div>
    )
  }
}
Nav.contextType = Context
Child.contextType = Context

class NavText extends React.Component {
  render() {
    return (
      <h2
        className={Styles['nav-text']}
        style={{
          color: this.props.color,
          borderBottom: this.props.border,
          fontWeight: this.props.weight,
          paddingLeft: this.props.paddingLeft,
          paddingRight: this.props.paddingRight,
        }}
      >
        {this.props.name}
      </h2>
    )
  }
}

class DropDownText extends React.Component {
  render() {
    return (
      <h2 className={Styles['currency']} onClick={this.props.click}>
        {this.props.name}
      </h2>
    )
  }
}

export default Nav
