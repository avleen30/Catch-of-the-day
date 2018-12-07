import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {

  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.number,
      availability: PropTypes.string,
      status: PropTypes.string
    }),
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    index: PropTypes.string 
  }

  handleChange = event => {
    //update that fish
    // 1. take a copy of the current fish
    const updatedFish = {...this.props.fish,
    [event.currentTarget.name]: event.currentTarget.value};
    // add fish to state upstream -> in inventory then App
    this.props.updateFish(this.props.index, updatedFish);
  }

  deletedFish = event => {
    this.props.deleteFish(this.props.index);
  }


  render() {

    return(
      <div className="fish-edit">
        <input name="name" type="text" onChange={this.handleChange} value={this.props.fish.name}/>
        <input name="price" type="text" onChange={this.handleChange} value={this.props.fish.price}/>
        <select name="status" type="text" onChange={this.handleChange} value={this.props.fish.status}>
          <option onChange={this.handleChange} value="available">Fresh</option>
          <option onChange={this.handleChange} value="unavailable">Sold-out</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc}/>
        <input name="image" type="text" onChange={this.handleChange} value={this.props.fish.image}/>
        <button onClick={this.deletedFish}>Delete Fish</button>
      </div>
    )
  }
}

export default EditFishForm;
