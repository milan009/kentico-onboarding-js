import React, { Component } from 'react';

import ListItem from './ListItem.jsx';

class List extends Component {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this._onAddClick = this._onAddClick.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._updateItemText = this._updateItemText.bind(this);
    this._generateGUID = this._generateGUID.bind(this);
  }

  _onAddClick() {
    const newItem = {
      id: this._generateGUID(),
      text: this.itemText.value,
    };
    this.itemText.value = '';
    this.setState({
      items: this.state.items.concat([newItem]),
    });
  }

  _deleteItem(id) {
    const remainingItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: remainingItems,
    });
  }

  _updateItemText(guid, text) {
    const updatedItems = this.state.items.map((item => {
      const newItem = item;
      if (item.id === guid) {
        newItem.text = text;
      }
      return newItem;
    }));
    this.setState({
      items: updatedItems,
    });
  }

  _generateGUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <pre>
            <ul className="list-group">
              {this.state.items.map((item, index) => <ListItem text={item.text} index={index} delete={this._deleteItem} save={this._updateItemText} key={item.id} id={item.id} />)}
              <li className="list-group-item">
                <form className="form-inline">
                  <input
                    type="text"
                    className="form-control"
                    id="itemText"
                    ref={(input) => {
                      this.itemText = input;
                    }}
                  />
                  <button type="button" className="btn btn-default" onClick={this._onAddClick}>Add</button>
                </form>
              </li>
            </ul>
          </pre>
        </div>
      </div>
    );
  }
}

export default List;
