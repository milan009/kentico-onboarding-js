import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class EditItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.recordOf({
      description: PropTypes.string.isRequired,
    }),
    onUpdateButtonClicked: PropTypes.func.isRequired,
    onCancelButtonClicked: PropTypes.func.isRequired,
    onDeleteButtonClicked: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { description: props.item.description };

    this._onDescriptionChanged = this._onDescriptionChanged.bind(this);
  }

  _canClickOnUpdateButton = () => (this.state.description || '').length > 0;

  _onUpdateButtonClicked = () => this.props.onUpdateButtonClicked(this.state.description);

  _onDescriptionChanged(event) {
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
          onChange={this._onDescriptionChanged}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this._onUpdateButtonClicked}
            disabled={!this._canClickOnUpdateButton()}
          >
            Update
          </button>
          <button
            className="btn btn-default"
            type="button"
            onClick={this.props.onCancelButtonClicked}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={this.props.onDeleteButtonClicked}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}

export default EditItem;
