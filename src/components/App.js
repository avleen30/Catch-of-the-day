import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';


class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount(){
    const { params } = this.props.match;
    //first reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
      this.setState({order : JSON.parse(localStorageRef)});
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  };

  componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  };

  componentWillUnmount(){
    base.removeBinding(this.ref);
  };

  //updating state
  addFish = (fish) => {
    //1. take a copy of the existing state to avoid mutation
    const fishes = {...this.state.fishes};
    //2. Add our new fish to Fishes
    fishes[`fish${Date.now()}`] = fish;
    //3. set the new fishes object to state
    this.setState({fishes});
  };

  updateFish = (key, updatedFish) => {
    //make a copy of fishes from statusRef
    const fishes = {...this.state.fishes, [key]: updatedFish};
    // set to state
    this.setState({fishes});
  }

  deleteFish = key => {
    //take a copy of state
    const fishes = {...this.state.fishes};
    // update the state
    fishes[key] = null;
    //update state
    this.setState({fishes});
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = (key) => {
    // 1. Take a copy of the setState
    const order = {...this.state.order};
    // 2. Either add to order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. call setState toupdate our state object
    this.setState({order})
  };

  removeFromOrder = key => {
    const order = {...this.state.order};
    delete order[key];
    this.setState({order});
  }

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="catch of the day" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}/>
            ))}
          </ul>
        </div>
          <Order
            fishes= {this.state.fishes}
            order={this.state.order}
            removeFromOrder={this.removeFromOrder}/>
          <Inventory
            fishes= {this.state.fishes}
            addFish={this.addFish}
            updateFish = {this.updateFish}
            deleteFish = {this.deleteFish}
            loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;
