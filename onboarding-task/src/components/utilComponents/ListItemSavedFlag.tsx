import * as React from 'react';
import * as classNames from 'classnames';

interface ListItemSavedFlagProps {
  readonly saved: boolean;
}

const ListItemSavedFlag = ({ saved }: ListItemSavedFlagProps) => {
  const style = {
    color: saved ? 'green' : 'orange',
  };
  const className = classNames('glyphicon', saved ? 'glyphicon-cloud' : 'glyphicon-alert');
  const tooltip = saved ? 'Item is saved in database.' : 'Item is not saved in database.';

  return (
  <span title={tooltip}>
    <span className={className} style={style} />
  </span>
  );
};

export { ListItemSavedFlag };
