import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class ListItem extends Component {
  static displayName = 'ListItem';
  static propTypes = {
    key: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { editable: false, text: '', guid: '' };
    this._handleClick = this._handleClick.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleClick() {
    this.setState(prevState => ({
      editable: !prevState.editable,
    }));
  }

  _handleChange(event) {
    this.setState({ text: event.target.value, editable: false });
  }

  _handleDelete() {
    ReactDOM.unmountComponentAtNode(document.getElementById(this.state.text));
  }

  render() {
    if (this.state.editable) {
      return (
        <div>
          <input type="text" defaultValue={this.state.text} />
          <button onClick={this._handleChange}>Save</button>
          <button onClick={this._handleDelete}>Delete</button>
          <button onClick={this._handleClick}>Cancel</button>
        </div>
      );
    }
    return (
      <div>
        <h2 onClick={this._handleClick}>{this.state.text}</h2>
      </div>
    );
  }
}

export default ListItem;
