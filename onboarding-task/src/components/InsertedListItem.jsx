import React, { PureComponent } from 'react';

class InsertedListItem extends PureComponent {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    editFunction: React.PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }
  _edit = () => {
    this.props.editFunction(this.props.index);
  };
  render() {
    return (
      <div>
        <h5 onClick={this._edit}>{this.props.index + 1}. {this.state.text}</h5>
      </div>
    );
  }
}

export { InsertedListItem };
