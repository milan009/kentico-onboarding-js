import React, { Component, PropTypes } from 'react';

export default class EditItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    description: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired
  };

  state = {
    description: null,
    updateButtonEnabled: true
  };

  constructor(props) {
    super(props)
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.onUpdateClicked = this.onButtonClicked.bind(this, 'update');
    this.onCancelClicked = this.onButtonClicked.bind(this, 'cancel');
    this.onDeleteClicked = this.onButtonClicked.bind(this, 'delete');
  }

  canClickOnUpdateButton = description => description.length > 0;

  onButtonClicked = (eventType) =>
    this.props.onButtonClick(
      eventType,
      this.props.index,
      this.state.description || this.props.description);

  onDescriptionChanged(event) {
    let newDescription = event.target.value;
    this.setState({
      description: newDescription,
      updateButtonEnabled: this.canClickOnUpdateButton(newDescription)
    })
  }

  render() {
    let visibleIndex = this.props.index + 1;
    return (
      <li className="list-group-item">
        <div className="input-group">
          <span className="input-group-addon">
            {visibleIndex}.
          </span>
          <input
            className="form-control"
            type="text"
            placeholder={`Description of item #${visibleIndex} in the list…`}
            value={this.state.description}
            defaultValue={this.props.description}
            onChange={this.onDescriptionChanged}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.onUpdateClicked}
              disabled={!this.state.updateButtonEnabled}>
                Update
            </button>
            <button
              className="btn btn-default"
              type="button"
              onClick={this.onCancelClicked}>
                Cancel
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.onDeleteClicked}>
                Delete
            </button>
          </span>
        </div>
      </li>
    );
  }
}
