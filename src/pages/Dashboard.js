import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import styled from "@emotion/styled";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  sticky: {
    position: "sticky",
    left: 0,
    background: "white",
    boxShadow: "5px 2px 5px grey"
  }
});

export default function Dashboard() {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
        console.log("Result:", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer style={{margin: "60px 0 50px 145px", width: "80%"}} component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.sticky}>Name</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Street</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" className={classes.sticky}>
                {row.name}
              </TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.address.street}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
