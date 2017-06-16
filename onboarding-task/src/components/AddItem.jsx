import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddItem extends Component {

  static propTypes = {
    addNewElement: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentText: '',
    };
  }

  _handleChange = (event) => {
    this.setState({ currentText: event.target.value });
  };

  _handleSubmit = (event) => {
    event.preventDefault();
    this.props.addNewElement(this.state.currentText);
    this.setState({ currentText: '' });
  };

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <input type="text" onChange={this._handleChange} value={this.state.currentText} />
        <button type="submit" className="btn btn-default">Add</button>
      </form>
    );
  }
}

export { AddItem };
