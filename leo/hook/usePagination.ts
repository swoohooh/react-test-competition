import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';

type getData<ListType> = (startIndex: number, endIndex: number) => Promise<{ list: ListType[], count: number }>;

const usePagination = <ListType>(getData: getData<ListType>) => {
  const router = useRouter();
  const pathName = router.pathname;
  const paramsPage = Number(router.query['page'] || 1);

  const itemsCountPerPage = 10;
  const pageRangeDisplayed = 10;

  const [activePage, setActivePage] = useState(paramsPage);
  const [totalListCount, setTotalListCount] = useState(0);
  const [list, setList] = useState<ListType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handlePagination = (index: number) => setActivePage(index);

  const getPageData = async (index: number) => {
    const startIndex = (index - 1) * itemsCountPerPage;
    const endIndex = (startIndex) + itemsCountPerPage;
    const data = await getData(startIndex, endIndex);

    setList(data.list);
    setTotalListCount(data.count);
  }

  useEffect(() => {
    setLoading(true);
    (async function() {
      await getPageData(activePage);
      await router.push(`${pathName}?page=${activePage}`);
      setLoading(false);
    }());
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
    totalListCount,
  };
}

export default usePagination;
