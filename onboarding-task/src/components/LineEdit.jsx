import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class LineEdit extends PureComponent {
  static displayName = 'LineEdit';

  static propTypes = {
    line: ImmutablePropTypes.recordOf({
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
      text: this.props.line.text,
    };
  }

  _handleOnChange = (event) => {
    this.setState({ text: event.target.value });
  };

  _handleOnSave = () => {
    this.props.onSave({
      id: this.props.line.id,
      text: this.state.text,
    });
  };

  _handleOnDelete = () => {
    this.props.onDelete(this.props.line.id);
  };

  _handleOnCancel = () => {
    this.props.onCancel(this.props.line.id);
  };

  render() {
    return (
      <div>
        <span className="form-inline">{this.props.index}.
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

export { LineEdit };
