import { useState, createContext } from 'react';

type ContextType = {
  address: string;
  setAddress: (address: string) => void;
};

type Props = {
  children?: React.ReactNode;
};

export const MetamaskContext = createContext<ContextType>({
  address: '',
  setAddress: () => {},
});

export const MetamaskProvider: React.FC<Props> = ({ children }: Props) => {
  const [address, setAddress] = useState<string>('');

  return (
    <MetamaskContext.Provider
      value={{
        address,
        setAddress,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export default MetamaskProvider;
