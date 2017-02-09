import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    return (
      <li className="list-group-item">
        <button type="button" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-default">Cancel</button>
        <button type="button" className="btn btn-danger">Delete</button>
      </li>
    );
  }
}

export default ListItem;
