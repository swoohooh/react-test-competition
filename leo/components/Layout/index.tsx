import react from 'React';

interface Props {
  title?: string;
  children?: react.ReactNode;
}

const Layout = ({title, children}: Props) => {
  return (
    <div className='max-w-5xl py-24 mx-auto flex flex-col'>
      {title && <h2 className='mb-8 text-3xl font-bold text-center'>{title}</h2>}
      {children}
    </div>
  );
}

export default Layout;
