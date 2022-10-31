import React from 'react'
import Styles from './cartComponent.module.css'
import Context from '../../Context'
import { client } from '../../index'
import { gql } from '@apollo/client'

class CartComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      data: undefined,
      selectedAttributes: {},
    }
  }
  componentDidMount() {
    this.setState({ selectedAttributes: this.props.attributes })
    client
      .query({
        query: gql`
          query {
            product(id: "${this.props.item}") {
              id
                name
              brand
              inStock
              gallery
               __typename
              attributes{
                id
                items {
                  value
                }
              }
              prices {
                amount
                  currency{
                    symbol
                    label
                  }
                }
              description
            }
          }
        `,
      })
      .then((result) =>
        this.setState({
          data: result.data,
        })
      )
  }

  render() {
    const { removeFromCart } = this.context
    const { addToCart } = this.context
    const { index } = this.context
    return (
      <li className={Styles['description-container']}>
        {this.state.data && (
          <>
            <div>
              <h2 className={Styles.brand}>{this.state.data.product.brand}</h2>
              <h2 className={Styles.name}>{this.state.data.product.name}</h2>
              <h2 className={Styles.price}>
                {this.state.data.product.prices[index].currency.symbol}
                {this.state.data.product.prices[index].amount}
              </h2>
              <div className={Styles['value-container']}>
                <ul>
                  {this.state.data &&
                    this.state.data.product.attributes.map((item) => (
                      <li key={item.id}>
                        <h2 className={Styles.text}>{item.id}:</h2>
                        <div className={Styles['color-container']}>
                          <ul className={Styles['item-list']}>
                            {item.id === 'Color'
                              ? item.items.map((value) => (
                                  <li key={value.value}>
                                    <div
                                      className={`${Styles.color} ${
                                        value.value ===
                                        this.state.selectedAttributes['color']
                                          ? Styles['current-color']
                                          : ''
                                      }`}
                                      style={{
                                        backgroundColor: `${value.value}`,
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          selectedAttributes: {
                                            ...this.state.selectedAttributes,
                                            color: value.value,
                                          },
                                        })
                                      }
                                    ></div>
                                  </li>
                                ))
                              : item.items.map((value) => (
                                  <li key={value.value}>
                                    <span
                                      className={`${Styles.value} ${
                                        value.value ===
                                        this.state.selectedAttributes[item.id]
                                          ? Styles['current-value']
                                          : ' '
                                      }`}
                                      onClick={() => {
                                        this.setState({
                                          selectedAttributes: {
                                            ...this.state.selectedAttributes,
                                            [item.id]: value.value,
                                          },
                                        })
                                      }}
                                    >
                                      {value.value}
                                    </span>
                                  </li>
                                ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className={Styles['right-side']}>
              <div className={Styles['quantity-container']}>
                <button
                  className={Styles.btn}
                  onClick={() => addToCart(this.props.addToCartItem)}
                >
                  +
                </button>
                <h2 className={Styles.quantity}>{this.props.itemQuantity}</h2>
                <button
                  onClick={() => removeFromCart(this.props.removeFromCartItem)}
                  className={Styles.btn}
                >
                  -
                </button>
              </div>
              <img
                src={this.state.data.product.gallery[0]}
                className={Styles.img}
              />
            </div>
          </>
        )}
      </li>
    )
  }
}

CartComponent.contextType = Context

export default CartComponent
