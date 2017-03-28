import React, { PureComponent, PropTypes } from 'react';

class InsertedListItem extends PureComponent {
  static displayName = 'InsertedListItem';

  static propTypes = {
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    editFunction: PropTypes.func.isRequired,
  };

  _onClick = () => {
    this.props.editFunction(this.props.index);
  };

  render() {
    return (
      <div>
        <span onClick={this._onClick}>{this.props.index + 1}. {this.props.text}</span>
      </div>
    );
  }
}

export { InsertedListItem };
