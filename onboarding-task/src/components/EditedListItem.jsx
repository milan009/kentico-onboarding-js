import React, { PureComponent, PropTypes } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';

class EditedListItem extends PureComponent {
  static displayName = 'EditedListItem';

  static propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  _onInputChange = (event) => {
    this.props.onUpdate(this.props.id, event.target.value);
  };

  _onSaveButtonClick = () => {
    this.props.onSave(this.props.id, this.props.text);
  };

  _onCancelButtonClick = () => {
    this.props.onCancel(this.props.id);
  };

  _onDeleteButtonClick = () => {
    this.props.onDelete(this.props.id);
  };

  render() {
    return (
      <div>
        <Form inline>
          <span>{this.props.index + 1}. </span>
          <FormControl value={this.props.text} onChange={this._onInputChange} />
          <Button onClick={this._onSaveButtonClick} bsStyle="primary">Save</Button>
          <Button onClick={this._onCancelButtonClick}>Cancel</Button>
          <Button onClick={this._onDeleteButtonClick} bsStyle="danger">Delete</Button>
        </Form>
      </div>
    );
  }
}

export { EditedListItem };
