import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Input from "@mui/material/Input";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";

import {
  styled,
  Button,
  Icon,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SimpleCard } from "app/components";
import DeleteDialog from "app/components/DeleteDialog/DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getAllService,
  removeService,
  getAllUsers,
} from "../../redux/actions/service/index";

function createData(name, description, mrp, selling, image,itemObject) {
  return {
    name,
    description,
    mrp,
    selling,
    image,
    itemObject
  };
}

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "mrp",
    numeric: true,
    disablePadding: false,
    label: "Mrp",
  },
  {
    id: "selling",
    numeric: false,
    disablePadding: false,
    label: "Selling",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
  },

  {
    id: "miscellaneous",
    numeric: true,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead(props) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const serviceListData = useSelector((state) => state.service.serviceData);
  // console.log("serviceListData", serviceListData);

  useEffect(() => {
    dispatch(getAllService());
  }, []);

  useEffect(() => {
    setData(serviceListData.data);
  }, [serviceListData]);

  const rows = [];

  data &&
    data.map((item) => {
      // console.log("item====>", item);
      return rows.push(createData(
        item.name,
        item.description,
        item.mrp,
        item.selling,
        item.image,item
        ));
    });

  const [deletePopUp, setDeletePopUp] = useState(false);

  const handleOpenPopup = (id) => {
    setDeletePopUp(!deletePopUp);
    setTimeout(() => {
      setSelected([id]);
    }, 50);
  };

  const handleClosePopUp = () => {
    setDeletePopUp(false);
  };

  const onClickDelete = (id) => {
    // console.log("id",id);
    // let deleteObj = {
    //   ids: selected,
    // };

    dispatch(removeService(id));
    dispatch(getAllService());
    // handleOpenPopup();
    // setTimeout(() => {
    //   setSelected([]);
    // }, 100);
  };

  const editData = (DataById) => {
    console.log("DataById",DataById.id);
    navigate(`/service/${DataById.id}`, { state: DataById });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Container>
      <div className="d-flex justify-content-between p-2">
        <h6 className="ml-2">Product</h6>
        <Button
          component={Link}
          to="/service/new"
          variant="contained"
          startIcon={<AddIcon />}
          className="rounded-pill"
          style={{ background: "#003B6E", height: "44px" }}
        >
          Add Product
        </Button>
      </div>
      <SimpleCard>
        <Box width="100%" overflow="auto">
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead    numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={(event) =>
                //   handleSelectAllClick(event, rows, setSelected)
                // }
                onRequestSort={handleRequestSort}
                rowCount={rows.length} />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    // console.log("row===>", row);

                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell align="center" id={labelId}>
                          {row.name ? row.name : "-"}
                        </TableCell>
                        <TableCell align="center" id={labelId}>
                          {row.description ? row.description : "-"}
                        </TableCell>
                        <TableCell align="center" id={labelId}>
                          {row.mrp ? row.mrp : "-"}
                        </TableCell>
                         <TableCell align="center" id={labelId}>
                          {row.selling ? row.selling : "-"}
                        </TableCell>
                         <TableCell align="center" id={labelId}>
                          {row.image ? row.image : "-"}
                        </TableCell>
                        <TableCell align="center">
                        <IconButton
                            onClick={() => {
                              editData(row.itemObject);
                            }}
                          >
                            <Icon fontSize="small">edit</Icon>
                          </IconButton>
                          <IconButton
                            onClick={() => onClickDelete(row.itemObject.id)}
                          >
                            <Icon fontSize="small">delete</Icon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  ></TableRow>
                )}
              </TableBody>
            </Table>
            {deletePopUp && (
              <DeleteDialog
                handleClosePopup={handleClosePopUp}
                deletePopUp={deletePopUp}
                onClickDelete={onClickDelete}
              />
            )}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-selectLabel,.css-pdct74-MuiTablePagination-selectLabel,.MuiTablePagination-displayedRows,.css-levciy-MuiTablePagination-displayedRows":
                {
                  marginTop: "15px",
                },
            }}
          />
        </Box>
      </SimpleCard>
    </Container>
  );
}
