import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DisplayItem from './DisplayItem';
import EditItem from './EditItem';

class ExistingItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    isEdited: PropTypes.bool.isRequired,
    updateDescription: PropTypes.func.isRequired,
    updateIsEdited: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  _toggleEdition = () => this.props.updateIsEdited(!this.props.isEdited);

  render() {
    if (this.props.isEdited) {
      return (
        <EditItem
          index={this.props.index}
          onUpdateButtonClick={this.props.updateDescription}
          onCancelButtonClick={this._toggleEdition}
          onDeleteButtonClick={this.props.deleteItem}
          item={this.props.item}
        />
      );
    }

    return (
      <DisplayItem
        index={this.props.index}
        onItemClick={this._toggleEdition}
        item={this.props.item}
      />
    );
  }
}

export default ExistingItem;
