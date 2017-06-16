import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ViewItem } from './ViewItem';
import { EditItem } from './EditItem';

class ListItem extends Component {

  static propTypes = {
    element: PropTypes.object,
    toggleEdit: PropTypes.func.isRequired,
    saveChange: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired,
  };

  _handleClick = () => {
    if (!this.props.element.isEdited) {
      this.props.toggleEdit(this.props.element.id);
    }
  };

  _cancelClick = () => {
    this.props.toggleEdit(this.props.element.id);
  };

  render() {
    const getCorrectComponent = () => {
      if (this.props.element.isEdited) {
        return (<EditItem
          element={this.props.element}
          removeElement={this.props.removeElement}
          saveChange={this.props.saveChange}
          cancelChange={this._cancelClick}
        />);
      }
      return (<ViewItem
        element={this.props.element}
      />);
    };
    return (
      <li onClick={this._handleClick}>
        {getCorrectComponent()}
      </li>);
  }
}

export { ListItem };
