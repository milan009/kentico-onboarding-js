import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import {OrderedMap} from 'immutable';

import { Item } from './Item';
import { AddForm } from './AddForm';
import { EditForm } from './EditForm';
import { IViewItem } from '../viewModels/ViewItem';

interface IListProps {
  list: OrderedMap<string, IViewItem>;
  addItem: (text: string) => void;
  deleteItem: (id: string) => void;
  updateItem: (id: string, text: string) => void;
  startEditingItem: (id: string) => void;
  stopEditingItem: (id: string) => void;
}

class List extends React.PureComponent<IListProps, undefined> {
  static displayName = 'List';

  static propTypes = {
    list: ImmutablePropTypes.orderedMapOf(ImmutablePropTypes.record).isRequired,
    addItem: React.PropTypes.func.isRequired,
    deleteItem: React.PropTypes.func.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    startEditingItem: React.PropTypes.func.isRequired,
    stopEditingItem: React.PropTypes.func.isRequired,
  };

  constructor(props: IListProps) {
    super(props);
    this._getItemToRender = this._getItemToRender.bind(this);
  }

  _getItemToRender(item: IViewItem, index: number) {
    if (item.isEdited) {
      return (<EditForm
        item={item}
        index={index}
        onSave={this.props.updateItem}
        onDelete={this.props.deleteItem}
        onCancel={this.props.stopEditingItem}
      />);
    }
    return <Item onListItemClick={this.props.startEditingItem} item={item} index={index} />;
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.props.list.valueSeq().map((item: IViewItem, index: number) =>
              <li className="list-group-item" key={item.id}>
                {this._getItemToRender(item, index)}
              </li>)
            }
            <li className="list-group-item">
              <AddForm onAdd={this.props.addItem} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export { List };
