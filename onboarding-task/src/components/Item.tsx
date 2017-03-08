import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { IViewItem } from '../viewModels/ViewItem';
import { EditForm } from './EditForm';

interface IItemProps {
  item: IViewItem;
  deleteItem: (id: string) => void;
  updateItem: (id: string, text: string) => void;
  startEditingItem: (id: string) => void;
  stopEditingItem: (id: string) => void;
}

class Item extends React.PureComponent<IItemProps, undefined> {
  static displayName = 'Item';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: React.PropTypes.string,
      text: React.PropTypes.string,
      isEdited: React.PropTypes.bool,
      index: React.PropTypes.number,
    }).isRequired,
    deleteItem: React.PropTypes.func.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    startEditingItem: React.PropTypes.func.isRequired,
    stopEditingItem: React.PropTypes.func.isRequired,
  };

  constructor(props: IItemProps) {
    super(props);
    this._startEditing = this._startEditing.bind(this);
    this._getItemToRender = this._getItemToRender.bind(this);
  }

  _startEditing() {
    this.props.startEditingItem(this.props.item.id);
  }

  _getItemToRender(item: IViewItem) {
    if (item.isEdited) {
      return (<EditForm
        item={item}
        onSave={this.props.updateItem}
        onDelete={this.props.deleteItem}
        onCancel={this.props.stopEditingItem}
      />);
    }
    return <div onClick={this._startEditing}>{`${this.props.item.index}. ${this.props.item.text}`}</div>;
  }

  render() {
    return (<li className="list-group-item">
      {this._getItemToRender(this.props.item)}
    </li>);
  }
}

export { Item };
