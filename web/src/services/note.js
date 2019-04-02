import { stringify } from 'qs';
import request from '../utils/request';
import func from '../utils/Func';

// =====================笔记===========================


export async function getParents(params) {
  console.log(123)
  return request('/api/note/parents');
}

