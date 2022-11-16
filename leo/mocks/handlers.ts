import { rest } from 'msw';
import { INoticeModel } from '../pages/notice/type';
import data from './data.json';

export interface NoticeResponse {
  list: INoticeModel,
  count: number
}

export const getNoticeData = () => {
  const orderedData: INoticeModel[] = data.sort((a: INoticeModel, b: INoticeModel): number => b.idx - a.idx);
  const noticeArray: INoticeModel[] = [];
  const dataArray: INoticeModel[] = [];

  orderedData.forEach((item) => {
    if (item.category === '공지') noticeArray.push(item);
    else dataArray.push(item);
  });

  return [...noticeArray, ...dataArray];
}

export const handlers = [
  rest.get<NoticeResponse>('http://localhost:8001/notice', (req, res, ctx) => {
    const startIndex = Number(req.url.searchParams.get('start')) || 0;
    const endIndex = Number(req.url.searchParams.get('end')) || 0;

    const noticeData = getNoticeData();

    return res(
      ctx.status(200),
      ctx.json({
        list: noticeData.slice(startIndex, endIndex),
        count: noticeData.length
      })
    );
  }),
  rest.get<INoticeModel>('http://localhost:8001/notice/[%d]', (req, res, ctx) => {
    console.log('detail');
    return res(
      ctx.status(200),
      ctx.json(data[0]),
    )
  })
]
