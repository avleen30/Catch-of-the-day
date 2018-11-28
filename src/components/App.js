import React from 'react';
import Header from './Header';
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
    this.setState({
      fishes: fishes
    });
  };

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
    this.setState({
      order: order
    })
  };

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
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
            order={this.state.order}/>
          <Inventory
            addFish={this.addFish}
            loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;
