import React, { PureComponent } from 'react';
import { Button, FormControl, FormGroup, Form } from 'react-bootstrap';

class NewListItem extends PureComponent {
  static propTypes = {
    addFunction: React.PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  _onInputChange = (e) => {
    this.setState({ text: e.target.value });
  };
  _add = () => {
    this.props.addFunction(this.state.text); // TODO rename addFunction
    this.setState({ text: '' });
  };
  render() {
    return (
      <div>
        <Form inline>
          {'  '}
          <FormControl value={this.state.text} onChange={this._onInputChange} type="text" />
          <Button onClick={this._add}>Add</Button>
        </Form>
      </div>
    );
  }
}

export { NewListItem };
