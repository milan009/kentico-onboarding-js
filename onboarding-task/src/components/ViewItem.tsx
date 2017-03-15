import * as React from 'react';

interface IAddItemProps {
  onClick: () => void;
  value: string;
  index: number;
}

class ViewItem extends React.PureComponent<IAddItemProps, undefined> {
  static displayName = 'ViewItem';

  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
  };

  constructor(props: IAddItemProps) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.index}. {this.props.value}
      </div>
    );

  }
}

export { ViewItem };
