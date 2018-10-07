import Component from '@ember/component';
import {connect} from 'ember-redux';
import {
  getLoading,
  getReplacedListByPage,
  getReplacedListPageCount,
  getReplacedListPageSize,
  getReplacedListPageIndex,
} from '../redux/selectors/replace';
import {getUsersList} from '../redux/selectors/users';
import {gotoReplacedListPage} from '../redux/actions/replace';
import {getPMList} from '../redux/selectors/pm';
import {getEquipmentList} from '../redux/selectors/equipment';

class ReplacedContainer extends Component {}

const stateToComputed = state => {
  return {
    replacedList: getReplacedListByPage(state),
    isLoading: getLoading(state),
    workerList: getUsersList(state),
    pageCount: getReplacedListPageCount(state),
    pageIndex: getReplacedListPageIndex(state),
    pageSize: getReplacedListPageSize(state),
    pmList: getPMList(state),
    equipmentList: getEquipmentList(state)
  }
};

const dispatchToActions = dispatch => {
  return {
    gotoPage: (pageIndex) => dispatch(gotoReplacedListPage(pageIndex)),
  }
};

export default connect(
  stateToComputed,
  dispatchToActions,
)(ReplacedContainer);
