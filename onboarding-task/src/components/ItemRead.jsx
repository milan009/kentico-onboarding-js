import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ItemRead extends PureComponent {
  static displayName = 'ItemRead';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isEdited: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,
    onDoubleClick: PropTypes.func.isRequired,
  };

  _handleDoubleClick = () => {
    this.props.onDoubleClick();
  };

  render() {
    return (
      <div onDoubleClick={this._handleDoubleClick} >
        <span>{this.props.item.index}. </span>
        {this.props.item.text}
      </div>
    );
  }
}

export { ItemRead };
