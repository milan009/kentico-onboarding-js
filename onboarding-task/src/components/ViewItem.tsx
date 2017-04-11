import * as React from 'react';

interface IAddItemProps {
  onClick: () => void;
  value: string;
  index: number;
}

const ViewItem: React.StatelessComponent<IAddItemProps> = (props) => (
  <div onClick={props.onClick}>
    {props.index}. {props.value}
  </div>
);

ViewItem.displayName = 'ViewItem';

ViewItem.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
};

export { ViewItem };
