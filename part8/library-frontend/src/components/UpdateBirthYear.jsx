import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const UpdateBirthYear = ({ authors }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState("");

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    updateAuthor({ variables: { name, born } });

    setBorn("");
  };

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Select an author
            <select
              name="selectAuthor"
              onChange={({ target }) => setName(target.value)}
            >
              {authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateBirthYear;
