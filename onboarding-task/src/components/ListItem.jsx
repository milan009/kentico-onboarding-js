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

    this._onSubmit = this._onSubmit.bind(this);
    this._onFormDisplayedSwitch = this._onFormDisplayedSwitch.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
  }

  _onSubmit(text) {
    this.props.onFormSubmit(this.props.item.id, text);
  }

  _onFormDisplayedSwitch() {
    this.props.onFormDisplayedSwitch(this.props.item.id);
  }

  _onDeleteClick() {
    this.props.onDeleteClick(this.props.item.id);
  }

  render() {
    return (this.props.item.formDisplayed)
      ? (<ListItemForm
        inputValue={this.props.item.text}
        onFormSubmit={this._onSubmit}
        onFormCancelClick={this._onFormDisplayedSwitch}
        onFormDeleteClick={this._onDeleteClick}
      />)
      : (<ListItemLabel
        text={this.props.item.text}
        index={this.props.index}
        onClickHandler={this._onFormDisplayedSwitch}
      />);
  }
}

export default ListItem;
