import React, { PropTypes } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';

export const EditedListItem = (props) => {
  return (
    <div>
      <Form inline>
        <span>{props.item.index + 1}. </span>
        <FormControl value={props.item.text} onChange={(event) => props.onUpdate(event.target.value)} />
        <Button onClick={() => props.onSave(props.item.text)} bsStyle="primary">Save</Button>
        <Button onClick={() => props.onCancel()}>Cancel</Button>
        <Button onClick={() => props.onDelete()} bsStyle="danger">Delete</Button>
      </Form>
    </div>
  );
};

EditedListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

EditedListItem.displayName = 'EditedListItem';
