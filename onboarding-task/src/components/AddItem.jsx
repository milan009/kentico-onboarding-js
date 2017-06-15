import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ViewItem extends Component {

  render() {
    return (
      <div className="row">
        <li onClick={() => this.props.toggleEdit(this.props.uid)}>
          {this.props.text}
        </li>
      </div>
    );
  }
}

ViewItem.propTypes = {
  text: PropTypes.string,
  uid: PropTypes.string,
  toggleEdit: PropTypes.func,
};

export { ViewItem };
