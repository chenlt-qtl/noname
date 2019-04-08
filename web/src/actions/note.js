export const NOTE_NAMESPACE = 'note';

export function NOTE_INIT(user) {
  return {
    type: `${NOTE_NAMESPACE}/noteInit`,
    payload: {user},
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
