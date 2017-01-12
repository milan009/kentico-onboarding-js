import React, { Component } from 'react';
import Item from './Item';
import assignment from './../../../assignment.gif';

class List extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: [
        { description: 'Make a coffee'},
        { description: 'Make a coffee great again' },
        { description: 'We want you, coffee!'}
      ]
    }
  }

  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">Desired functionality is captured on the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <ul className="list-group">
              { this.state.items.map((item, index) => <Item key={index} index={index + 1} {...item} />) }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
