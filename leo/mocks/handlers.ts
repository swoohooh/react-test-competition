import { rest } from 'msw';
import { INoticeModel } from '../pages/notice/type';
import data from './data.json';

export interface NoticeResponse {
  list: INoticeModel,
  count: number
}

export const handlers = [
  rest.get<NoticeResponse>('https://test.api.com/notice', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        list: data,
        count: data.length
      })
    );
  }),
  rest.get<INoticeModel>('https://test.api.com/notice/1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(data[0]),
    )
  })
]
