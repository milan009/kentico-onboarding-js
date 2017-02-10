import React, { Component } from 'react';
import assignment from './../../../assignment.gif';
import ListItem from './ListItem.jsx';

import TsComponent from './TsComponent.tsx';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItemText = this.updateItemText.bind(this);
  }

  onAddClick() {
    const newItem = {
      id: this.generateGUID(),
      text: this.itemText.value,
    };
    this.itemText.value = '';
    this.setState({
      items: this.state.items.concat([newItem]),
    });
  }

  generateGUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  deleteItem(guid) {
    const remainingItems = this.state.items.filter(item => item.id !== guid);
    this.setState({
      items: remainingItems,
    });
  }

  updateItemText(guid, text) {
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

  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">Desired functionality is captured on the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
              <ul className="list-group">
                {this.state.items.map((item, index) => <ListItem text={item.text} index={index} delete={this.deleteItem} save={this.updateItemText} key={item.id} guid={item.id} />)}
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
                    <button type="button" className="btn btn-default" onClick={this.onAddClick}>Add</button>
                  </form>
                </li>
              </ul>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
