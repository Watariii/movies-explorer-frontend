function SearchResultMessage({ isOpenSearchResultMessage, onSearchResultMessage }) {
  return (
    <div
      className={`searchResultMessage ${
        isOpenSearchResultMessage ? "searchResultMessage_opened" : ""
      }`}
    >
      <p className="searchResultMessage__text">{onSearchResultMessage}</p>
    </div>
  );
}

export default SearchResultMessage;
