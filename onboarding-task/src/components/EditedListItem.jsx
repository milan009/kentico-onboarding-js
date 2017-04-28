import React, { PureComponent, PropTypes } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';

class EditedListItem extends PureComponent {
  static displayName = 'EditedListItem';

  static propTypes = { // TODO define proptypes consistently
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Form inline>
          <span>{this.props.index + 1}. </span>
          <FormControl value={this.props.text} onChange={(event) => this.props.onUpdate(event.target.value)} />
          <Button onClick={() => this.props.onSave(this.props.text)} bsStyle="primary">Save</Button>
          <Button onClick={() => this.props.onCancel()}>Cancel</Button>
          <Button onClick={() => this.props.onDelete()} bsStyle="danger">Delete</Button>
        </Form>
      </div>
    );
  }
}

export { EditedListItem };
