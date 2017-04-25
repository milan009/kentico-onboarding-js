import React, { PureComponent, PropTypes } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap';

class ItemForm extends PureComponent {
  static displayName = 'NewListItem';

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
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
    this.props.onAdd(this.state.text);

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

export { ItemForm }; // TODO inconsistent name
