import styles from "./BookList.module.css";
import { selectAllBooks } from "../../redux/slices/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import { deleteBook, toggleFavorite } from "../../redux/slices/bookSlice";
import {
  selectAuthorFilter,
  selectTitleFilter,
  selectFavoriteFilter
} from "../../redux/slices/filterSlice";

function BookList() {
  const books = useSelector(selectAllBooks);
  console.log(books);
  const dispatch = useDispatch();
  const title = useSelector(selectTitleFilter);
  const author = useSelector(selectAuthorFilter);
  const favorite = useSelector(selectFavoriteFilter);

  const filteredBooks = books.filter((item) => {
    const filteredAuthor = item.author
      .toLowerCase()
      .includes(author.toLowerCase());
    const filteredTitle = item.title
      .toLowerCase()
      .includes(title.toLowerCase());
    const filteredFavorite = favorite ? item.isFavorite : true;
    return filteredAuthor && filteredTitle && filteredFavorite;
  });

  return (
    <div className={`${styles["app-block"]} ${styles["book-list"]}`}>
      <h2>Book List</h2>

      {filteredBooks.length ? (
        <ul>
          {filteredBooks.map((item) => (
            <li key={item.id}>
              <div className={styles["book-info"]}>
                {item.title} by <strong>{item.author}</strong>
              </div>
              <span onClick={() => dispatch(toggleFavorite(item.id))}>
                {item.isFavorite ? (
                  <BsBookmarkStarFill className={`${styles["star-icon"]}`} />
                ) : (
                  <BsBookmarkStar className={`${styles["star-icon"]}`} />
                )}
              </span>
              <button onClick={() => dispatch(deleteBook(item.id))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>no books</p>
      )}
    </div>
  );
}

export default BookList;
