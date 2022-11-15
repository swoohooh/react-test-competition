import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import noticeData from '../api/noticeData';
import Link from 'next/link';

const NoticeDetail: NextPage = () => {
  const router = useRouter();
  const noticeIdx = Number(router.query['idx'] || 0);
  const paginationIdx = Number(router.query['page'] || 1);

  const getNoticeIndex = () => noticeData.findIndex((item) => item.idx === noticeIdx);
  const [nowContIndex, setNowContIndex] = useState(getNoticeIndex());

  useEffect(() => {
    setNowContIndex(getNoticeIndex());
  }, [noticeIdx]);

  const nowCont = noticeData[nowContIndex];
  const prevCont = noticeData[nowContIndex + 1];
  const nextCont = noticeData[nowContIndex - 1];

  const moveToPage = (idx?: number) => `/notice${idx ? `/${idx}` : ''}?page=${paginationIdx}`;

  return (
    <Layout>
      <div className='border-y-2 border-solid border-gray-400 text-sm'>
        <div className='flex h-12 items-center justify-between border-b border-solid border-gray-300'>
          <p className='font-bold'>{nowCont?.idx} : {nowCont?.title}</p>
          <p>{nowCont?.creator} | {nowCont?.createdDate}</p>
        </div>

        <div className='py-12 leading-5'>
          {nowCont?.content}
        </div>

        <ul className='border-t border-solid border-gray-300'>
          {[nextCont, prevCont].map((item, index) => {
            const isNext = index === 0;
            const styleClass = ['h-12 px-5 flex items-center cursor-pointer', isNext ? 'border-b border-solid border-gray-300' : ''].join(' ');
            const buttonText = isNext ? '다음' : '이전'
            const iconClass = isNext ? 'xi-angle-up' : 'xi-angle-down'

            return item?.idx && (
              <Link key={item.idx} href={moveToPage(item.idx)}>
                <li className={styleClass}>
                  <p className='w-1/12'><i className={`${iconClass} mr-2`} />{buttonText}</p>
                  <p>{item.idx} : {item.title}</p>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>

      <Link href={moveToPage()}>
        <button className='button text-white bg-gray-500' type='button'>목록</button>
      </Link>
    </Layout>
  );
}

export default NoticeDetail;
