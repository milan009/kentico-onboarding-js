import React, {
  PureComponent,
  PropTypes,
} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ListRowDisplay } from './ListRowDisplay.jsx';
import { ListRowEdit } from './ListRowEdit';

class ListRow extends PureComponent {
  static displayName = 'ListRow';
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string,
      text: PropTypes.string,
      editing: PropTypes.bool,
    }).isRequired,
    onItemClick: PropTypes.func.isRequired,
    onItemUpdate: PropTypes.func.isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onItemCancel: PropTypes.func.isRequired,
  };

  render() {
    if (this.props.item.editing) {
      return (
        <ListRowEdit
          index={this.props.index}
          item={this.props.item}
          onItemUpdate={this.props.onItemUpdate}
          onItemDelete={this.props.onItemDelete}
          onItemCancel={this.props.onItemCancel}
        />
      );
    }
    return (
      <ListRowDisplay
        index={this.props.index}
        item={this.props.item}
        onItemClick={this.props.onItemClick}
      />
    );
  }
}

export { ListRow };
