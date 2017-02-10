import React, { Component, PropTypes } from 'react';

class ListItem extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <li className="list-group-item">
        {this.props.text}
        <button type="button" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-default">Cancel</button>
        <button type="button" className="btn btn-danger">Delete</button>
      </li>
    );
  }
}

export default ListItem;
