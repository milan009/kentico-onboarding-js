import * as React from 'react';

interface ListItemSavedFlagProps {
  saved: boolean;
}

const ListItemSavedFlag = ({ saved }: ListItemSavedFlagProps) => {
  const style = {
    color: saved ? 'green' : 'orange',
  }
  return <span><span className={saved ? 'glyphicon glyphicon-cloud' : 'glyphicon glyphicon-alert'} style={style}></span></span>;
}

export { ListItemSavedFlag };
