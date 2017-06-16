import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ViewItem } from './ViewItem';
import { EditItem } from './EditItem';

class ListItem extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    saveChange: PropTypes.func.isRequired,
    isEdited: PropTypes.bool.isRequired,
    removeElement: PropTypes.func.isRequired,
  };

  _handleClick = () => {
    if (!this.props.isEdited) {
      this.props.toggleEdit(this.props.uid);
    }
  };

  _cancelClick = () => {
    this.props.toggleEdit(this.props.uid);
  };

  _getCorrectComponent = () => {
    if (this.props.isEdited) {
      return (<EditItem
        text={this.props.text}
        uid={this.props.uid}
        key={this.props.uid}
        removeElement={this.props.removeElement}
        saveChange={this.props.saveChange}
        cancelChange={this._cancelClick}
      />);
    }

    return (<ViewItem
      text={this.props.text}
      uid={this.props.uid}
      key={this.props.uid}
    />);
  };

  render() {
    return (
      <li onClick={this._handleClick}>
        {this._getCorrectComponent()}
      </li>);
  }
}

export { ListItem };
