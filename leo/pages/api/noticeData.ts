import notice from '../../mocks/data.json';
import type { INoticeModel } from '../notice/type';

const data = JSON.parse(JSON.stringify(notice));

// export default function handler(request, response) {
//   const {method} = request;
//   if (method === 'GET') {
//     return response.status(200).json({data});
//   }
// }

const orderedData: INoticeModel[] = data.sort((a: INoticeModel, b: INoticeModel): number => b.idx - a.idx);

const noticeArray: INoticeModel[] = [];
const dataArray: INoticeModel[] = [];

orderedData.forEach((item) => {
  if (item.category === '공지') noticeArray.push(item);
  else dataArray.push(item);
});

// export default function handler(request:Request, response: Response) {
//   const { method } = request;
//   if (method === 'GET') {
//     return response.status(200).json([...noticeArray, ...dataArray]);
//   }
// }

const noticeData = [...noticeArray, ...dataArray];

export default noticeData;
