import React, { PureComponent, PropTypes } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';

class EditedListItem extends PureComponent {
  static displayName = 'EditedListItem';

  static propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    saveFunction: PropTypes.func.isRequired,
    deleteFunction: PropTypes.func.isRequired,
    updateFunction: PropTypes.func.isRequired,
    cancelFunction: PropTypes.func.isRequired,
  };

  _onInputChange = (event) => {
    this.props.updateFunction(this.props.index, event);
  };

  _onSaveButtonClick = () => {
    this.props.saveFunction(this.props.index, this.props.text);
  };

  _onCancelButtonClick = () => {
    this.props.cancelFunction(this.props.index);
  };

  _onDeleteButtonClick = () => {
    this.props.deleteFunction(this.props.index);
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
