import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import {IViewItem} from '../viewModels/ViewItem';

interface IItemProps {
  item: IViewItem;
  index: number;
  onListItemClick: (id: string) => void;
}

class Item extends React.PureComponent<IItemProps, undefined> {
  static displayName = 'Item';

  static propTypes = {
    item: ImmutablePropTypes.recordOf({
      id: React.PropTypes.string,
      text: React.PropTypes.string,
    }).isRequired,
    index: React.PropTypes.number.isRequired,
    onListItemClick: React.PropTypes.func.isRequired,
  };

  constructor(props: IItemProps) {
    super(props);
    this._startEditing = this._startEditing.bind(this);
  }

  _startEditing() {
    this.props.onListItemClick(this.props.item.id);
  }

  render() {
    return (
      <div onClick={this._startEditing}>{`${this.props.index + 1}. ${this.props.item.text}`}</div>
    );
  }
}

export { Item };
