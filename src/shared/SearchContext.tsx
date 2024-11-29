import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

type SearchContextValue = {
    searchValue: string;
    onSearch: (value: string) => void;
} | null;

const SearchContext = createContext<SearchContextValue>(null);

export const SearchContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [searchValue, setSearchValue] = useState("");

    /**
     * При клиент-серверном поиске использовал бы debounce, в этом же кейсе особой необходимости нет
     */
    const onSearch = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const contextValue = useMemo(() => {
        return {
            searchValue,
            onSearch,
        };
    }, [searchValue, onSearch]);
    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error(
            "useSearchContext должен использоваться с <SearchContextProvider>",
        );
    }
    return context;
};
