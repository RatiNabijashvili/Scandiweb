import React from 'react'
import { client } from '../../index'
import { gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import Styles from './ContentComponent.module.css'
import CartIcon from '../img/Circle Icon.png'
import Context from '../../Context'

class ContentComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      data: undefined,
    }
  }
  componentDidMount() {
    client
      .query({
        query: gql`
          query {
            categories {
              products {
                category
                name
                inStock
                gallery
                id
                prices {
                  amount
                  currency {
                    symbol
                    label
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => this.setState({ data: result.data }))
  }

  render() {
    const { index } = this.context
    return (
      <div>
        <div className={Styles['main-text']}>Category name</div>
        <ul className={Styles['content-ul']}>
          {this.state.data &&
            this.state.data.categories[this.props.index].products.map(
              (product) => (
                <Link
                  to={{
                    pathname: `/${product.id}`,
                    state: { stateParam: true },
                  }}
                  key={product.id}
                >
                  <li key={product.id} className={Styles['content-li']}>
                    <div className={Styles['content-img-container']}>
                      <img
                        src={product.gallery[0]}
                        className={Styles['content-img']}
                        style={{
                          opacity: product.inStock === true ? '1' : '0.5',
                        }}
                      />
                      <div
                        className={Styles['stock-text-container']}
                        style={{
                          display: product.inStock === true ? 'none' : 'block',
                        }}
                      >
                        <h2 className={Styles['stock-text']}>Out of Stock</h2>
                      </div>
                    </div>
                    <div className={Styles['content-text-container']}>
                      <h2
                        className={Styles['content-text']}
                        style={{
                          color:
                            product.inStock === true ? '#1D1F22' : '#8d8f9a',
                        }}
                      >
                        {product.name}
                      </h2>
                      <h2
                        className={Styles['price']}
                        style={{
                          color:
                            product.inStock === true ? '#1D1F22' : '#8d8f9a',
                        }}
                      >
                        {product.prices[index].currency.symbol}
                        {product.prices[index].amount}
                      </h2>
                    </div>
                    <img src={CartIcon} className={Styles['cart-icon']} />
                  </li>
                </Link>
              )
            )}
        </ul>
      </div>
    )
  }
}

ContentComponent.contextType = Context

export default ContentComponent
