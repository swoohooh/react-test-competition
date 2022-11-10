import styled from 'styled-components';
import type { NextPage } from 'next';
import notice_data from '../api/notice_data.json';
import { useRouter } from 'next/router';
import usePageParams from '../../hook/usePageParams';

const Wrap = styled.div`
  max-width: 1000px;
  margin: 100px auto;
  
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  border: 2px solid #666;
  border-left: 0;
  border-right: 0;
`;
const Heading = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cfcfcf;
  font-size: 14px;
  
  p:first-child {
    font-weight: bold;
  }
`;
const Content = styled.div`
  padding: 50px 0;
`;
const ListButton = styled.button`
  display: inline-block;
  padding: 10px 40px;
  margin: 20px 0 0 auto;

  color: #fff;
  background: #666;
  border-radius: 3px;

  font-size: 14px;
  font-weight: bold;
`;
const List = styled.ul`
  border-top: 1px solid #cfcfcf;

  li {
    height: 50px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cfcfcf;
    cursor: pointer;

    &:last-child {
      border-bottom: 0;
    }

    p:first-child {
      width: 10%;
    }

    i {
      margin-right: 8px;
    }
  }
`;

const NoticeDetail: NextPage = () => {
  const router = useRouter();
  const noticeIdx = Number(router.query['idx'] || 0) - 1;
  const pathName = router.pathname;

  const prevCont = notice_data[noticeIdx - 1];
  const nextCont = notice_data[noticeIdx + 1];
  const nowCont = notice_data[noticeIdx];

  const moveToPageParams = usePageParams();
  const moveToPage = (idx?: number) => {
    moveToPageParams({
      path: `${pathName}${idx ? `/${idx}` : ''}`,
      activePage: Number(router.query['page'] || 1)
    });
  };

  // const moveToPage = (pathIdx?: number) => `/notice${pathIdx ? `/${encodeURIComponent(pathIdx)}` : ''}`;

  return (
    <Wrap>
      <Container>
        <Heading>
          <p>{nowCont?.idx} : {nowCont?.title}</p>
          <p>{nowCont?.creator} | {nowCont?.createdDate}</p>
        </Heading>

        <Content>contents</Content>

        <List>
          {prevCont?.idx && (
            <li onClick={() => moveToPage(prevCont.idx)}>
              <p><i className='xi-angle-up'/>이전</p>
              <p>{prevCont?.title}</p>
            </li>
          )}
          {nextCont?.idx && (
            <li onClick={() => moveToPage(nextCont.idx)}>
              <p><i className='xi-angle-down'/>다음</p>
              <p>{nextCont?.title}</p>
            </li>
          )}
        </List>
      </Container>

      <ListButton type='button' onClick={() => moveToPage()}>목록</ListButton>
    </Wrap>
  );
};

export default NoticeDetail;
