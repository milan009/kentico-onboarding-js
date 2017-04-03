import React = require('react');

interface ListItemValidatedInputProps {
  readonly onInputChange: (input: string) => void;
  readonly input: string;
}

interface ListItemValidatedInputState {
  readonly showError: boolean;
}

class ListItemValidatedInput extends React.PureComponent<ListItemValidatedInputProps, ListItemValidatedInputState> {

  static displayName = 'ListItemValidatedInput';

  constructor(props: ListItemValidatedInputProps) {
    super(props);

    this.state = {
      showError: false,
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._isValid = this._isValid.bind(this);
    this._onFocusIn = this._onFocusIn.bind(this);
    this._onFocusOut = this._onFocusOut.bind(this);
  }

  _isValid(input: string) {
    return input !== '';
  }

  _onInputChange(event: any) {
    this.props.onInputChange(event.target.value);
  }

  _onFocusIn() {
    this.setState({ showError: true });
  }

  _onFocusOut() {
    this.setState({ showError: false });
  }

  render() {
    const groupErrorClass = (this._isValid(this.props.input) ? 'has-success' : 'has-error') + ' has-feedback';
    const formGroup = 'form-group col-md-3 ' + (this.state.showError ? groupErrorClass : '');
    const glyphiconFeedback = 'glyphicon ' + ( this._isValid(this.props.input) ? 'glyphicon-ok' : 'glyphicon-remove' ) + ' form-control-feedback';
    return (
        <div className={formGroup} >
          <input
            type="text"
            className="form-control"
            value={this.props.input}
            placeholder="Add item"
            onChange={this._onInputChange}
            onFocus={this._onFocusIn}
            onBlur={this._onFocusOut}
            aria-describedby="inputSuccess4Status"
          />
          {this.state.showError && <span className={glyphiconFeedback} aria-hidden={true}></span>}
          <span id="inputSuccess4Status" className="sr-only">(success)</span>
        </div>
    );
  }
}

export { ListItemValidatedInput };
