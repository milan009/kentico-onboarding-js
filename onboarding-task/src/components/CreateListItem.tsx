import * as React from 'react';

import { ListItemValidatedInput } from './utilComponents/ListItemValidatedInput';
import { isValid } from '../utils/validationHelpers/itemValidationHelpers';

interface ICreateListItemProps {
  readonly onListItemAdd: (input: string) => void;
}

interface ICreateListItemState {
  readonly input: string;
  readonly showError: boolean;
}

class CreateListItem extends React.PureComponent<ICreateListItemProps, ICreateListItemState> {

  static displayName = 'CreateListItem';

  constructor(props: ICreateListItemProps) {
    super(props);

    this.state = {
      input: '',
      showError: false,
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
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
        <button type="submit" className="btn btn-default" disabled={!isValid(this.state.input)} > Add </button>
      </form>
    );
  }
}

export { CreateListItem };
