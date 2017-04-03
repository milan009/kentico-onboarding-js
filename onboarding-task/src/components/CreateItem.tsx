import * as React from 'react';
import { validateItemText } from '../utils/itemValidator';
import { Input } from './Input';

interface ICreateItemProps {
  onItemAdd: (text: string) => void;
}

interface ICreateItemState {
  text: string;
  isAddDisabled: boolean;
}

class CreateItem extends React.PureComponent<ICreateItemProps, ICreateItemState> {
  static displayName = 'CreateItem';
  static propTypes = {
    onItemAdd: React.PropTypes.func.isRequired,
  };

  constructor(props: ICreateItemProps) {
    super(props);

    this.state = {
      text: '',
      isAddDisabled: true,
    };
  }

  _onTextChange = (value: string, isValid: boolean) => {
    this.setState({
      text: value,
      isAddDisabled: !isValid,
    });
  };

  _handleSubmit = (event: any) => {
    event.preventDefault();
    const text = this.state.text;
    this.props.onItemAdd(text);

    this.setState({
      text: '',
      isAddDisabled: true,
    });
  };

  render() {
    return (
      <form onSubmit={this._handleSubmit} className="form-inline">
        <Input value={this.state.text} onChange={this._onTextChange} validate={validateItemText} />
        <button type="submit" className="btn btn-default" disabled={this.state.isAddDisabled}>Add</button>
      </form>
    );
  }
}

export { CreateItem };
