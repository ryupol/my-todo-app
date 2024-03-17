import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/searchSlice";

export default function SearchBar() {
  const { search } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <>
      <form
        className="search-container"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search note..."
          value={search}
          onChange={handleChange}
          className="search-input"
        />
        <button className="search-btn" onClick={(e) => e.preventDefault()}>
          <img src="" alt="search-icon" />
        </button>
      </form>
    </>
  );
}
