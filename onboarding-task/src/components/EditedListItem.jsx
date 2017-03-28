import React, { PureComponent } from 'react';
import { Button, FormControl, ControlLabel, Form } from 'react-bootstrap';

class EditedListItem extends PureComponent {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    saveFunction: React.PropTypes.func.isRequired,
    deleteFunction: React.PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }
  _onInputChange = (e) => {
    this.setState({ text: e.target.value });
  };
  _save = () => {
    this.props.saveFunction(this.props.index, this.state.text);
  };
  _cancel = () => {
    // this.setState({ text: this.props.text });
    this.props.saveFunction(this.props.index, this.props.text);
  };
  _delete = () => {
    this.props.deleteFunction(this.props.index);
  };
  render() {
    return (
      // TODO make numbers consistent
      <div>
        <Form inline>
          <ControlLabel>{this.props.index + 1}.</ControlLabel>
          <FormControl value={this.state.text} onChange={this._onInputChange} />
          <Button onClick={this._save} bsStyle="primary">Save</Button>
          <Button onClick={this._cancel}>Cancel</Button>
          <Button onClick={this._delete} bsStyle="danger">Delete</Button>
        </Form>
      </div>
    );
  }
}

export { EditedListItem };
