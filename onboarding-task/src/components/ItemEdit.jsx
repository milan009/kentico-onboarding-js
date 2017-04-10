import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ItemEdit extends PureComponent {
  static displayName = 'ItemEdit';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isEdited: PropTypes.bool.isRequired,
      index: PropTypes.number.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.item.text,
    };
  }

  _handleOnChange = (event) => {
    this.setState({ text: event.target.value });
  };

  _handleOnSave = () => {
    this.props.onSave(
      this.state.text,
    );
  };

  _handleOnDelete = () => {
    this.props.onDelete();
  };

  _handleOnCancel = () => {
    this.props.onCancel();
  };

  render() {
    return (
      <div>
        <span className="form-inline">{this.props.item.index}.
          <input className="form-control" value={this.state.text} onChange={this._handleOnChange} />
          <span>
            <button type="button" className="btn btn-primary" onClick={this._handleOnSave}>Save</button>
            <button type="button" className="btn btn-default" onClick={this._handleOnCancel}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this._handleOnDelete}>Delete</button>
          </span>
        </span>
      </div>
    );
  }
}

export { ItemEdit };
