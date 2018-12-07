import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Order extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';

    //make sure fish is loaded before we continue
    if (!fish) return null;

    if(!isAvailable){
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter : 250, exit : 250 }}>
        <li key = {key}>
          Sorry {fish? fish.name : 'fish'} is no longer available
        </li>
        </CSSTransition>
    )};
    return (
        <li key = {key}>
            <span>{ count } </span>lbs { fish.name }
            <span>{ formatPrice(count * fish.price) }</span>
            <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
          </li>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
          <TransitionGroup component="ul" className='order'>
            {orderIds.map(this.renderOrder)}
          </TransitionGroup>
          <div className="total">
            <span>Total:
            <strong> { formatPrice(total) } </strong> </span>
          </div>
      </div>
    );
  }
}

export default Order;
