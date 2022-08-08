import React from 'react';

interface ViewportProps {
  width: number;
}

type ViewportContextProps = {
  children?: React.ReactNode;
};

export const ViewportContext = React.createContext({} as ViewportProps);

const ViewportProvider: React.FC<ViewportContextProps> = ({
  children,
}: ViewportContextProps) => {
  const [width, setWidth] = React.useState<number>(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width }}>
      {children}
    </ViewportContext.Provider>
  );
};

export default ViewportProvider;
