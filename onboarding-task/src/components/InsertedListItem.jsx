import React, { PureComponent, PropTypes } from 'react';

class InsertedListItem extends PureComponent {
  static displayName = 'InsertedListItem';

  static propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <span onClick={() => this.props.onEdit()}>{this.props.index + 1}. {this.props.text}</span>
      </div>
    );
  }
}

export { InsertedListItem };
