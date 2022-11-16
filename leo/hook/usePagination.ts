import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type getData<ListType> = (params: Record<string, number>) => Promise<{ list: ListType[], count: number }>;

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

  const getPageData = async (index: number) => {
    setLoading(true);
    const startIndex = (index - 1) * itemsCountPerPage;
    const endIndex = (startIndex) + itemsCountPerPage;

    await router.push(`${pathName}?page=${activePage}`);
    const data = await getData({start: startIndex, end: endIndex});

    setActivePage(index);
    setLoading(false);

    if (data) {
      setList(data?.list);
      setTotalListCount(data?.count);
    }
  }

  useEffect(() => {
    (async function(){
      await getPageData(paramsPage);
    }());
  }, []);

  return {
    pagination: {
      activePage,
      itemsCountPerPage,
      pageRangeDisplayed,
      totalItemsCount: totalListCount,
      onChange: getPageData,
    },
    list,
    paramsPage,
    totalListCount,
    isLoading,
  };
}

export default usePagination;
