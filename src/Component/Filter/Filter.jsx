import styles from "./Filter.module.css";
import {
  setAuthorFilter,
  setFavoriteFilter,
  setTitleFilter,
  selectAuthorFilter,
  selectTitleFilter,
  selectFavoriteFilter,
  resetFilters,
} from "../../redux/slices/filterSlice";
import { useSelector, useDispatch } from "react-redux";

function Filter() {
  const authorFilter = useSelector(selectAuthorFilter);
  const titleFilter = useSelector(selectTitleFilter);
  const favoriteFilter = useSelector(selectFavoriteFilter);
  const dispatch = useDispatch();
  function changeAuthor(e) {
    dispatch(setAuthorFilter(e.target.value));
  }
  function changeTitle(e) {
    dispatch(setTitleFilter(e.target.value));
  }
  function changeFavorite() {
    dispatch(setFavoriteFilter());
  }
  return (
    <div className={`${styles["app-block"]} ${styles.filter}`}>
      <div className={`${styles["filter-row"]}`}>
        <div className={`${styles["filter-group"]}`}>
          <input
            onChange={changeTitle}
            type="text"
            placeholder="title"
            value={titleFilter}
          />
        </div>
        <div className={`${styles["filter-group"]}`}>
          <input
            onChange={changeAuthor}
            type="text"
            placeholder="author"
            value={authorFilter}
          />
        </div>
        <div className={`${styles["filter-group"]}`}>
          <label>
            <input
              onChange={changeFavorite}
              type="checkbox"
              checked={favoriteFilter}
              
            />{" "}
            favorite{" "}
          </label>
        </div>
        <button onClick={() => dispatch(resetFilters())} type="button">
          reset filter
        </button>
      </div>
    </div>
  );
}

export default Filter;
