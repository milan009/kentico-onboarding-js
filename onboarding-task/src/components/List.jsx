import React, { Component, PropTypes } from 'react';
import { ListItemEditable } from './ListItemEditable.jsx';
import { ListItemStatic } from './ListItemStatic.jsx';
import { AddItem } from './AddItem.jsx';
import ImmutablePropTypes from 'react-immutable-proptypes';


class List extends Component {
  static displayName = 'List';
  static propTypes = {
    items: ImmutablePropTypes.mapOf(
      ImmutablePropTypes.recordOf({
        guid: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        isEdited: React.PropTypes.bool.isRequired,
      }),
    ),
    onToggleEditMode: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._deleteItem = this._deleteItem.bind(this);
    this._saveItem = this._saveItem.bind(this);
    this._toggleEditMode = this._toggleEditMode.bind(this);
    this._getItemToRender = this._getItemToRender.bind(this);
    this._addItem = this._addItem.bind(this);
  }

  _deleteItem(guid) {
    this.props.onDelete(guid);
  }

  _addItem(text) {
    this.props.onAddItem(text);
  }
  _saveItem(guid, text) {
    this.props.onUpdate(guid, text);
  }

  _toggleEditMode(guid) {
    this.props.onToggleEditMode(guid);
  }

  _getItemToRender(item, index) {
    return (item.get('isEdited'))
      ? (<ListItemEditable
        key={item.get('guid')}
        item={item}
        onDelete={this._deleteItem}
        onSave={this._saveItem}
        onCancel={this._toggleEditMode}
      />)
      : (<ListItemStatic
        key={item.get('guid')}
        item={item}
        onClick={this._toggleEditMode}
      />);
  }

  render() {
    const items = this.props.items.valueSeq();
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <table className="table table-bordered">
            <tbody>
            {items.map(this._getItemToRender)}
              <AddItem onItemAdd={this._addItem} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export { List };
