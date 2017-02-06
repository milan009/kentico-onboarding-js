import React, { Component } from 'react';

class ListItem extends Component {

  static propTypes = {
    text: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    formDisplayed: React.PropTypes.bool.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired,
    onCancelClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    place: React.PropTypes.number.isRequired,
    onItemClick: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { text: this.props.text };

    this._onInputChange = this._onInputChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onCancelClick = this._onCancelClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
  }

  _onInputChange(event) {
    this.setState({ text: event.target.value });
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.props.id, this.state.text);
  }

  _onCancelClick() {
    this.props.onCancelClick(this.props.id);
    this.setState({ text: this.props.text });
  }

  _onDeleteClick() {
    this.props.onDeleteClick(this.props.id);
  }

  _onItemClick() {
    this.props.onItemClick(this.props.id);
  }

  render() {
    let item = '';
    if (this.props.formDisplayed) {
      item = (
        <form className="form-inline" onSubmit={this._onSubmit} >
          <input className="form-control" value={this.state.text} onChange={this._onInputChange} />
          <button type="submit" className="btn btn-primary" > Change </button>
          <button type="button" className="btn btn-default" onClick={this._onCancelClick} > Cancel </button>
          <button type="button" className="btn btn-danger" onClick={this._onDeleteClick} > Delete </button>
        </form>
      );
    }
    else {
      item = (<div onClick={this._onItemClick} >{this.props.place}. {this.props.text}</div>);
    }

    return (
      <li className="list-group-item">
        {item}
      </li>
    );
  }
}

export default ListItem;
