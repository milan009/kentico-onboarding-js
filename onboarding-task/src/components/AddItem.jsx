import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isValidItemText } from '../utils/validation';

class AddItem extends PureComponent {

  static displayName = 'AddItem';

  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentText: '',
    };
  }

  _onChange = (event) => {
    const setStateText = (currentText) => (() => ({ currentText }));
    this.setState(setStateText(event.target.value));
  };

  _addItem = (event) => {
    event.preventDefault();
    const currText = this.state.currentText;

    if (isValidItemText(currText)) {
      this.props.onAddItem(currText);
      this.setState(() => ({ currentText: '' }));
    }
  };

  render() {
    return (
      <form onSubmit={this._addItem} className="form-inline list-group-item">
        <input
          type="text"
          className="form-control"
          onChange={this._onChange}
          value={this.state.currentText}
        />
        <button
          type="submit"
          className={classNames('form-control', 'btn', 'btn-default', { disabled: !isValidItemText(this.state.currentText) })}
        >
          Add
        </button>
      </form>
    );
  }
}

export { AddItem };
