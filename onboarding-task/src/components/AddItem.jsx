import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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

    if (!this._isItemEmpty()) {
      this.props.onAddItem(this.state.currentText);
      this.setState({ currentText: '' });
    }
  };

  _isItemEmpty = () =>
    this.state.currentText.trim() === '';

  render() {
    let buttonClasses = 'form-control btn btn-default';
    if (this._isItemEmpty()) {
      buttonClasses += ' disabled';
    }

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
          className={buttonClasses}
        >
          Add
        </button>
      </form>
    );
  }
}

export { AddItem as AddItemComponent };
