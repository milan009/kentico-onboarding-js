import React = require('react');

interface ICreateListItemProps {
  onListItemAdd: (input: string) => void;
}

interface ICreateListItemState {
  input: string;
}

class CreateListItem extends React.PureComponent<ICreateListItemProps, ICreateListItemState> {

  static displayName = 'CreateListItem';

  constructor(props: ICreateListItemProps) {
    super(props);

    this.state = { input: '' };

    this._onInputChange = this._onInputChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onInputChange(event: any) {
    this.setState({ input: event.target.value });
  }

  _onSubmit(event: any) {
    event.preventDefault();
    this.props.onListItemAdd(this.state.input);

    this.setState({ input: '' });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this._onSubmit} >
        <input type="text" className="form-control" value={this.state.input} placeholder="Add item" onChange={this._onInputChange} />
        <button type="submit" className="btn btn-default" > Add </button>
      </form>
    );
  }
}

export { CreateListItem };
