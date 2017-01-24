import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class UpdateAllEditedItems extends Component {
  static propTypes = {
    editedItems: ImmutablePropTypes.mapOf(
      PropTypes.string,
      PropTypes.string,
    ),
    editedItemsCount: PropTypes.number.isRequired,
    updateAllItems: PropTypes.func.isRequired,
  };

  _updateAllItems = () => this.props.updateAllItems(this.props.editedItems);

  render() {
    return (
      <div className="input-group">
        <span className="input-group-addon">
          There are currently {this.props.editedItemsCount} edited items.
        </span>
        <span className="input-group-btn">
          <button
            className="btn btn-warning btn-block"
            type="button"
            onClick={this._updateAllItems}
          >
            Update all
          </button>
        </span>
      </div>);
  }
}

export default UpdateAllEditedItems;
