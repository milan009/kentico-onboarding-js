import React, { Component } from 'react';

class ListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edited: false,
      text: undefined,
    };
  }


  render() {
    return (
      <div className="row">
        <li>{ this.state.value }</li>
      </div>
    );
  }
}

export { ListItem };
