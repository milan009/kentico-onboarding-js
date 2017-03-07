import * as React from 'react';
import { PropTypes } from 'react';

interface IAddItemProps {
  onItemAdd: (text: string) => void;
}

interface IAddItemState {
  text: string;
}

class AddItem extends React.PureComponent<IAddItemProps, IAddItemState> {
  static displayName = 'AddItem';
  static propTypes = {
    onItemAdd: PropTypes.func.isRequired,
  };

  constructor(props: IAddItemProps) {
    super(props);
    this.state = { text: '' };

    this._onInputChange = this._onInputChange.bind(this);
    this._createNewItem = this._createNewItem.bind(this);
  }

  _onInputChange(e: any) {
    this.setState({ text: e.target.value });
  }

  _createNewItem() {
    if(this.state.text !== '') {
      this.props.onItemAdd(this.state.text);
    }
    this.setState({ text: '' });
  }

  render() {
    return (
      <tr>
        <td>
          <div className="form-inline">
            <div className="form-group">
              <input className="form-control" type="text" value={this.state.text} onChange={this._onInputChange} />
            </div>
            <div className="form-group">
              <input className="btn btn-default" type="button" value="Add" onClick={this._createNewItem} />
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export { AddItem };

