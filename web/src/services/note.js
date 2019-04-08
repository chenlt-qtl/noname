import { stringify } from 'qs';
import request from '../utils/request';

// =====================笔记===========================


export async function getParents(params) {
  return request('/api/note/parents');
}


export async function getTabs(params) {
  return request('/api/note/tabs');
}

export async function getTree(params) {
  return request(`/api/note/tree?${stringify(params)}`);
}
