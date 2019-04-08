export const NOTE_NAMESPACE = 'note';

export function GET_PARENTS() {
  return {
    type: `${NOTE_NAMESPACE}/getParents`,
    payload: {},
  };
}

export function GET_TABS(pid) {
  return {
    type: `${NOTE_NAMESPACE}/getTabs`,
    payload: {pid},
  };
}

export function GET_TREE(pid) {
  return {
    type: `${NOTE_NAMESPACE}/getTree`,
    payload: {pid},
  };
}
