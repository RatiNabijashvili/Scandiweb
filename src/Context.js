import React from 'react'

const Context = React.createContext()

export class ContextProvider extends React.Component {
  state = {
    index: 0,
    cartList: [],
    dropDownColorIndex: 0,
    dropDownColorDisplay: 'none',
  }

  setIndex = (index) => {
    this.setState({ index: index })
  }

  setDropDownColor = (index) => {
    if (this.state.dropDownColorIndex === 0) {
      this.setState({
        dropDownColorIndex: index,
        dropDownColorDisplay: 'block',
      })
    } else {
      this.setState({ dropDownColorIndex: 0, dropDownColorDisplay: 'none' })
    }
  }

  isDuplicate = (item) => {
    return this.state.cartList.some((obj) => obj.id === item.id)
  }

  addToCart = (item) => {
    const index = this.state.cartList.findIndex((obj) => obj.id === item.id)

    if (index === -1) {
      return this.setState({ cartList: [...this.state.cartList, item] })
    }

    const newCartList = this.state.cartList
    newCartList[index].quantity++
    this.setState({ cartList: newCartList })
  }

  removeFromCart = (id) => {
    const index = this.state.cartList.findIndex((obj) => obj.id === id)
    if (index === -1) {
      return alert('nothing to remove')
    }

    if (this.state.cartList[index].quantity === 1) {
      const newCartList = this.state.cartList
      newCartList.splice(index, 1)
      this.setState({ cartList: newCartList })
    } else {
      const newCartList = this.state.cartList
      newCartList[index].quantity--
      this.setState({ cartList: newCartList })
    }
  }

  orderItem = () => {
    this.setState({ cartList: [] })
    return alert('you successfully order your item <3')
  }

  render() {
    const { index } = this.state
    const { cartList } = this.state
    const { setIndex } = this
    const { addToCart } = this
    const { removeFromCart } = this
    const { dropDownColorIndex, dropDownColorDisplay } = this.state
    const { setDropDownColor, orderItem } = this

    return (
      <Context.Provider
        value={{
          index,
          cartList,
          setIndex,
          addToCart,
          removeFromCart,
          dropDownColorIndex,
          dropDownColorDisplay,
          setDropDownColor,
          orderItem,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Context
