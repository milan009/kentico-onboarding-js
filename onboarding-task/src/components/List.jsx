import React, { Component } from 'react';

import ListItem from './ListItem';
import AddItemElement from './AddItemElement';
import generateGUID from './GenerateGUID';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { listValues: [{ id: '1', value: 'a' }, { id: '2', value: 'b' }, { id: '3', value: 'c' }] };

    this._handleAdd = this._handleAdd.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
  }

  _handleAdd(value) {
    const values = this.state.listValues.concat([{ id: generateGUID(), value }]);
    this.setState({ listValues: values });
  }

  _handleEdit() {
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <div>
            <ol>
              {this.state.listValues.map((listValue) => <ListItem key={listValue.id} id={listValue.id} value={listValue.value} edit={this._handleEdit} />)}
            </ol>
            <AddItemElement add={this._handleAdd} />
          </div>
        </div>
      </div>
    );
  }
}

export default List;
