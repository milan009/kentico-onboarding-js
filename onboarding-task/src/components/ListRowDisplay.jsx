import React, {
  PureComponent,
  PropTypes,
} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ListRowDisplay extends PureComponent {
  static displayName = 'ListRowDisplay';
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.recordOf({
      id: PropTypes.string,
      text: PropTypes.string,
      editing: PropTypes.bool,
    }).isRequired,
    onItemClick: PropTypes.func.isRequired,
  };

  _onItemClick = (event) => {
    event.preventDefault();
    this.props.onItemClick(this.props.item.id);
  };

  render() {
    return (
      <div className="item-active" onClick={this._onItemClick}>
        {this.props.index}. <span>{this.props.item.text}</span>
      </div>
    );
  }
}

export { ListRowDisplay };
