import React, { Component } from 'react';

class ListItem extends Component {

  static propTypes = {
    text: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    formDisplayed: React.PropTypes.bool.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    place: React.PropTypes.number.isRequired,
    switchFormDisplayed: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.props.id, this.input.value);
  }

  render() {
    let item = '';
    if (this.props.formDisplayed) {
      item = (
        <form className="form-inline" onSubmit={this._onSubmit} >
          <input
            className="form-control"
            defaultValue={this.props.text}
            ref={(input) => {
              this.input = input;
            }}
          />
          <button type="submit" className="btn btn-primary" > Change </button>
          <button type="button" className="btn btn-default" onClick={this.props.switchFormDisplayed} > Cancel </button>
          <button type="button" className="btn btn-danger" onClick={this.props.onDeleteClick} > Delete </button>
        </form>
      );
    }
    else {
      item = (<div onClick={this.props.switchFormDisplayed} >{this.props.place}. {this.props.text}</div>);
    }

    return (
      <li className="list-group-item">
        {item}
      </li>
    );
  }
}

export default ListItem;
