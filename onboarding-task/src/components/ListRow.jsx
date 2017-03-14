import React from 'react';

class ListRow extends React.Component {
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(event) {
    this.props.onItemClick(this.props.item.id);
    event.preventDefault();
  }

  render() {
    return (
      <a href="#" className="list-group-item" onClick={this.onItemClick}>
        {this.props.children}<span>{this.props.item.text}</span>
      </a>
    );
  }
}

ListRow.propTypes = {
  item: React.PropTypes.object.isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
};

export default ListRow;
