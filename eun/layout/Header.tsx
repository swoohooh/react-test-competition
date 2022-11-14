export const Header = () => {
  const menu = [
    {
      name: "Todo",
      link: "/todo",
    },
  ];
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {menu.map(
            ({ name, link }: { name: string; link: string }, index: number) => {
              return (
                <a
                  key={index}
                  href={link}
                  className="block mt-4 lg:inline-block lg:mt-0 text-lg hover:text-teal-500	 mr-4"
                >
                  {name}
                </a>
              );
            }
          )}
        </div>
      </div>
    </nav>
  );
};
