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
    this.props.onAddItem(this.state.currentText);
    this.setState({ currentText: '' });
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
          className="form-control btn btn-default"
        >
          Add
        </button>
      </form>
    );
  }
}

export { AddItem as AddItemComponent };
