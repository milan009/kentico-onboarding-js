import React, { Component, PropTypes } from 'react';

import EditForm from './EditForm';

class ListItem extends Component {

  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      canEdit: false,
      editInput: props.item.text,
    };
    this._startEditing = this._startEditing.bind(this);
    this._stopEditing = this._stopEditing.bind(this);
  }

  _startEditing() {
    this.setState({
      canEdit: true,
    });
  }

  _stopEditing() {
    this.setState({
      canEdit: false,
    });
  }

  render() {
    if (this.state.canEdit) {
      return (
        <li className="list-group-item">
          <EditForm {...this.props} onCancel={this._stopEditing} />
        </li>
      );
    }
    return (
      <li className="list-group-item" onClick={this._startEditing} >
        <span>{`${this.props.index + 1}. ${this.props.item.text}`}</span>
      </li>
    );
  }
}

export default ListItem;
