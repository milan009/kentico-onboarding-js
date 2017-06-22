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
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  _removeElement = () =>
    this.props.onRemove(this.props.element.id);

  _saveChange = (newText) =>
    this.props.onSave(this.props.element.id, { text: newText, isEdited: false });

  _toggleEditing = () =>
    this.props.onSave(this.props.element.id, { isEdited: !this.props.element.isEdited });

  render() {
    let item;
    if (this.props.element.isEdited) {
      item = (<EditItem
        index={this.props.index}
        element={this.props.element}
        onRemove={this._removeElement}
        onCancel={this._toggleEditing}
        onSave={this._saveChange}
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
