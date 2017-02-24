import * as React from 'react';

import EditItem from './EditItem';

interface IItem {
  id: string
  value: string
}

interface IListItemProps {
  item: IItem
  index: number
  onItemValueEdit: (id: string, value: string) => void;
  onDelete: (deletedItemID: string) => void;
}

interface IListItemState {
  isBeingEdited: boolean
}

class ListItem extends React.Component<IListItemProps, IListItemState> {
  static displayName = 'ListItem';

  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired,
    }).isRequired,
    index: React.PropTypes.number.isRequired,
    onItemValueEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired };

  constructor(props: any) {
    super(props);
    this.state = { isBeingEdited: false };

    this._labelClick = this._labelClick.bind(this);
    this._cancelEdit = this._cancelEdit.bind(this);
    this._saveValue = this._saveValue.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  _labelClick() {
    this.setState({ isBeingEdited: true });
  }

  _cancelEdit() {
    this.setState({ isBeingEdited: false });
  }

  _saveValue(value: any) {
    this.props.onItemValueEdit(this.props.item.id, value);
    this.setState({ isBeingEdited: false });
  }

  _deleteItem() {
    this.props.onDelete(this.props.item.id);
  }

  render() {
    const value = this.props.item.value;
    if (this.state.isBeingEdited) {
      return (
        <EditItem
          value={value}
          index={this.props.index}
          onEdit={this._saveValue}
          onDelete={this._deleteItem}
          onCancel={this._cancelEdit}
        />);
    }
    return (
      <div onClick={this._labelClick}>
        {this.props.index}. {value}
      </div>
    );
  }
}

export default ListItem;
