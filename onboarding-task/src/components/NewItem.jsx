import React, { Component, PropTypes } from 'react';

class NewItem extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { description: '' };

    this._onDescriptionChanged = this._onDescriptionChanged.bind(this);
    this._onAddClicked = this._onAddClicked.bind(this);
  }

  _canClickOnAddButton = () => (this.state.description || '').length > 0;

  _onDescriptionChanged(event) {
    const newDescription = event.target.value;
    this.setState({ description: newDescription });
  }

  _onAddClicked() {
    this.props.onSubmit(this.state.description);
    this.setState({ description: '' });
  }

  render() {
    return (
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
            disabled={!this._canClickOnAddButton}
          >
            Add
          </button>
        </span>
      </div>
    );
  }
}

export default NewItem;
