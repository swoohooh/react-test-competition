import react from 'React';

interface Props {
  col?: number[] | string[];
  totalListCount?: number;
  columns?: react.ReactNode;
  rows?: react.ReactNode;
}

const Table = ({columns, rows, col, totalListCount}: Props) => {
  return (
    <>
      {totalListCount !== undefined && (
        <p className='mb-2.5 text-sm'>
          총 <span className='font-bold'>{totalListCount}</span>개
        </p>
      )}

      <table className='border-y-2 border-gray-400 border-solid text-sm text-center '>
        {col && (
          <colgroup>
            {col.map((item, index) => (
              <col key={index} width={item}/>
            ))}
          </colgroup>
        )}
        <thead className='font-bold'>
        {columns}
        </thead>

        <tbody>
        {rows}
        </tbody>
      </table>
    </>
  );
}

export default Table;
