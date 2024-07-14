import { http } from 'msw';

export const handlers = [
  http.post('https://api.example.com/items', (req, res, ctx) => {
    const { search } = req.body as { search: string };
    return res(
      ctx.json({
        items: search
          ? [
              {
                id: '1',
                name: `${search} Item 1`,
                description: 'Description 1',
              },
              {
                id: '2',
                name: `${search} Item 2`,
                description: 'Description 2',
              },
            ]
          : [],
      }),
    );
  }),
];
