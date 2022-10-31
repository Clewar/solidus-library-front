import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

type searchContextType = {
  search: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const authContextDefaultValues: searchContextType = {
  search: '',
  setSearchTerm: () => {},
};

const SearchContext = createContext<searchContextType>(authContextDefaultValues);

export function useSearch() {
    return useContext(SearchContext);
}

type Props = {
  children: ReactNode;
};

export function SearchProvider({ children }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const value = {
    search: searchTerm,
    setSearchTerm,
  }
  return (
      <>
          <SearchContext.Provider value={value}>
              {children}
          </SearchContext.Provider>
      </>
  );
}