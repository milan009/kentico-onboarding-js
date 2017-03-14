import React from 'react';

class CreateItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      error: '',
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleEditText = this._handleEditText.bind(this);
  }

  _handleEditText(event) {
    this.setState({ text: event.target.value });
  }

  _handleSubmit(event) {
    if (this.props.onItemAdd(this.state.text)) {
      this.setState({ text: '' });
    }
    else {
      this.setState({ error: 'Enter non-empty value!' });
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit} className="form-inline">
        <input type="text" className="form-control" value={this.state.text} onChange={this._handleEditText} />
        <input type="submit" className="btn btn-default" value="Add" />
        <br />
        <span style={{ color: 'red' }}>{this.state.error}</span>
      </form>
    );
  }
}

CreateItem.propTypes = { onItemAdd: React.PropTypes.func };

export default CreateItem;
