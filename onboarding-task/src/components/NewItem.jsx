import React, { Component, PropTypes } from 'react';

class NewItem extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    description: '',
    addButtonEnabled: false,
  };

  constructor(props) {
    super(props);
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.onAddClicked = this.onAddClicked.bind(this);
  }

  canClickOnAddButton = (description = '') => description.length > 0;

  onDescriptionChanged(event) {
    let newDescription = event.target.value;
    this.setState({
      description: newDescription,
      addButtonEnabled: this.canClickOnAddButton(newDescription),
    })
  }

  onAddClicked() {
    this.props.onSubmit(this.state.description);
    this.setState({
      description: '',
      addButtonEnabled: this.canClickOnAddButton(),
    });
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="New item…"
            value={this.state.description}
            onChange={this.onDescriptionChanged}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-success"
              type="button"
              onClick={this.onAddClicked}
              disabled={!this.state.addButtonEnabled}>
                Add
            </button>
          </span>
        </div>
      </li>
    );
  }
}

export default NewItem;
