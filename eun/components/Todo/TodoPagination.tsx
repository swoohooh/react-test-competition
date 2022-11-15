import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

type TodoPaginationProps = {
  totalPage: number;
  currentPage: number;
  pageLimit: number;
  clickPage: (page: number) => void;
};

const TodoPagination = ({ totalPage, currentPage, pageLimit, clickPage }: TodoPaginationProps) => {
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);

  const pageChunkToLimit = (totalPage: number, limit: number): number[][] => {
    const list = Array.from({ length: totalPage }, (_, i) => i + 1);

    const result = list.reduce((resultArray: any[], item: number, index: number) => {
      const chunkIndex = Math.floor(index / limit);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    return result;
  };

  useEffect(() => {
    if (currentPage % pageLimit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(currentPage / pageLimit)]);
    } else if (currentPage % pageLimit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(currentPage / pageLimit) - 1]);
    }
  }, [currentPage]);

  useEffect(() => {
    const chunkToPage = pageChunkToLimit(totalPage, pageLimit);
    setTotalPageArray(chunkToPage);
    setCurrentPageArray(chunkToPage[0]);
  }, [totalPage]);

  const clickPrevious = useCallback(() => {
    if (currentPage != 1) {
      clickPage(currentPage - 1);
    }
  }, [clickPage, currentPage]);

  const clickNext = useCallback(() => {
    if (currentPage < totalPage) {
      clickPage(currentPage + 1);
    }
  }, [clickPage, currentPage]);

  return (
    <div className="mt-5 flex items-center justify-center space-x-1">
      <div
        className="flex cursor-pointer items-center rounded-md bg-gray-300 px-2 py-1 text-gray-500 hover:bg-blue-400 hover:text-white"
        onClick={clickPrevious}
      >
        Previous
      </div>
      {currentPageArray.map((i: number) => {
        return (
          <div
            className={cn(
              'cursor-pointer rounded-md bg-gray-200 px-2 py-1 text-gray-700 hover:bg-blue-400 hover:text-white',
              currentPage == i ? 'bg-gray-700 text-white' : '',
            )}
            onClick={() => clickPage(i)}
          >
            {i}
          </div>
        );
      })}
      <div
        className="cursor-pointer rounded-md bg-gray-300  px-2 py-1 text-gray-500 hover:bg-blue-400 hover:text-white"
        onClick={clickNext}
      >
        Next
      </div>
    </div>
  );
};

export default TodoPagination;
