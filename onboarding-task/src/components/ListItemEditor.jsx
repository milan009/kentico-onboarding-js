import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItemEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: props.text || undefined,
    };
  }

  _drawElements() {
    return (
      <span>
        <input className="inp" type="text" value={this.state.text} onChange={(e) => this.setState({ text: e.target.value })} />
        <button
          className="btn btn-primary"
          onClick={() => this.props.saveChange(this.props.uid, this.state.text)}
        >Save</button>
        <button className="btn btn-default" onClick={() => this.props.toggleEdit(this.props.uid)}>Cancel</button>
        <button
          className="btn btn-danger"
          onClick={() => this.props.removeElement(this.props.uid)}
        >Delete</button>
      </span>
    );
  }


  render() {
    return (
      <div className="row">
        <li>
          {this._drawElements()}
        </li>
      </div>
    );
  }
}

ListItemEditor.propTypes = {
  text: PropTypes.string,
  uid: PropTypes.number,
  removeElement: PropTypes.func,
  toggleEdit: PropTypes.func,
  saveChange: PropTypes.func,
};

export { ListItemEditor };
