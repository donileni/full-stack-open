import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = ({ show, token }) => {
  const result = useQuery(ALL_BOOKS);
  const userResult = useQuery(ME, {
    skip: !token,
  });

  if (result.loading || userResult.loading) {
    return <div>loading...</div>;
  }

  if (!show || !token) {
    return null;
  }
  const user = userResult.data;
  const genre = user.me.favoriteGenre;

  const books = result.data.allBooks;
  const recommendations = books.filter((books) => books.genres.includes(genre));

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{genre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendations.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
