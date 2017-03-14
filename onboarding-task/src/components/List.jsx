import React, { Component } from 'react';
import assignment from './../../../assignment.gif';

import TsComponent from './TsComponent.tsx';
import ListRowEdit from './ListRowEdit.jsx';
// import ListRow from './ListRow.jsx';
import CreateItem from './CreateItem.jsx';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };

    this.handleItemAdded = this.handleItemAdded.bind(this);
    // this.handleItemOnClick = this.handleItemOnClick.bind(this);
  }

  handleItemAdded(item) {
    if (!item.match(/\S/)) {
      return false;
    }
    const items = this.state.items;
    items.push({
      id: Date.now(),
      text: item,
      editing: false,
    });
    this.setState({ items });
    return true;
  }

  handleItemOnClick(index, event) {
    const listItems = this.state.items;
    listItems[index].editing = true;
    this.setState({ items: listItems });
    event.preventDefault();
  }

  render() {
    const listItems = this.state.items.map((item, i) => {
      let retVal = null;
      if (item.editing) {
        retVal = (
          <ListRowEdit key={item.id} value={item.text}>
            <span>{i}. </span>
          </ListRowEdit>
        );
      }
      else {
        const onItemClick = this.handleItemOnClick.bind(this, i);
        retVal = (
          // <ListRow key={item.id} value={item.text} index={i} onRowClick={this.handleItemOnClick} />
          <a href="#" className="list-group-item" key={item.id} onClick={onItemClick}>
            {i}. <span>{item.text}</span>
          </a>
        );
      }
      return retVal;
    });

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
            <div className="list-group">
              {listItems}
              <CreateItem onItemAdded={this.handleItemAdded} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
