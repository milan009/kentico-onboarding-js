import React, {
  PureComponent,
  PropTypes,
} from 'react';

class ListRowDisplay extends PureComponent {
  static displayName = 'ListRowDisplay';
  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
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
