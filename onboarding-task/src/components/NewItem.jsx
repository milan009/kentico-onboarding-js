import React, { Component, PropTypes } from 'react';

class NewItem extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      description: '',
      addButtonEnabled: false,
    };

    this._onDescriptionChanged = this._onDescriptionChanged.bind(this);
    this._onAddClicked = this._onAddClicked.bind(this);
  }

  _canClickOnAddButton = (description = '') => description.length > 0;

  _onDescriptionChanged(event) {
    const newDescription = event.target.value;
    this.setState({
      description: newDescription,
      addButtonEnabled: this._canClickOnAddButton(newDescription),
    });
  }

  _onAddClicked() {
    this.props.onSubmit(this.state.description);
    this.setState({
      description: '',
      addButtonEnabled: this._canClickOnAddButton(),
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
            onChange={this._onDescriptionChanged}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-success"
              type="button"
              onClick={this._onAddClicked}
              disabled={!this.state.addButtonEnabled}
            >
              Add
            </button>
          </span>
        </div>
      </li>
    );
  }
}

export default NewItem;
