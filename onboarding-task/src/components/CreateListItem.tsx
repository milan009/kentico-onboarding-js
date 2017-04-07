import React = require('react');
import {ListItemValidatedInput} from './utilComponents/ListItemValidatedInput';

interface ICreateListItemDataProps {
  readonly onListItemAdd: (input: string) => void;
}

interface ICreateListItemState {
  readonly input: string;
  readonly showError: boolean;
}

class CreateListItem extends React.PureComponent<ICreateListItemDataProps, ICreateListItemState> {

  static displayName = 'CreateListItem';

  constructor(props: ICreateListItemDataProps) {
    super(props);

    this.state = {
      input: '',
      showError: false,
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._isValid = this._isValid.bind(this);
  }

  _isValid(input: string) {
    return input !== '';
  }

  _onInputChange(input: string) {
    this.setState({ input });
  }

  _onSubmit(event: any) {
    event.preventDefault();
    this.props.onListItemAdd(this.state.input);

    this.setState({ input: '' });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this._onSubmit} >
        <ListItemValidatedInput onInputChange={this._onInputChange} input={this.state.input} />
        <button type="submit" className="btn btn-default" disabled={!this._isValid(this.state.input)} > Add </button>
      </form>
    );
  }
}

export { CreateListItem };
