import React, { PureComponent, PropTypes } from 'react';

class LineRead extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onDoubleClick: PropTypes.func,
  };

  static displayName = 'LineRead';

  _handleDoubleClick = () => {
    this.props.onDoubleClick(this.props.id);
  };

  render() {
    return (
      <li className="list-group-item" onDoubleClick={this._handleDoubleClick} >
        <span>{this.props.number}. </span>
        {this.props.text}
      </li>
    );
  }
}

export { LineRead };
