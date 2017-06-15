import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewItem extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    toggleEdit: PropTypes.func.isRequired,
  };

  _handleClick = () => {
    console.log(this.props.text);
    this.props.toggleEdit(this.props.uid);
  };

  render() {
    return (
      <div className="row">
        <li onClick={this._handleClick}>
          {this.props.text}
        </li>
      </div>
    );
  }
}

export { ViewItem };
