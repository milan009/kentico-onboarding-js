import React from 'react';

class ListRow extends React.Component {
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this.props.index);
  }

  onItemClick(index) {
    this.props.onRowClick(index);
  }

  render() {
    return (
      <a href="#" className="list-group-item" onClick={this.onItemClick}>
        {this.props.index}. <span>{this.props.value}</span>
      </a>
    );
  }
}

ListRow.propTypes = {
  value: React.PropTypes.string,
  index: React.PropTypes.number.isRequired,
  onRowClick: React.PropTypes.func.isRequired,
};

export default ListRow;
