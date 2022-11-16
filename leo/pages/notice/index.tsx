import type { NextPage } from 'next';
import usePagination from '../../hook/usePagination';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import type { INoticeModel } from './type';
import Link from 'next/link';

const Notice: NextPage = () => {
  const getData = (params: Record<string, number>) => {
    const query = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');

    return fetch(`http://localhost:8001/notice?${query}`)
      .then(res => res.json())
      .catch((error) => console.log(error));
  }
  const {list, totalListCount, pagination, isLoading} = usePagination<INoticeModel>(getData);

  return (
    <Layout title='Notice'>
      {isLoading ?
        <p className='text-center h-52 flex items-center justify-center'>로딩 중입니다..</p>
        : (
          <>
            <Table
              col={['8%', '13%', '45%', '17%', '17%']}
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
          </>
        )}
    </Layout>
  );
};

export default Notice;
