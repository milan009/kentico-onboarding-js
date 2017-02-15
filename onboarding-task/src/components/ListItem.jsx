import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ListItemForm from './ListItemForm';
import ListItemLabel from './ListItemLabel';

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

    this.state = {
      formInputValue: this.props.item.text,
    };

    this._onSubmit = this._onSubmit.bind(this);
    this._onFormDisplayedSwitch = this._onFormDisplayedSwitch.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onFormInputChange = this._onFormInputChange.bind(this);
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.props.item.id, this.state.formInputValue);
  }

  _onFormDisplayedSwitch() {
    this.props.onFormDisplayedSwitch(this.props.item.id);
    this.setState({ formInputValue: this.props.item.text });
  }

  _onDeleteClick() {
    this.props.onDeleteClick(this.props.item.id);
  }

  _onFormInputChange(event) {
    this.setState({ formInputValue: event.target.value });
  }

  render() {
    let item = '';
    if (this.props.item.formDisplayed) {
      item = (
        <ListItemForm
          inputValue={this.state.formInputValue}
          onFormSubmit={this._onSubmit}
          onFormCancelClick={this._onFormDisplayedSwitch}
          onFormDeleteClick={this._onDeleteClick}
          onInputChange={this._onFormInputChange}
        />
      );
    }
    else {
      item = (
        <ListItemLabel
          text={this.props.item.text}
          index={this.props.index}
          onClickHandler={this._onFormDisplayedSwitch}
        />
      );
    }

    return (
      item
    );
  }
}

export default ListItem;
