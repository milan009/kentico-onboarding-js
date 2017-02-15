import React from 'react';

function ListItemForm(props) {
  return (
    <form className="form-inline" onSubmit={props.onFormSubmit} >
      <input
        className="form-control"
        value={props.inputValue}
        onChange={props.onInputChange}
      />
      <button type="submit" className="btn btn-primary" > Change </button>
      <button type="button" className="btn btn-default" onClick={props.onFormCancelClick} > Cancel </button>
      <button type="button" className="btn btn-danger" onClick={props.onFormDeleteClick} > Delete </button>
    </form>
);
}

ListItemForm.propTypes = {
  inputValue: React.PropTypes.string.isRequired,
  onFormSubmit: React.PropTypes.func.isRequired,
  onFormCancelClick: React.PropTypes.func.isRequired,
  onFormDeleteClick: React.PropTypes.func.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
};

export default ListItemForm;
