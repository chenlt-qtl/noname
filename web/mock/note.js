import { delay } from 'roadhog-api-doc';

function getParents(req, res){
  const json = {
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
  };
  return res.json(json);
}

function getTabs(req, res) {
  const json = {
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
  }
  return res.json(json);
}
function getTree(req, res) {
  console.log(req);
  const json = {
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
            children: [
                {
                  id: '7',
                  title: 'test7',
                }
              ]
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
  }
  return res.json(json);
};

const proxy = {
  'GET /api/note/parents': getParents,
  'GET /api/note/tabs': getTabs,
  'GET /api/note/tree': getTree,
};
export default delay(proxy, 500);
