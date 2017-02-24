import React, { Component, PropTypes } from 'react';

class EditItem extends Component {
  static displayName = 'EditItem';

  static propTypes = {
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired };

  constructor(props) {
    super(props);
    this.state = { inputValue: this.props.value };
  }

  _inputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  _saveValue = () => {
    this.props.onEdit(this.state.inputValue);
  };

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          {this.props.index}.
          <input className="form-control" type="text" value={this.state.inputValue} onChange={this._inputChange} />
          <button type="submit" className="btn btn-primary" onClick={this._saveValue}>Save</button>
          <button className="btn btn-default" onClick={this.props.onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

export default EditItem;
