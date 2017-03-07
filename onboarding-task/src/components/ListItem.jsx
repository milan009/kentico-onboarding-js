import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { ListItemEditable } from './ListItemEditable.jsx';
import { ListItemStatic } from './ListItemStatic.jsx';

class ListItem extends Component {
  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      guid: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      isEdited: React.PropTypes.bool.isRequired,
    }),
    onToggleEditMode: PropTypes.func.isRequired,
    onUpdateText: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._toggleEditMode = this._toggleEditMode.bind(this);
    this._saveItem = this._saveItem.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  _saveItem(guid, text) {
    this.props.onUpdateText(guid, text);
  }

  _toggleEditMode() {
    this.props.onToggleEditMode(this.props.item.guid);
  }

  _onDelete(guid) {
    this.props.onDelete(guid);
  }

  render() {
    const item = this.props.item;
    return (item.isEdited)
      ? (<ListItemEditable
        key={item.guid}
        item={item}
        onUpdateText={this._saveItem}
        onToggleEditMode={this._toggleEditMode}
        onDelete={this._onDelete}
      />)
      : (<ListItemStatic
        key={item.guid}
        item={item}
        onToggleEditMode={this._toggleEditMode}
      />);
  }
}

export { ListItem };
