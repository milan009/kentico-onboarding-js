import React, { Component, PropTypes } from 'react';
import DisplayItem from './DisplayItem';
import EditItem from './EditItem';

export default class ExistingItem extends Component {
  static propTypes = {
    listIndex: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    onItemDeleted: PropTypes.func.isRequired,
    onItemUpdated: PropTypes.func.isRequired
  };

  static toggleEdition(item) {
    return {
      ...item,
      isEdited: !item.isEdited
    }
  }

  constructor(props) {
    super(props);

    this.itemChanged = this.itemChanged.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
  }

  updateDescription(description) {
    let changedItem = {
      ...this.props.item,
      description: description
    };
    changedItem = ExistingItem.toggleEdition(changedItem);

    this.props.onItemUpdated(changedItem);
  }

  itemChanged(byButton, newDescription) {
    switch(byButton){
      case 'update':
        this.updateDescription(newDescription);
        break;
      case 'cancel':
        this.itemClicked();
        break;
      case 'delete':
          this.props.onItemDeleted(this.props.item.id);
        break;
      default:
        throw new Error('Operation "' + byButton + '" performed at item ' + this.props.listIndex + ' is not known');
    }
  }

  itemClicked() {
    const changedItem = ExistingItem.toggleEdition(this.props.item);
    this.props.onItemUpdated(changedItem);
  }

  render() {
    const visibleIndex = this.props.listIndex + 1;

    if(this.props.item.isEdited)
      return (
        <EditItem
          index={visibleIndex}
          onButtonClick={this.itemChanged}
          {...this.props.item}
        />
      );

    return (
      <DisplayItem
        index={visibleIndex}
        onItemClick={this.itemClicked}
        {...this.props.item}
      />
    );
  }
}
