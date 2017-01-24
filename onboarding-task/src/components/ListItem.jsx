import React from 'react';
import ReactDOM from 'react-dom';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editable: false, text: '', guid: '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      editable: !prevState.editable,
    }));
  }

  handleChange(event) {
    this.setState({ text: event.target.value, editable: false });
  }

  handleDelete() {
    ReactDOM.unmountComponentAtNode(document.getElementById(this.state.text));
  }

  render() {
    if (this.state.editable) {
      return (
        <div>
          <input type="text" defaultValue={this.state.text} />
          <button onClick={this.handleChange}>Save</button>
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.handleClick}>Cancel</button>
        </div>
      );
    }
    return (
      <div>
        <h2 onClick={this.handleClick}>{this.state.text}</h2>
      </div>
    );
  }
}

export default ListItem;
