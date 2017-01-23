import * as ReactRedux from 'react-redux';
import VisibleList from '../components/List';

const mapStateToProps = state => state;

const mapDispatchToProps = () => ({});

const List = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps,
)(VisibleList);

export default List;
