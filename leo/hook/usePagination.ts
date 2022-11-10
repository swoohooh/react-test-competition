import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import usePageParams from '../hook/usePageParams';

type getData<ListType> = (startIndex: number, endIndex: number) => { list: ListType[], count: number };

const usePagination = <ListType>(getData: getData<ListType>) => {
  const router = useRouter();
  const pathName = router.pathname;
  const paramsPage = Number(router.query['page'] || 1);
  const moveToPageParams = usePageParams();

  const itemsCountPerPage = 10;
  const pageRangeDisplayed = 10;

  const [activePage, setActivePage] = useState(paramsPage);
  const [totalListCount, setTotalListCount] = useState(0);
  const [list, setList] = useState<ListType[]>([]);

  const handlePagination = (index: number) => setActivePage(index);

  const getPageData = (index: number) => {
    const startIndex = (index - 1) * itemsCountPerPage;
    const endIndex = (startIndex) + itemsCountPerPage;
    const data = getData(startIndex, endIndex);

    setList(data.list);
    setTotalListCount(data.count);
  }

  const moveToPage = (idx?: number) => {
    moveToPageParams({path: `${pathName}${idx ? `/${idx}` : ''}`, activePage});
  };

  useEffect(() => {
    moveToPage();
    getPageData(activePage);
  }, [activePage]);

  return {
    pagination: {
      activePage,
      itemsCountPerPage,
      pageRangeDisplayed,
      totalItemsCount: totalListCount,
      onChange: handlePagination,
    },
    list,
    paramsPage,
    moveToPage,
    totalListCount,
  };
}

export default usePagination;
