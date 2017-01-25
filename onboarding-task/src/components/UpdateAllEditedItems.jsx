import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class UpdateAllEditedItems extends Component {
  static propTypes = {
    storableItems: ImmutablePropTypes.mapOf(
      ImmutablePropTypes.recordOf({
        description: PropTypes.string,
        isEdited: PropTypes.bool,
      }),
      PropTypes.string,
    ),
    storableItemsCount: PropTypes.number.isRequired,
    updateAllItems: PropTypes.func.isRequired,
  };

  _updateAllItems = () => this.props.updateAllItems(this.props.storableItems);

  render() {
    return (
      <div className="input-group">
        <span className="input-group-addon">
          There are currently {this.props.storableItemsCount} edited items ready to update.
        </span>
        <span className="input-group-btn">
          <button
            className="btn btn-info btn-block"
            title="Update all"
            type="button"
            onClick={this._updateAllItems}
          >
            <span className="glyphicon glyphicon-pencil" />
          </button>
        </span>
      </div>);
  }
}

export default UpdateAllEditedItems;
