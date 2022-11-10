import type { NextPage } from 'next';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import notice_data from '../api/notice_data.json';
import usePagination from '../../hook/usePagination';

const Container = styled.div`
  max-width: 1000px;
  padding: 100px 0;
  margin: 0 auto;
`;
const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;
const Count = styled.p`
  margin-bottom: 10px;
  font-size: 14px;

  span {
    font-weight: bold;
  }
`;
const Table = styled.table`
  border: 2px solid #666;
  border-left: 0;
  border-right: 0;
  font-size: 13px;
  text-align: center;
  
  th,
  td {
    height: 50px;
    padding: 5px;
    border-bottom: 1px solid #cfcfcf;
  }
  
  th {
    font-weight: bold;
  }
`;
const PaginationBox = styled.div`
  ul {
    list-style: none;
    padding: 0
  }
  
  li {
    width: 30px;
    height: 30px;
    margin: 0 1px;

    border-radius: 50%;
    border: 1px solid #cfcfcf;
    font-size: 1rem;
    
    cursor: pointer;
  }
  
  .pagination {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination li a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }

  .pagination li.active a {
    color: white;
  }

  .pagination li.active {
    border-color: #666;
    background-color: #666;
  }
`

interface INoticeModel {
  idx: number;
  category: string;
  title: string;
  creator: string;
  createdDate: string;
}

const Notice: NextPage = () => {
  const getData = (startIndex: number, endIndex: number) => {
    return {
      list: notice_data.slice(startIndex, endIndex),
      count: notice_data.length
    }
  };
  const {list, totalListCount, moveToPage, pagination} = usePagination<INoticeModel>(getData);

  return (
    <Container>
      <Title>Notice</Title>

      <Count>총 <span>{totalListCount}</span>개</Count>
      <Table>
        <thead>
        <tr>
          <th>번호</th>
          <th>카테고리</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
        </thead>

        {/*id 내림차순으로 정렬, 카테고리는 공지/소식 두 종류이며 공지는 항상 최상단 노출*/}
        <tbody>
        {list.map(({idx, category, title, creator, createdDate}) => (
          <tr style={{ cursor: 'pointer' }} key={idx} onClick={() => moveToPage(idx)}>
            <td>{idx}</td>
            <td>{category}</td>
            <td style={{ textAlign: 'left' }}>{title}</td>
            <td>{creator}</td>
            <td>{createdDate}</td>
          </tr>
        ))}
        </tbody>
      </Table>

      <PaginationBox>
        <Pagination {...pagination} />
      </PaginationBox>
    </Container>
  );
};

export default Notice;
