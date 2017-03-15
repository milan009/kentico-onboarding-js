import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { IViewItem } from '../viewModels/ViewItem';
import { EditForm } from './EditForm';
import { IAction } from '../actions/IAction';
import { ItemDetail } from './ItemDetail';

interface IItemProps {
  item: IViewItem;
  deleteItem: () => IAction;
  updateItem: (text: string) => IAction;
  startEditingItem: () => IAction;
  stopEditingItem: () => IAction;
}

class Item extends React.PureComponent<IItemProps, undefined> {
  static displayName = 'Item';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
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
    this._getItemToRender = this._getItemToRender.bind(this);
  }

  _getItemToRender(item: IViewItem) {
    if (item.isEdited) {
      return (
        <EditForm
          item={item}
          onSave={this.props.updateItem}
          onDelete={this.props.deleteItem}
          onCancel={this.props.stopEditingItem}
        />
      );
    }
    return <ItemDetail startEditingItem={this.props.startEditingItem} index={item.index} text={item.text} />;
  }

  render() {
    return (
      <li className="list-group-item">
        {this._getItemToRender(this.props.item)}
      </li>
    );
  }
}

export { Item };
