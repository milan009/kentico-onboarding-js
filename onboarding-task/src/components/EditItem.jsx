import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class EditItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.recordOf({
      description: PropTypes.string.isRequired,
    }),
    onButtonClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { item: { description } } = props;
    this.state = {
      description,
      updateButtonEnabled: this._canClickOnUpdateButton(description),
    };

    this._onDescriptionChanged = this._onDescriptionChanged.bind(this);
    this._onUpdateClicked = this._onButtonClicked.bind(this, 'update');
    this._onCancelClicked = this._onButtonClicked.bind(this, 'cancel');
    this._onDeleteClicked = this._onButtonClicked.bind(this, 'delete');
  }

  _canClickOnUpdateButton = description => description.length > 0;

  _onButtonClicked = (eventType) =>
    this.props.onButtonClick(
      eventType,
      this.state.description || this.props.item.description);

  _onDescriptionChanged(event) {
    const newDescription = event.target.value;
    this.setState({
      description: newDescription,
      updateButtonEnabled: this._canClickOnUpdateButton(newDescription),
    });
  }

  render() {
    return (
      <li className="list-group-item">
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
              onClick={this._onUpdateClicked}
              disabled={!this.state.updateButtonEnabled}
            >
              Update
            </button>
            <button
              className="btn btn-default"
              type="button"
              onClick={this._onCancelClicked}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this._onDeleteClicked}
            >
              Delete
            </button>
          </span>
        </div>
      </li>
    );
  }
}

export default EditItem;
