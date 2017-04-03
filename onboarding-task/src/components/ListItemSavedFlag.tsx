import * as React from 'react';

interface ListItemSavedFlagProps {
  readonly saved: boolean;
}

const ListItemSavedFlag = ({ saved }: ListItemSavedFlagProps) => {
  const style = {
    color: saved ? 'green' : 'orange',
  };
  const tooltip = saved ? 'Item is saved in database.' : 'Item is not saved in database.';
  return <span title={tooltip}><span className={saved ? 'glyphicon glyphicon-cloud' : 'glyphicon glyphicon-alert'} style={style}></span></span>;
};

export { ListItemSavedFlag };
