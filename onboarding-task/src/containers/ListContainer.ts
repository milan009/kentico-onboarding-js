import * as React from 'react';
import { connect } from 'react-redux';
import { List } from '../components/List';
import { addItem } from '../actionCreators/actionCreators';
import { IAppState } from '../reducers/IAppState';
import { TDispatch } from '../stores/TDispatch';
import { IListDataProps, IListCallbackProps } from '../components/List';

interface IListContainerProps {}

const mapStateToProps = (state: IAppState): IListDataProps => ({
  itemIds: state.itemIds,
});

const mapDispatchToProps = (dispatch: TDispatch): IListCallbackProps => ({
  onAddItem: (text: string) => dispatch(addItem(text)),
});

const ListContainer: React.ComponentClass<IListContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export { ListContainer as List };
