import React from 'react';
import base, { firebaseApp } from '../base';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm';
import Login from './Login';


class Inventory extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({user});
      }
    })
  }

  authHandler = async authData => {
    // look up current store in firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    //claim it if there is no owner
    if (!store.owner) {
      //save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // set the state of the inventory component to reflect the current user
    this.setState({
      uid:  authData.user.uid,
      owner: store.owner || authData.user.uid
    })

  };

//Login authentication
  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  }

  render() {
    const logout = <button onClick={this.logout}>Log out</button>
    //check if they are logged in
    if(!this.state.uid) {
          return <Login authenticate={this.authenticate}/>
    };

    //check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      <div>
        <p>Sorry! You are not the owner</p>
        {logout}
      </div>
    }

    // 3. they must be the owner, render the inventory
    return (
      <div className="inventory">
        <h1>Edit Fish</h1>
        {logout}
        {Object.keys(this.props.fishes).map(key =>
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish= {this.props.updateFish}
            deleteFish = {this.props.deleteFish}/>)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
