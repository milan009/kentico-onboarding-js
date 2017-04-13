import * as React from 'react';
const MdWarning = require('react-icons/lib/md/warning');
const MdClose = require('react-icons/lib/md/close');

class ErrorMessage extends React.PureComponent<any, any> {
  static displayName = 'ErrorMessage';

  static propTypes = {
    errorId: React.PropTypes.any.isRequired,
    text: React.PropTypes.string.isRequired,
    onDismissError: React.PropTypes.func.isRequired,
  };

  _onDismiss = () => {
    this.props.onDismissError(this.props.errorId);
  }

  render() {
    return (
      <div className="alert-message">
        <div className="content icon">
          <MdWarning size={24} />
        </div>
        <div className="content message">
          <span>{this.props.text}</span>
        </div>
        <div className="content close-icon close" onClick={this._onDismiss}>
          <MdClose size={20}/>
        </div>
      </div>
    );
  }
}

export { ErrorMessage };
