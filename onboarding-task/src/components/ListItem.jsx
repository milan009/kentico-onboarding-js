import React, { Component } from 'react';

class ListItem extends Component {

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    switchFormDisplayed: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.input.value);
  }

  render() {
    let item = '';
    if (this.props.item.formDisplayed) {
      item = (
        <form className="form-inline" onSubmit={this._onSubmit} >
          <input
            className="form-control"
            defaultValue={this.props.item.text}
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
      item = (<div onClick={this.props.switchFormDisplayed} >{this.props.index}. {this.props.item.text}</div>);
    }

    return (
      <li className="list-group-item">
        {item}
      </li>
    );
  }
}

export default ListItem;
