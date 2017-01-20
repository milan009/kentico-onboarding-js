import React, { Component, PropTypes } from 'react';
import DisplayItem from './DisplayItem';
import EditItem from './EditItem';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ExistingItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string.isRequired,
      isEdited: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
    }),
    onItemDelete: PropTypes.func.isRequired,
    onItemUpdate: PropTypes.func.isRequired,
  };

  static _toggleEdition(item) {
    return item.set('isEdited', !item.isEdited);
  }

  constructor(props) {
    super(props);

    this._toggleItemEdition = this._toggleItemEdition.bind(this);
    this._updateDescription = this._updateDescription.bind(this);
  }

  _deleteItem = () => this.props.onItemDelete(this.props.item.id);

  _updateDescription(description) {
    let changedItem = this.props.item.set('description', description);
    changedItem = ExistingItem._toggleEdition(changedItem);

    this.props.onItemUpdate(changedItem);
  }

  _toggleItemEdition() {
    const changedItem = ExistingItem._toggleEdition(this.props.item);
    this.props.onItemUpdate(changedItem);
  }

  render() {
    if (this.props.item.isEdited) {
      return (
        <EditItem
          index={this.props.index}
          onUpdateButtonClick={this._updateDescription}
          onCancelButtonClick={this._toggleItemEdition}
          onDeleteButtonClick={this._deleteItem}
          item={this.props.item}
        />
      );
    }

    return (
      <DisplayItem
        index={this.props.index}
        onItemClick={this._toggleItemEdition}
        item={this.props.item}
      />
    );
  }
}

export default ExistingItem;
