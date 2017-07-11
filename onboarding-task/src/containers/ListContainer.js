import { connect } from 'react-redux';
import { ListComponent } from '../components/List';

const buildItems = (itemsData, itemsLocal) => (
  itemsData.map((item, key) => ({
    id: item.get('id'),
    text: item.get('text'),
    isEdited: (itemsLocal.get(key).get('isEdited')),
  })));

const mapStateToProps = (state) => ({
  items: buildItems(state.appState.listState.items, state.appState.localState.itemsLocal),
});

const ListContainer = connect(mapStateToProps)(ListComponent);
export { ListContainer as List };
