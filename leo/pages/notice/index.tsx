import type { NextPage } from 'next';
import usePagination from '../../hook/usePagination';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import type { INoticeModel } from './type';
import noticeData from '../api/noticeData';
import Link from 'next/link';

const Notice: NextPage = () => {
  // const getData = async (startIndex: number, endIndex: number) => {
  //   return {
  //     list: noticeData.slice(startIndex, endIndex),
  //     count: noticeData.length
  //   }
  // };
  const getData = async (startIndex: number, endIndex: number) => {
    // const response = await fetch('https://backend.dev/friends');
    // const res = await response.json();
    const res = await fetch('https://test.api.com/notice');
    return await res.json();

    // await fetch("/notice")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  }
  const {list, totalListCount, pagination} = usePagination<INoticeModel>(getData);

  return (
    <Layout title='Notice'>
      <Table
        col={['8%','13%','45%','17%','17%']}
        totalListCount={totalListCount}
        columns={
          <tr>
            {['번호', '카테고리', '제목', '작성자', '작성일'].map((item) => (
              <th key={item} className='th'>{item}</th>
            ))}
          </tr>
        }
        rows={
          list.map(({idx, category, title, creator, createdDate}) => (
            <Link key={idx} href={`/notice/${idx}?page=${pagination.activePage}`}>
              <tr className='cursor-pointer'>
                {
                  [idx, category, title, creator, createdDate].map((item) => {
                    const styleName = [
                      'td',
                      item === title ? 'text-left' : 'text-center',
                      item === category && category === '공지' ? 'text-amber-600 font-bold' : 'font-medium'
                    ].join(' ');

                    return (
                      <td key={item} className={styleName}>{item}</td>
                    )
                  })
                }
              </tr>
            </Link>
          ))
        }
      />

      <Pagination {...pagination} />
    </Layout>
  );
};

export default Notice;
