import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import DisplayItem from './DisplayItem';
import EditItem from '../containers/EditItem';

class ExistingItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    isEdited: PropTypes.bool.isRequired,
    enableEdition: PropTypes.func.isRequired,
  };

  render() {
    if (this.props.isEdited) {
      return (
        <EditItem
          index={this.props.index}
          item={this.props.item}
        />
      );
    }

    return (
      <DisplayItem
        index={this.props.index}
        onItemClick={this.props.enableEdition}
        item={this.props.item}
      />
    );
  }
}

export default ExistingItem;
