import React, { Component, PropTypes } from 'react';
import DisplayItem from './DisplayItem';
import EditItem from './EditItem';
import ImmutablePropTypes from 'react-immutable-proptypes'

class ExistingItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string.isRequired,
      isEdited: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
    }),
    onItemDeleted: PropTypes.func.isRequired,
    onItemUpdated: PropTypes.func.isRequired,
  };

  static _toggleEdition(item) {
    return item.set('isEdited', !item.isEdited);
  }

  constructor(props) {
    super(props);

    this._itemChanged = this._itemChanged.bind(this);
    this._itemClicked = this._itemClicked.bind(this);
  }

  _updateDescription(description) {
    let changedItem = this.props.item.set('description', description);
    changedItem = ExistingItem._toggleEdition(changedItem);

    this.props.onItemUpdated(changedItem);
  }

  _itemChanged(byButton, newDescription) {
    switch(byButton){
      case 'update':
        this._updateDescription(newDescription);
        break;
      case 'cancel':
        this._itemClicked();
        break;
      case 'delete':
          this.props.onItemDeleted(this.props.item.id);
        break;
      default:
        throw new Error('Operation "' + byButton + '" performed at item ' + this.props.index + ' is not known');
    }
  }

  _itemClicked() {
    const changedItem = ExistingItem._toggleEdition(this.props.item);
    this.props.onItemUpdated(changedItem);
  }

  render() {
    if(this.props.item.isEdited)
      return (
        <EditItem
          index={this.props.index}
          onButtonClick={this._itemChanged}
          item={this.props.item}
        />
      );

    return (
      <DisplayItem
        index={this.props.index}
        onItemClick={this._itemClicked}
        item={this.props.item}
      />
    );
  }
}

export default ExistingItem;
