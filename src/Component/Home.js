import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../Services/api";
import { Link } from "react-router-dom";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [users, setUsers] = useState([]);
  console.log("users---->", users);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  };

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  const editData = (DataById) => {
    navigate(`/add/${DataById.id}`, { state: DataById });
    // navigate(`/edit/${DataById.id}`, { state: DataById });
  
  };

  return (
    <div className="container">
      <div className="py-4">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Interest</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((element, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{element.fullname}</TableCell>
                  <TableCell align="center">{element.email}</TableCell>
                  <TableCell align="center">{element.gender}</TableCell>
                  <TableCell align="center">{element.tags.toString().split(" ")}</TableCell>
                  <TableCell align="center">
                    <IconButton
                  onClick={() => {
                    editData(element);
                  }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteUserData(element.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>
 
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={users.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </div>
    </div>
  );
};

export default Home;
