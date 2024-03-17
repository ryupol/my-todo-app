import Dropdown from "@/components/Dropdown";
import SearchBar from "@/components/SearchBar";

export default function Header({ isDark, setIsDark }) {
  return (
    <div className="header">
      <h3>TODO LIST</h3>
      <div className="filter-container">
        <SearchBar />
        <Dropdown />
        <button
          className="theme-btn"
          onClick={() => {
            setIsDark(!isDark);
          }}
        >
          <img src="" alt="" />
        </button>
      </div>
    </div>
  );
}
