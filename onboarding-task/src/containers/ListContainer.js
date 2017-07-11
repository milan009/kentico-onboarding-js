import { connect } from 'react-redux';
import { ListComponent } from '../components/List';

const buildItems = (itemsData, itemsInfo) => (
  itemsData.map((item, key) => ({
    id: key,
    text: item.get('text'),
    isEdited: (itemsInfo.get(key).get('isEdited')),
  })));

const mapStateToProps = (state) => ({
  items: buildItems(state.appState.listState.items, state.appState.localState.itemInfos),
});

const ListContainer = connect(mapStateToProps)(ListComponent);
export { ListContainer as List };
