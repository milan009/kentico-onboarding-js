import React, { PureComponent } from 'react';

class InsertedListItem extends PureComponent {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    editFunction: React.PropTypes.func.isRequired,
  };

  _edit = () => {
    this.props.editFunction(this.props.index);
  };

  render() {
    return (
      <div>
        <h5 onClick={this._edit}>{this.props.index + 1}. {this.props.text}</h5>
      </div>
    );
  }
}

export { InsertedListItem };
