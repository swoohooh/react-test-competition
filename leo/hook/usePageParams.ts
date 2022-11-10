import Router from 'next/router';

interface Props {
  path: string;
  activePage?: number;
}

const usePageParams = () => {
  const moveToPageParams = ({path, activePage}: Props) => {
    Router.push({
      pathname: path,
      query: {page: activePage},
    })
  };

  return moveToPageParams;
}

export default usePageParams;
