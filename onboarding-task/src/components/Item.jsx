import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class Item extends PureComponent {
  static displayName = 'Item';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onListItemClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._startEditing = this._startEditing.bind(this);
  }

  _startEditing() {
    this.props.onListItemClick(this.props.item.id);
  }

  render() {
    return (
      <div onClick={this._startEditing}>{`${this.props.index + 1}. ${this.props.item.text}`}</div>
    );
  }
}

export { Item };
