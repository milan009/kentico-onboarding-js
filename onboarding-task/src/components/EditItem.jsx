import React, { Component, PropTypes } from 'react';

class EditItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    isStorable: PropTypes.bool,
    description: PropTypes.string.isRequired,
    onDescriptionChange: PropTypes.func.isRequired,
    onUpdateButtonClick: PropTypes.func.isRequired,
    onCancelButtonClick: PropTypes.func.isRequired,
    onDeleteButtonClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._onDescriptionChange = this._onDescriptionChange.bind(this);
  }

  _onUpdateButtonClick = () => this.props.onUpdateButtonClick(this.props.description);

  _onDescriptionChange(event) {
    const newDescription = event.target.value;
    this.props.onDescriptionChange(newDescription);
  }

  render() {
    return (
      <div className="input-group">
        <span className="input-group-addon">
          {this.props.index}.
        </span>
        <input
          className="form-control"
          type="text"
          placeholder={`Description of item #${this.props.index} in the list…`}
          value={this.props.description}
          onChange={this._onDescriptionChange}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this._onUpdateButtonClick}
            disabled={!this.props.isStorable}
          >
            Update
          </button>
          <button
            className="btn btn-default"
            type="button"
            onClick={this.props.onCancelButtonClick}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={this.props.onDeleteButtonClick}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}

export default EditItem;
