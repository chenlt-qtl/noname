import { delay } from 'roadhog-api-doc';

const proxy = {
  'GET /api/note/parents': {
    code: 200,
    data: {
      total: 5,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 2,
      records: [
        {
          id: '1',
          title: '博客标题1',
        },
        {
          id: '2',
          title: '博客标题2',
        },
        {
          id: '3',
          title: '博客标题3',
        },
        {
          id: '4',
          title: '博客标题4',
        },
        {
          id: '5',
          title: '博客标题5',
        },
      ],
    },
    message: 'success',
    success: true,
  },
};

export default delay(proxy, 500);
