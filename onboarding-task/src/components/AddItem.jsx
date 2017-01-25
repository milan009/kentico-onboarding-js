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
      text: this.textInput.value,
      editable: false,
    };
    this.props.addItem(newItem);
    this.textInput.value = '';
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
      <tr>
        <td>
          <div className="form-inline">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                defaultValue={''}
                onChange={this._handleInputChange}
                ref={
                  (input) => {
                    this.textInput = input;
                  }
                }
              />
            </div>
            <div className="form-group">
              <input className="btn btn-default" type="button" value="Add" onClick={this._createNewItem} />
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default AddItem;
