import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ViewItem } from './ViewItem';
import { EditItem } from './EditItem';

class ListItem extends Component {

  static displayName = 'ListItem';

  static propTypes = {
    index: PropTypes.number,
    element: PropTypes.object,
    toggleEdit: PropTypes.func.isRequired,
    saveChange: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired,
  };

  _toggleEdit = () => {
    this.props.toggleEdit(this.props.element.id);
  };

  _getCorrectComponent = () => {
    if (this.props.element.isEdited) {
      return (<EditItem
        index={this.props.index}
        element={this.props.element}
        removeElement={this.props.removeElement}
        saveChange={this.props.saveChange}
        toggleEdit={this._toggleEdit}
      />);
    }
    return (<ViewItem
      index={this.props.index}
      element={this.props.element}
      onClick={this._toggleEdit}
    />);
  };

  render() {
    return (
      <li className="list-group-item">
        {this._getCorrectComponent()}
      </li>);
  }
}

export { ListItem };
