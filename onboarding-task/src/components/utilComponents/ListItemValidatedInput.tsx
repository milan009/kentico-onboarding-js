import * as React from 'react';
import * as classNames from 'classnames';

import { isValid } from '../../utils/validationHelpers';

interface ListItemValidatedInputProps {
  readonly onInputChange: (input: string) => void;
  readonly input: string;
}

interface ListItemValidatedInputState {
  readonly showError: boolean;
}

class ListItemValidatedInput extends React.PureComponent<ListItemValidatedInputProps, ListItemValidatedInputState> {

  static displayName = 'ListItemValidatedInput';

  private isValid = isValid(this.props.input);

  constructor(props: ListItemValidatedInputProps) {
    super(props);

    this.state = {
      showError: false,
    };

    this._onInputChange = this._onInputChange.bind(this);
    this._onFocusIn = this._onFocusIn.bind(this);
    this._onFocusOut = this._onFocusOut.bind(this);
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
    const groupErrorClass = classNames('has-feedback', {
      'has-success': this.isValid ,
      'has-error': !this.isValid
    });
    const formGroupClass = classNames('form-group col-md-3 ', { [groupErrorClass]: this.state.showError });
    const glyphiconFeedbackClass = classNames(
      'glyphicon',
      isValid(this.props.input) ? 'glyphicon-ok' : 'glyphicon-remove',
      'form-control-feedback'
    );
    return (
        <div className={formGroupClass} >
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
          {this.state.showError && <span className={glyphiconFeedbackClass} aria-hidden={true}></span>}
          <span id="inputSuccess4Status" className="sr-only">(success)</span>
        </div>
    );
  }
}

export { ListItemValidatedInput };
