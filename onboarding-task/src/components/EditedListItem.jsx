import React, { PureComponent } from 'react';

class EditedListItem extends PureComponent {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    saveFunction: React.PropTypes.func.isRequired,
    deleteFunction: React.PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    console.log('creating editing obj');
    this.state = {
      text: this.props.text,
    };
  }
  _onInputChange = (e) => {
    console.log('onInputChange called');
    this.setState({ text: e.target.value });
  };
  _save = () => {
    this.props.saveFunction(this.props.index, this.state.text);
  };
  _cancel = () => {
    // this.setState({ text: this.props.text });
    this.props.saveFunction(this.props.index, this.props.text);
  };
  _delete = () => {
    this.props.deleteFunction(this.props.index);
  };
  render() {
    return (
      <div>
        {this.props.index + 1}.
        <input value={this.state.text} onChange={this._onInputChange} />
        <button onClick={this._save}>Save</button>
        <button onClick={this._cancel}>Cancel</button>
        <button onClick={this._delete}>Delete</button>
      </div>
    );
  }
}

export { EditedListItem };
