import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ItemEdit extends PureComponent {
  static displayName = 'ItemEdit';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isEdited: PropTypes.bool.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
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

  render() {
    return (
      <div>
        <span className="form-inline">{this.props.index}.
          <input className="form-control" value={this.state.text} onChange={this._handleOnChange} />
          <span>
            <button type="button" className="btn btn-primary" onClick={this._handleOnSave}>Save</button>
            <button type="button" className="btn btn-default" onClick={this.props.onCancel}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={this.props.onDelete}>Delete</button>
          </span>
        </span>
      </div>
    );
  }
}

export { ItemEdit };
