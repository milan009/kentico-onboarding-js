import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class UpdateAllEditedItems extends Component {
  static propTypes = {
    editedItems: ImmutablePropTypes.mapOf(
      PropTypes.string,
      PropTypes.string,
    ),
    updateAllItems: PropTypes.func.isRequired,
  };

  _updateAllItems = () => this.props.updateAllItems(this.props.editedItems);

  render() {
    const editedItemsCount = this.props.editedItems.count();
    if (editedItemsCount > 1) {
      return (
        <div className="input-group">
          <span className="input-group-addon">
            There are currently {editedItemsCount} edited items.
          </span>
          <span className="input-group-btn">
            <button
              className="btn btn-info"
              type="button"
              onClick={this._updateAllItems}
            >
              Update all
            </button>
          </span>
        </div>);
    }

    return (
      <div className="input-group">
      </div>
    );
  }
}

export default UpdateAllEditedItems;
