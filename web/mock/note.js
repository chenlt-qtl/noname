import { delay } from 'roadhog-api-doc';

const proxy = {
  'GET /api/note/parents': {
    code: 200,
    data: [
        {
          id: '1',
          title: '笔记本1',
        },
        {
          id: '2',
          title: '笔记本2',
        },
        {
          id: '3',
          title: '笔记本3',
        },
        {
          id: '4',
          title: '笔记本4',
        },
        {
          id: '5',
          title: '笔记本5',
        },
    ],
    message: 'success',
    success: true,
  },
  'GET /api/note/tabs': {
    code: 200,
    data: [
      {
        id: '1',
        title: '笔记1',
      },
      {
        id: '2',
        title: '笔记2',
      },
      {
        id: '3',
        title: '笔记3',
      },
      {
        id: '4',
        title: '笔记4',
      },
      {
        id: '5',
        title: '笔记5',
      },
    ],
    message: 'success',
    success: true,
  },
  'GET /api/note/tree': {
    code: 200,
    data: [
      {
        id: '1',
        title: 'test1',
        children: [
          {
            id: '2',
            title: 'test2',
          },
        ],
      },
      {
        id: '3',
        title: 'test3',
        children: [
          {
            id: '4',
            title: 'test4',
          },
          {
            id: '5',
            title: 'test5',
          },
          {
            id: '6',
            title: 'test6',
          },
        ],
      },
    ],
    message: 'success',
    success: true,
  },
};

export default delay(proxy, 500);
