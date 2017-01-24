import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor() {
    super();
    this.state = { items: [] };
    this._addItem = this._addItem.bind(this);
  }

  componentDidMount() {
  }

  _addItem(item) {
    const items = this.state.items;
    items.push(item);
    this.setState(items);
  }


  render() {
    const items = this.state.items;
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            {items.map(item => <Text item={item} />)}
            <ListItem addItem={this.addItem} />
          </div>
        </div>
      </div>
    );
  }
}

export default List;
