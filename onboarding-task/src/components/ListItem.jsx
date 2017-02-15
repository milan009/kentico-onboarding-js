import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ListItem extends Component {

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      formDisplayed: React.PropTypes.bool.isRequired,
    }),
    index: React.PropTypes.number.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onFormDisplayedSwitch: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._switchFormDisplayed = this._switchFormDisplayed.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.props.item.id, this.input.value);
  }

  _switchFormDisplayed() {
    this.props.onFormDisplayedSwitch(this.props.item.id);
  }

  _onDeleteClick() {
    this.props.onDeleteClick(this.props.item.id);
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
          <button type="button" className="btn btn-default" onClick={this._switchFormDisplayed} > Cancel </button>
          <button type="button" className="btn btn-danger" onClick={this._onDeleteClick} > Delete </button>
        </form>
      );
    }
    else {
      item = (<div onClick={this._switchFormDisplayed} >{this.props.index}. {this.props.item.text}</div>);
    }

    return (
      <li className="list-group-item">
        {item}
      </li>
    );
  }
}

export default ListItem;
