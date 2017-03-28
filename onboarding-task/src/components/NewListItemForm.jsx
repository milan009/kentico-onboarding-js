import React, { PureComponent, PropTypes } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';

class NewListItem extends PureComponent {
  static displayName = 'NewListItem';

  static propTypes = {
    addFunction: PropTypes.func.isRequired,
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

  _onAddButtonClick = () => {
    this.props.addFunction(this.state.text);

    this.setState({ text: '' });
  };

  render() {
    return (
      <div>
        <Form inline>
          <FormControl value={this.state.text} onChange={this._onInputChange} type="text" />
          <Button onClick={this._onAddButtonClick}>Add</Button>
        </Form>
      </div>
    );
  }
}

export { NewListItem };
