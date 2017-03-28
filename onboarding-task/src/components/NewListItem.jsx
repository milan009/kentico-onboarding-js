import React, { PureComponent } from 'react';

class NewListItem extends PureComponent {
  static propTypes = {
    addFunction: React.PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  _onInputChange = (e) => {
    this.setState({ text: e.target.value });
  };
  _add = () => {
    this.props.addFunction(this.state.text);
    this.setState({ text: '' });
  };
  render() {
    return (
      <div>
        <input value={this.state.text} onChange={this._onInputChange} />
        <button onClick={this._add}>Add</button>
      </div>
    );
  }
}

export { NewListItem };
