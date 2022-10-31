import React from 'react'
import Nav from '../nav/nav'
import Styles from './main.module.css'
import AllContent from './AllContent/AllContent'
import TechContent from './TechContent/TechContent'
import ClothContent from './ClothContent/ClothContent'
import Details from './DetailsPage/Details'
import Cart from '../cart/Cart'
import Context from '../Context'

class Main extends React.Component {
  render() {
    const { dropDownColorIndex, dropDownColorDisplay } = this.context
    return (
      <div>
        <Nav />
        <div
          style={{ zIndex: dropDownColorIndex, display: dropDownColorDisplay }}
          className={Styles['drop-down-color']}
        />
        <div className={Styles['content-container']}>
          <div>
            {this.props.filter === '/' ? (
              <AllContent />
            ) : this.props.filter === ':id' ? (
              <Details />
            ) : this.props.filter === 'cart' ? (
              <Cart />
            ) : this.props.filter === 'tech' ? (
              <TechContent />
            ) : (
              <ClothContent />
            )}
          </div>
        </div>
      </div>
    )
  }
}

Main.contextType = Context

export default Main
