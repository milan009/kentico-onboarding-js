import * as React from 'react';

interface ListItemSavedFlagProps {
  saved: boolean;
}

const ListItemSavedFlag = ({ saved }: ListItemSavedFlagProps) =>
  <span><span className={saved ? 'glyphicon glyphicon-cloud' : 'glyphicon glyphicon-alert'}></span></span>;

export { ListItemSavedFlag };
