import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext(null);

const SearchProvider = ({children}) => {

    const [searchText,setSearchText]=useState('')

    
    return (
        <SearchContext.Provider value={{
            searchText,
            setSearchText
         }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchValue=()=>useContext(SearchContext)

export default SearchProvider;