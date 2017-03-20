import React, { Component } from 'react';

const LineTextPropTypes = {
  id: React.PropTypes.string.isRequired,
  number: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  onDoubleClick: React.PropTypes.func,
};

class LineText extends Component {
  constructor(props) {
    super(props);

    this._handleDoubleClick = this._handleDoubleClick.bind(this);
  }

  _handleDoubleClick() {
    this.props.onDoubleClick(this.props.id);
  }
  render() {
    return (
      <li className="list-group-item" onDoubleClick={this._handleDoubleClick} >
        <span>{this.props.number}. </span>
        {this.props.text}
      </li>
    );
  }
}
LineText.propTypes = LineTextPropTypes;

export default LineText;
