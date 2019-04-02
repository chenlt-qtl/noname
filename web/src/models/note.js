import { message } from 'antd';
import router from 'umi/router';
import { NOTE_NAMESPACE } from '../actions/note';
import { getParents as parents } from '../services/note';

export default {
  namespace: NOTE_NAMESPACE,

  state: {
    parents: [],
    currentUser: {},
  },

  effects: {
    *getParents({ payload }, { call, put }) {
      const parents = yield call(parents, payload);
      if (parents.success) {
        yield put({
          type: 'parents',
          payload: {
            list: parents.data,
          },
        });
      }
    },
  },

  reducers: {
    parents(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },
  },
};
