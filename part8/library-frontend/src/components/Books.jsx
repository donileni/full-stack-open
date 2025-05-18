import { useQuery } from "@apollo/client";
import { ALL_BOOKS, FILTERED_BOOKS } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [filter, setFiter] = useState(null);

  const result = useQuery(ALL_BOOKS);
  const filteredBooks = useQuery(FILTERED_BOOKS, {variables: { genre: filter}})

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const books = result.data.allBooks;

  const allGenres = books.map((book) => book.genres).flat();
  const uniqueGenres = [...new Set(allGenres)];

  let booksToShow = [];

  if (!filter) {
    booksToShow = books;
  } else if (filteredBooks.loading) {
    return <div>loading filtered books...</div>;
  } else {
    booksToShow = filteredBooks.data.allBooks
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((genre) => (
          <button onClick={() => setFiter(genre)} key={genre}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFiter(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
