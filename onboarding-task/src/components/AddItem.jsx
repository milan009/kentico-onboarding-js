import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isStringValid } from '../utils/validation';

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

  _onChange = event => {
    this.setState({ currentText: event.target.value });
  };

  _addItem = event => {
    event.preventDefault();

    if (isStringValid(this.state.currentText)) {
      this.props.onAddItem(this.state.currentText);
      this.setState({ currentText: '' });
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
          className={classNames('form-control', 'btn', 'btn-default', { disabled: !isStringValid(this.state.currentText) })}
        >
          Add
        </button>
      </form>
    );
  }
}

export { AddItem };
