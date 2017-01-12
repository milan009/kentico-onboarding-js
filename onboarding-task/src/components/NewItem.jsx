import React, { Component, PropTypes } from 'react';

class NewItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: '',
      addButtonEnabled: false
    }
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.onAddClicked = this.onAddClicked.bind(this);
  }

  canClickAdd = (description = '') => description.length > 0;

  onDescriptionChanged(event){
    let newDescription = event.target.value;
    this.setState({
      description: newDescription,
      addButtonEnabled: this.canClickAdd(newDescription)
    })
  }

  onAddClicked(){
    this.props.onSubmit(this.state.description);
    this.setState({
      description: '',
      addButtonEnabled: this.canClickAdd()
    });
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="input-group">
          <input type="text" placeholder="New item..." value={this.state.description} onChange={this.onDescriptionChanged} className="form-control"/>
          <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.onAddClicked} disabled={!this.state.addButtonEnabled}>Add</button>
        </span>
        </div>
      </li>
    );
  }
}

NewItem.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewItem;
