import React, { PureComponent } from 'react';
import { NewListItem } from './NewListItem';
import { InsertedListItem } from './InsertedListItem';
import { EditedListItem } from './EditedListItem';
import { generatePseudoUniqueID } from '../utils/keyGenerator';
import assignment from './../../../assignment.gif';
import { ListGroup } from 'react-bootstrap';

import TsComponent from './TsComponent.tsx';

class List extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  _addItem = (text) => {
    const newItems = this.state.items.slice();
    newItems.push({
      textSaved: text,
      textShown: text,
      editing: false,
      id: generatePseudoUniqueID(),
    });
    this.setState({ items: newItems });
  };

  // TODO edit and save contain a lot of duplicate code, refactor
  _edit = (index) => {
    const newItems = this.state.items.slice();
    newItems[index].editing = true;
    this.setState({ items: newItems });
  };

  _update = (index, e) => {
    const newItems = this.state.items.slice();
    newItems[index].textShown = e.target.value;
    this.setState({ items: newItems });
  };

  _cancel = (index) => {
    const newItems = this.state.items.slice();
    newItems[index].textShown = newItems[index].textSaved;
    newItems[index].editing = false;
    this.setState({ items: newItems });
  };

  _save = (index, text) => {
    const newItems = this.state.items.slice();
    newItems[index].textSaved = text;
    newItems[index].textShown = text;
    newItems[index].editing = false;
    this.setState({ items: newItems });
  };

  _delete = (index) => {
    const newItems = this.state.items.filter((_, i) => i !== index);
    this.setState({ items: newItems });
  };

  _createListItems = () => {
    return this.state.items.map((x, i) => {
      if (x.editing) {
        return (<EditedListItem
          text={x.textShown}
          index={i}
          key={x.id}
          saveFunction={this._save}
          deleteFunction={this._delete}
          updateFunction={this._update}
          cancelFunction={this._cancel}
        />);
      }
      return (<InsertedListItem
        text={x.textShown}
        index={i}
        key={x.id}
        editFunction={this._edit}
      />);
    });
  };

  render() {
    const listItems = this._createListItems();
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
            <ListGroup>
              {listItems}
            </ListGroup>
            <NewListItem addFunction={this._addItem} key={generatePseudoUniqueID()} />
          </div>
        </div>
      </div>
    );
  }
}

export { List };
