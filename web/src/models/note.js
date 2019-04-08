import { message } from 'antd';
import router from 'umi/router';
import { NOTE_NAMESPACE } from '../actions/note';
import { getParents,getTabs} from '../services/note';

export default {
  namespace: NOTE_NAMESPACE,

  state: {
    parents: [],
    tabs: [],
    tree:{},
  },

  effects: {
    *getParents({ payload }, { call, put }) {
      const parents = yield call(getParents, payload);
      if (parents.success) {
        yield put({
          type: 'setParents',
          payload: {
            list: parents.data,
          },
        });
      }
    },
    *getTabs({ payload }, { call, put }) {
      const tabs = yield call(getTabs, payload);
      if (tabs.success) {
        yield put({
          type: 'setTabs',
          payload: {
            list: tabs.data,
          },
        });
      }
    },
    *getTree({ payload }, { call, put }) {
      const {
        data: { pid },
      } = payload;
      const tree = yield call(getTree, payload);
      if (tree.success) {
        yield put({
          type: 'setTree',
          payload: {
            pid: pid,
            list: tree.data,
          },
        });
      }
    },
  },

  reducers: {
    setParents(state, action) {
      return {
        ...state,
        parents: action.payload.list,
      };
    },
    setTabs(state, action) {
      return {
        ...state,
        tabs: action.payload.list,
      };
    },
    setTree(state, action) {
      state[tree][action.payload.pid]=action.payload.list;
      this.setState(state);
    },
  },
};
