import React, { Component } from 'react';

import ListItem from './ListItem';
import AddItemElement from './AddItemElement';
import generateGUID from './GenerateGUID';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { listItems: [{ id: '1', value: 'a' }, { id: '2', value: 'b' }, { id: '3', value: 'c' }] };

    this._handleAdd = this._handleAdd.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
  }

  _handleAdd(value) {
    const updatedListItems = this.state.listItems.concat([{ id: generateGUID(), value }]);
    this.setState({ listItems: updatedListItems });
  }

  _handleEdit(changedItem) {
    const updatedListItems = this.state.listItems.map((item) => ((item.id === changedItem.id) && changedItem) || item);
    this.setState({ listItems: updatedListItems });
  }

  _handleDelete(deletedItemID) {
    const updatedListItems = this.state.listItems.filter((item) => item.id !== deletedItemID);
    this.setState({ listItems: updatedListItems });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <div>
            <ol>
              {this.state.listItems.map((item) => <ListItem key={item.id} id={item.id} value={item.value} edit={this._handleEdit} delete={this._handleDelete} />)}
            </ol>
            <AddItemElement add={this._handleAdd} />
          </div>
        </div>
      </div>
    );
  }
}

export default List;
