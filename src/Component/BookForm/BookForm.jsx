import styles from "./BookForm.module.css";

import { useState } from "react";
import booksData from "../../data/books.json";
import {
  addBook,
  fetchBooks,
  selectIsLoadingApi,
} from "../../redux/slices/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { createBookWidthId } from "../../utils/createBookWithId";
import { FaSpinner } from "react-icons/fa";
import { setError } from "../../redux/slices/errorSlice";

function BookForm() {
  const isLoading = useSelector(selectIsLoadingApi);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(title && author){
      dispatch(addBook(createBookWidthId({ title, author })));
    }
    else{
      dispatch(setError("Please fill title and author"))
    }
    
  };
  return (
    <div className={`${styles["app-block"]} ${styles["book-form"]}`}>
      <h2>Add new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            value={title}
          />
          <input
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            id="author"
            value={author}
          />
        </div>
        <button type="submit">Add book</button>
        <button
          type="button"
          onClick={() => {
            dispatch(fetchBooks("http://localhost:4000/random-books"));
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className={styles["spinner"]} />
            </>
          ) : (
            "Add Random via API"
          )}
        </button>
        {/* <button
          onClick={() => {
            dispath(fetchBooks("http://localhost:4000/random-book"));
          }}
        >
          {isLoading ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className={styles["spinner"]} />
            </>
          ) : (
            "Add Random via API"
          )}
          {isLoading ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className={styles["spinner"]} />
            </>
          ) : (
            "Add Random via API"
          )}
        </button> */}
      </form>
    </div>
  );
}
export default BookForm;
