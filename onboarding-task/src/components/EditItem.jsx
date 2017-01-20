import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class EditItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.recordOf({
      description: PropTypes.string.isRequired,
    }),
    onUpdateButtonClick: PropTypes.func.isRequired,
    onCancelButtonClick: PropTypes.func.isRequired,
    onDeleteButtonClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { description: props.item.description };

    this._onDescriptionChange = this._onDescriptionChange.bind(this);
  }

  _canClickOnUpdateButton = () => (this.state.description || '').length > 0;

  _onUpdateButtonClick = () => this.props.onUpdateButtonClick(this.state.description);

  _onDescriptionChange(event) {
    const newDescription = event.target.value;
    this.setState({ description: newDescription });
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
          value={this.state.description}
          onChange={this._onDescriptionChange}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this._onUpdateButtonClick}
            disabled={!this._canClickOnUpdateButton()}
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
