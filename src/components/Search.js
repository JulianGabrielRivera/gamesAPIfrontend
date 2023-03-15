
import { LoadingContext } from "../context/loading.context";
import { useContext, useEffect } from "react";

const Search = () => {
    const { search, setSearch, SearchGame } = useContext(LoadingContext);


    useEffect(() => {

        SearchGame()

    }, []);

    function handleInputChange(event) {
        setSearch(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        SearchGame(search);
    }

    function clear() {
        setSearch('');
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input className="search-input" type="text" placeholder="Search for games" value={search} onChange={handleInputChange} />
            <button className="search-button" type="submit">Search</button>
            <button onClick={clear} className="search-button" type="submit">Back</button>
        </form>
    );
};

export default Search;
