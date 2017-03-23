import React, {
  PureComponent,
  PropTypes,
} from 'react';
import { ListRowDisplay } from './ListRowDisplay.jsx';
import { ListRowEdit } from './ListRowEdit.jsx';

class ListRow extends PureComponent {
  static displayName = 'ListRow';
  static propTypes = {
    item: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onItemUpdate: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onItemCancel: PropTypes.func.isRequired,
  };

  render() {
    if (this.props.item.editing) {
      return (
        <ListRowEdit
          item={this.props.item}
          onItemUpdate={this.props.onItemUpdate}
          onItemDelete={this.props.onItemDelete}
          onItemCancel={this.props.onItemCancel}
        />
      );
    }
    return (
      <ListRowDisplay
        item={this.props.item}
        onItemClick={this.props.onItemClick}
      />
    );
  }
}

export { ListRow };
