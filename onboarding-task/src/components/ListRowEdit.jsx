import React from 'react';

class ListRowEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  render() {
    return (
      <div className="list-group-item form-inline">
        <div className="form-group">
          {this.props.children}
          <input type="text" className="form-control" defaultValue={this.state.value} />
          <input type="button" className="btn btn-info" value="Save" />
          <input type="button" className="btn btn-default" value="Cancel" />
          <input type="button" className="btn btn-danger" value="Delete" />
        </div>
      </div>
    );
  }
}

ListRowEdit.propTypes = {
  value: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default ListRowEdit;
