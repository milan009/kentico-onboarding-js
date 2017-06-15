import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {

  constructor(props) {
    super(props);
   // console.log(props);
    this.state = {
      beingEdited: false,
      text: props.text || undefined,
      newText: props.text || undefined,
    };
  }


  _startEditing() {
    if (!this.state.beingEdited) {
      this.setState({ beingEdited: true });
    }
  }

  _cancelEditing() {
    if (this.state.beingEdited) {
      this.setState({ beingEdited: false });
    }
  }

  _drawElements() {
    if (this.state.beingEdited) {
      return (
        <span>
          <input type="text" defaultValue={this.state.text} onChange={(e) => this.setState({ newText: e.target.value })} />
          <button
            className="btn-info"
            onClick={() => {
              this.setState({ text: this.state.newText });
              this._cancelEditing();
            }}
          >Save</button>
          <button className="btn-default" onClick={() => this._cancelEditing()}>Cancel</button>
          <button
            className="btn-danger"
            onClick={() => this.props.removeFunction(this.props.itemId)}
          >Delete</button>
        </span>
      );
    }

    return <span>{this.state.text}</span>;
  }

  render() {
    return (
      <div className="row">
        <li onClick={() => this._startEditing()}>
          {this._drawElements()}
        </li>
      </div>
    );
  }
}

ListItem.propTypes = {
  text: PropTypes.string,
  itemId: PropTypes.number,
  removeFunction: PropTypes.func,
};

export { ListItem };
