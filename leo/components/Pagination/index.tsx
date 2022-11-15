import TablePagination from 'react-js-pagination';
import { ReactJsPaginationProps } from 'react-js-pagination';
import * as S from './style';

type Props = Pick<ReactJsPaginationProps, 'activePage' | 'itemsCountPerPage' | 'pageRangeDisplayed' | 'totalItemsCount' | 'onChange'>;

export const Pagination = ({...pagination}: Props) => {
  return (
    <S.PaginationBox>
      <TablePagination {...pagination} />
    </S.PaginationBox>
  );
}

export default Pagination;
