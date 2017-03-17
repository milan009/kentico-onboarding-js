import React, { Component } from 'react';
import assignment from './../../../assignment.gif';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
    };
    this.handleAddLine = this.handleAddLine.bind(this);
  }
  handleAddLine(event) {
    this.setState({ lines: event.target });
    let data = this.state.data;
    const id = this.generateId().toString();
    const complete = 'false';
    data = data.concat([{ id, event, complete }]);
    this.setState({ data });
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">The desired functionality is captured in the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make the solution easily extensible (e.g. more displayed fields per item).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
              {/* // TODO: implement the list here :) */}
            <ul id="todo-list" className="list-group">
              <Line />
              <li className="list-group-item">
                <input />
                <button type="button" className="btn btn-default" onClick={this.handleAddLine}>Add</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: false,
      text: 'superb',
      prevText: 'superb',
      number: props.number,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }
  handleChange(event) {
    this.setState({ text: event.target.value });
  }
  handleClickSave(event) {
    this.setState(
      {
        isEdited: false,
        prevText: this.state.text,
      }
    );
  }
  handleClickCancel(event) {
    this.setState(
      {
        isEdited: false,
        text: this.state.prevText,
      }
    );
  }

  handleDoubleClick(event) {
    this.setState(
      {
        isEdited: true,
      }
    );
  }

  render() {
    return (
      <li className="list-group-item" onDoubleClick={this.handleDoubleClick} >
        <span> {this.state.number} </span>
        <LineText isEdited={this.state.isEdited} text={this.state.text} onChange={this.handleChange} />
        {this.state.isEdited === true ?
          <span>
            <button type="button" className="btn btn-primary" onClick={this.handleClickSave} >Save</button>
            <button type="button" className="btn btn-default" onClick={this.handleClickCancel} >Cancel</button>
            <button type="button" className="btn btn-danger">Delete</button>
          </span> : null}
      </li>
    );
  }
}

Line.propTypes = {
  number: React.PropTypes.number.isRequired,
};

function LineText(props) {
  const isEdited = props.isEdited;
  if (isEdited) {
    return (
      <input className="" value={props.text} onChange={props.onChange} />
    );
  }
  return <span onDoubleClick={props.onDoubleClick}> {props.text} </span>;
}

LineText.propTypes = {
  isEdited: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.isRequired,
  onDoubleClick: React.PropTypes.isRequired,
};


/* function LineText(props) {
 const isEdited = props.isEdited;
 let type = isEdited ? 'input' : 'text';
 return <input type={type}> Make coffee </input>;
 } */

/*
class Line extends Component {
  render() {
      let aline = null;
      <li className="list-group-item">
        this.id
        if(isClicked) {
          return <TodoInput />
      } else {
          return <TodoText text=this.text />
      }

      </li>
  }
}

function TodoText(props){
  return(
    <p>props.text;</p>
  );
}

function TodoInput(props){
  return(
    <input />
    <button type="button" className="btn btn-default btn-primary">
    Save
    </button>
    <button type="button" className="btn btn-default">
    Cancel
    </button>
    <button type="button" className="btn btn-default btn-danger">
    Delete
    </button>
  );
}
*/

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default List;
