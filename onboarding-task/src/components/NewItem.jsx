import React, { Component, PropTypes } from 'react';

class NewItem extends Component {
  static displayName = 'NewItem';
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
    this._onInputChange = this._onInputChange.bind(this);
    this._createNewItem = this._createNewItem.bind(this);
  }

  _onInputChange(e) {
    this.setState({ text: e.target.value });
  }

  _createNewItem() {
    this.props.addItem(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <tr>
        <td>
          <div className="form-inline">
            <div className="form-group">
              <input className="form-control" type="text" value={this.state.text} onChange={this._onInputChange} />
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

export default NewItem;
