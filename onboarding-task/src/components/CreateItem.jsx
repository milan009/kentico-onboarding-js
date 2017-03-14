import React from 'react';

class CreateItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      error: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    if (this.props.onItemAdded(this.state.text)) {
      this.setState({ text: '' });
    }
    else {
      this.setState({ error: 'Enter non-empty value!' });
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="list-group-item form-inline">
        <form onSubmit={this.handleSubmit} className="form-group">
          <div className="form-group">
            <input type="text" className="form-control" value={this.state.text} onChange={this.handleChange} />
            <input type="submit" className="btn btn-default" value="Add" />
            <br />
            <span style={{ color: 'red' }}>{this.state.error}</span>
          </div>
        </form>
      </div>
    );
  }
}

CreateItem.propTypes = { onItemAdded: React.PropTypes.func };

export default CreateItem;
