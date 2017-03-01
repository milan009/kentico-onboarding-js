import React, { PureComponent } from 'react';

class ListItemForm extends PureComponent {

  static propTypes = {
    inputValue: React.PropTypes.string.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired,
    onFormCancelClick: React.PropTypes.func.isRequired,
    onFormDeleteClick: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      input: props.inputValue,
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(event) {
    this.setState({ input: event.target.value });
  }

  _onSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state.input);
  }

  render() {
    return (<form className="form-inline" onSubmit={this._onSubmit}>
      <input
        type="text"
        className="form-control"
        value={this.state.input}
        onChange={this._onChange}
      />
      <button type="submit" className="btn btn-primary"> Change</button>
      <button type="button" className="btn btn-default" onClick={this.props.onFormCancelClick}> Cancel</button>
      <button type="button" className="btn btn-danger" onClick={this.props.onFormDeleteClick}> Delete</button>
    </form>);
  }
}

export { ListItemForm };
