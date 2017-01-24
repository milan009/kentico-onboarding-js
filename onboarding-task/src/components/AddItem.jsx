import React, { Component, PropTypes } from 'react';

class AddItem extends Component {
  static displayName = 'AddItem';
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
    this._handleInputChange = this._handleInputChange.bind(this);
    this._createNewItem = this._createNewItem.bind(this);
  }

  _handleInputChange(e) {
    this.setState({ text: e.target.value });
  }

  _createNewItem() {
    const newItem = {
      guid: this._generateGuid(),
      text: this.state.text,
    };
    this.props.addItem(newItem);
  }

  _generateGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  render() {
    return (
      <div>
        <input type="text" defaultValue={this.state.text} onChange={this._handleInputChange} />
        <input type="button" value="Add" onClick={this._createNewItem} />
      </div>
    );
  }

}

export default AddItem;
