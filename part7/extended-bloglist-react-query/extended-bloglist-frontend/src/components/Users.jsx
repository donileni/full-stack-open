import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const users = result.data;

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td> <Link to={`/users/${user.id}`}> {user.name} </Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
