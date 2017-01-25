import React, { Component, PropTypes } from 'react';

class ListItem extends Component {
  static displayName = 'ListItem';
  static propTypes = {
    key: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleItemUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = props.item;
    this._handleClick = this._handleClick.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleClick() {
    this.setState(prevState => ({
      editable: !prevState.editable,
    }));
  }

  _handleChange() {
    this.setState({ text: this.textInput.value, editable: false, guid: this.props.item.guid });
    this.props.handleItemUpdate(this.state);
  }

  _handleDelete() {
    this.props.handleDelete(this.props.item.guid);
  }

  render() {
    if (this.state.editable) {
      return (
        <div>
          <input
            type="text"
            defaultValue={this.state.text}
            ref={
              (input) => {
                this.textInput = input;
              }
            }
          />
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
