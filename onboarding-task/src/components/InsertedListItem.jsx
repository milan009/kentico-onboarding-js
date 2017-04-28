import React, { PureComponent, PropTypes } from 'react';

class InsertedListItem extends PureComponent {
  static displayName = 'InsertedListItem';

  static propTypes = {
    item: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <span onClick={() => this.props.onEdit()}>{this.props.item.index + 1}. {this.props.item.text}</span>
      </div>
    );
  }
}

export { InsertedListItem };
