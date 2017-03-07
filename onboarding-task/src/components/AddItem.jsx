import React, { Component, PropTypes } from 'react';

class AddItem extends Component {
  static displayName = 'AddItem';
  static propTypes = {
    onItemAdd: PropTypes.func.isRequired,
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
    this.props.onItemAdd(this.state.text);
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

export { AddItem };

