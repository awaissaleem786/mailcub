import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function CustomerList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-sh-auth": token,
      };

      const responce = await axios.post(
        "http://146.190.164.174:4000/api/customer/get_customers",
        {},
        { headers: headers }
      );
      setRows(responce.data.customer);
      console.log(responce.data.customer);
      console.log("Mydata", rows);
    } catch (error) {
      console.log("Error fetching customer:", error.responce);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };
  const deleteApi = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-sh-auth": token,
      };
      const responce = await axios.delete(
        `http://146.190.164.174:4000/api/customer/delete_customer/${id}`,
        { headers: headers }
      );

      if (responce.status === 200) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getUsers();
        console.log("Customer data deleted succesfully");
      }
    } catch (error) {
      console.log("Customer not Deleted:", error.responce);
    }
  };
  const navigate = useNavigate();
  const editUser = (id) => {
    navigate(`/editcustomer/${id}`);
  };
  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
  }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ padding: "20px" }}
      >
        Products List
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction="row" spacing={2} className="my-2 mb-2" >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300}}
            onChange={(e, v) => filterData(v)}
          getOptionLabel={(rows) => rows.first_name || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search Products" />
          )}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Link to={"/addcustomer"} color="white">
          <Button variant="contained" endIcon={<AddCircleIcon />}>
            Add
          </Button>
        </Link>
      </Stack>
      <Box height={10} />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align={"left"} style={{ minWidth: "100px",fontSize:'20px',fontWeight:"bold" }}>
                First Name
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "100px" ,fontSize:'20px',fontWeight:"bold" }}>
                Last Name
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "100px" ,fontSize:'20px',fontWeight:"bold" }}>
                Email
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "100px" ,fontSize:'20px',fontWeight:"bold"}}>
                Account Status
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: "100px" ,fontSize:'20px',fontWeight:"bold"}}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell key={row.id} align={"left"}>
                      {row.first_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.last_name}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.user.email}
                    </TableCell>
                    <TableCell key={row.id} align={"left"}>
                      {row.industry_type}
                    </TableCell>

                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: "blue",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() => editUser(row.user._id)}
                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "darkred",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            deleteUser(row.user._id);
                          }}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
