import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ViewItem } from './ViewItem';
import { EditItem } from './EditItem';

class ListItem extends Component {

  static displayName = 'ListItem';

  static propTypes = {
    index: PropTypes.number,
    element: PropTypes.shape({
      id: PropTypes.string,
      isEdited: PropTypes.bool,
    }),
    saveChange: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired,
  };

  _removeElement = () =>
    this.props.removeElement(this.props.element.id);

  _saveChange = (newText) =>
    this.props.saveChange(this.props.element.id, { text: newText, isEdited: false });

  _toggleEditing = () =>
    this.props.saveChange(this.props.element.id, { isEdited: !this.props.element.isEdited });

  render() {
    let item;
    if (this.props.element.isEdited) {
      item = (<EditItem
        index={this.props.index}
        element={this.props.element}
        removeElement={this._removeElement}
        cancelChange={this._toggleEditing}
        saveChange={this._saveChange}
      />);
    }
    else {
      item = (<ViewItem
        index={this.props.index}
        element={this.props.element}
        onClick={this._toggleEditing}
      />);
    }

    return (
      <li className="list-group-item">
        {item}
      </li>);
  }
}

export { ListItem };
