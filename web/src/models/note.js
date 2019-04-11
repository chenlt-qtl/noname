import { message } from 'antd';
import router from 'umi/router';
import { NOTE_NAMESPACE } from '../actions/note';
import { getParents,getTabs,getTree,getNote} from '../services/note';

export default {
  namespace: NOTE_NAMESPACE,

  state: {
    selectValue: undefined,
    selectData:[],
    tabValue: undefined,
    tabData: [],
    treeValue: undefined,
    treeData: [],
    noteData: {},
  },

  effects: {
    *noteInit({ payload }, { call, put }) {
      const parents = yield call(getParents, payload);
      if (parents.success) {
        const selectValue = parents.data?parents.data[0]['id']:undefined;
        yield put({
          type: 'setParents',
          payload: {
            list: parents.data,
            value: selectValue,
          },
        });
        yield put({type: 'getTabs',payload: {selectValue}});
      }
    },
    *getTabs({ payload }, { call, put }) {
      const tabs = yield call(getTabs, payload);
      if (tabs.success) {
        const tabValue = tabs.data?tabs.data[0]['id']:undefined;
        yield put({
          type: 'setTabs',
          payload: {
            list: tabs.data,
            value:tabValue,
          },
        });
        yield put({type: 'getTree',payload: {pid:tabValue}});
      }
    },
    *getTree({ payload }, { call, put }) {
      const tree = yield call(getTree, payload);
      if (tree.success) {
        yield put({
          type: 'setTree',
          payload: {
            list: tree.data,
          },
        });
      }
    },
    *getNote({ payload }, { call, put }) {
      const note = yield call(getNote, payload);
      if (note.success) {
        yield put({
          type: 'setNote',
          payload: {
            data: note.data,
          },
        });
      }
    },
  },

  reducers: {
    setParents(state, action) {
      return {
        ...state,
        selectData: action.payload.list,
        selectValue: action.payload.value,
      };
    },
    setTabs(state, action) {
      return {
        ...state,
        tabData: action.payload.list,
        tabValue: action.payload.value,
      };
    },
    setTree(state, action) {
      return {
        ...state,
        treeData: action.payload.list,
      };
    },
    setNote(state, action) {
      return {
        ...state,
        noteData: action.payload.data,
      };
    },
  },
};
