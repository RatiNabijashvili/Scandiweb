import React from 'react'
import { client } from '../../index'
import { gql } from '@apollo/client'
import Styles from './details.module.css'
import Context from '../../Context'

class Details extends React.Component {
  constructor() {
    super()
    this.state = {
      data: undefined,
      index: 0,
      currentValue: '',
      currentColor: '',
      selectedAttributes: {},
    }
  }
  componentDidMount() {
    const pathname = window.location.href.split('/')
    client
      .query({
        query: gql`
          query {
            product(id: "${pathname[3]}") {
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
    const { index } = this.context
    const { addToCart } = this.context
    const { cartList } = this.context
    return (
      <div>
        <div className={Styles['details-container']}>
          {this.state.data && (
            <div className={Styles['main-container']}>
              <div className={Styles['img-container']}>
                <img
                  src={this.state.data.product.gallery[0]}
                  className={Styles.img}
                  onClick={() =>
                    this.setState({
                      index: 0,
                    })
                  }
                />
                <img
                  src={this.state.data.product.gallery[1]}
                  className={Styles.img}
                  onClick={() =>
                    this.setState({
                      index: 1,
                    })
                  }
                />
                <img
                  src={this.state.data.product.gallery[2]}
                  className={Styles.img}
                  onClick={() =>
                    this.setState({
                      index: 2,
                    })
                  }
                />
                <img
                  src={this.state.data.product.gallery[3]}
                  className={Styles.img}
                  onClick={() =>
                    this.setState({
                      index: 3,
                    })
                  }
                />
                <img
                  src={this.state.data.product.gallery[4]}
                  className={Styles.img}
                  onClick={() =>
                    this.setState({
                      index: 4,
                    })
                  }
                />
                <img
                  src={this.state.data.product.gallery[5]}
                  className={Styles.img}
                  onClick={() =>
                    this.setState({
                      index: 5,
                    })
                  }
                />
                <img
                  src={this.state.data.product.gallery[6]}
                  className={Styles.img}
                  onClick={() =>
                    this.setState({
                      index: 6,
                    })
                  }
                />
              </div>
              <div className={Styles['content-container']}>
                <div>
                  <img
                    src={this.state.data.product.gallery[this.state.index]}
                    alt={'img'}
                    className={Styles['content-img']}
                  />
                </div>
                <div className={Styles['about-container']}>
                  <div>
                    <h2 className={Styles.brand}>
                      {this.state.data.product.brand}
                    </h2>
                    <h2 className={Styles.name}>
                      {this.state.data.product.name}
                    </h2>
                  </div>
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
                                            this.state.selectedAttributes[
                                              'color'
                                            ]
                                              ? Styles['current-color']
                                              : ''
                                          }`}
                                          style={{
                                            backgroundColor: `${value.value}`,
                                          }}
                                          onClick={() =>
                                            this.setState({
                                              selectedAttributes: {
                                                ...this.state
                                                  .selectedAttributes,
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
                                            this.state.selectedAttributes[
                                              item.id
                                            ]
                                              ? Styles['current-value']
                                              : ' '
                                          }`}
                                          onClick={() => {
                                            this.setState({
                                              selectedAttributes: {
                                                ...this.state
                                                  .selectedAttributes,
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
                  <div className={Styles['price-container']}>
                    <h2 className={Styles.text}>
                      {this.state.data.product.prices[index].__typename}:
                    </h2>
                    <h2 className={Styles.price}>
                      {this.state.data.product.prices[index].currency.symbol}
                      {this.state.data.product.prices[index].amount}
                    </h2>
                  </div>
                  <div className={Styles['description-container']}>
                    <button
                      className={Styles['cart-button']}
                      onClick={() => {
                        const item = {
                          id: this.state.data.product.id,
                          brand: this.state.data.product.brand,
                          name: this.state.data.product.name,
                          prices: this.state.data.product.prices,
                          attributes: this.state.selectedAttributes,
                          gallery: this.state.data.product.gallery,
                          quantity: 1,
                        }
                        if (
                          Object.keys(this.state.data.product.attributes)
                            .length !==
                          Object.keys(this.state.selectedAttributes).length
                        ) {
                          return alert('please select every attribute')
                        }
                        if (!this.state.data.product.inStock) {
                          return alert('item not in stock')
                        }
                        addToCart(item)
                        console.log(cartList)
                      }}
                    >
                      add to cart
                    </button>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.data.product.description,
                      }}
                      className={Styles.description}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

Details.contextType = Context

export default Details
