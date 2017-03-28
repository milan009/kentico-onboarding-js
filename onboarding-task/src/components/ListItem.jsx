import React, { Component } from 'react';

class ListItem extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    updateFunction: React.PropTypes.func.isRequired,
    deleteFunction: React.PropTypes.func.isRequired,
    addFunction: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      added: false,
      editPhase: false,
    };
  }
  _add = () => {
    console.log('add called');
    this.setState({ added: true });
    this.props.updateFunction(this.state.text, this.props.index);
    this.props.addFunction();
  };
  _edit = () => {
    this.setState({ editPhase: this.state.added });
  };
  _cancelEdit = () => {
    this.setState({ editPhase: false });
    this.setState({ text: this.props.text });
  };
  _delete = () => {
    this.props.deleteFunction(this.props.index);
    this.setState({ text: '' });
  };
  _save = () => {
    this.setState({ editPhase: false });
    this.props.updateFunction(this.state.text, this.props.index);
  };
  _onInputChange = (e) => {
    this.setState({ text: e.target.value });
  };
  render() {
    const hideAddPhase = this.state.added;
    const hideEditPhase = !this.state.editPhase || !this.state.added;
    return (
      <div>
        {this.props.index + 1}.
        <input value={this.state.text} onClick={this._edit} onChange={this._onInputChange} />
        <button hidden={hideAddPhase} onClick={this._add}>Add</button>
        <button hidden={hideEditPhase} onClick={this._save}>Save</button>
        <button hidden={hideEditPhase} onClick={this._cancelEdit}>Cancel</button>
        <button hidden={hideEditPhase} onClick={this._delete}>Delete</button>
        <h5>{this.state.added.toString()}</h5>
        <h5>{}</h5>
      </div>
    );
  }
}

export { ListItem };
