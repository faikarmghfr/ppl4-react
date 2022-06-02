import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TableSortLabel } from "@mui/material";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import qs from "querystring";
import reactTable from "react-table";

export default function DataPeserta() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const [data, setData] = useState([]);
  // const [searchData, setSearchData] = useState(data);

  const [peserta, setPeserta] = useState([]);
  const [isAllExist, setIsAllExist] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    retrievePeserta();
  }, []);

  const retrievePeserta = async () => {
    try {
      const { data } = await axios.get(
        "https://kelompok4-strapi.herokuapp.com/api/pesertas?populate[pegawais][populate][0]=grade,jenjang,jabatan"
      );
      setPeserta(data.data);
      setIsAllExist(true);
      console.log(data.data[0].attributes.jenjang, "<== response data pegawai");
    } catch (error) {
      console.log(error, "<== error retrive ");
    }
  };
  // console.log("check", peserta[0], peserta[0].id)
  console.log("check2", peserta);
  // const requestSearch = (searchedVal) => {
  //   if (searchedVal.length === 0) {
  //     setSearchData(data);
  //   } else {
  //     const filteredRows = searchData.filter((row) => {
  //       return row.name.toLowerCase().includes(searchedVal.toLowerCase());
  //     });
  //     setSearchData(filteredRows);
  //   }
  // };

  // if (isAllExist) {return <h1>Loading</h1>}
  return (
    <>
      {/* <TextField
        id="filled-basic"
        onChange={(value) => {
          requestSearch(value.target.value);
        }}
        label="Search"
        variant="outlined"
      /> */}
      <Paper
        style={{
          borderRadius: "20px",
        }}
        sx={{ width: "85%", overflow: "hidden", margin: "100px 0 76px 110px" }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Nama</TableCell>
                <TableCell align="center">NIP</TableCell>
                <TableCell align="center">Jabatan</TableCell>
                <TableCell align="center">Grade</TableCell>
                <TableCell align="center">Jenjang</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {peserta &&
                isAllExist &&
                peserta.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      {row.attributes.pegawais.data[0].attributes.Nama_Pegawai}
                    </TableCell>
                    <TableCell align="center">
                      {row.attributes.pegawais.data[0].attributes.NIP}
                    </TableCell>
                    <TableCell align="center">
                      {
                        row.attributes.pegawais.data[0].attributes.jabatan.data
                          .attributes.Nama_Jabatan
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        row.attributes.pegawais.data[0].attributes.grade.data
                          .attributes.Nama_Grade
                      }
                    </TableCell>
                    <TableCell align="center">
                      {
                        row.attributes.pegawais.data[0].attributes.jenjang.data
                          .attributes.Nama_Jenjang
                      }
                    </TableCell>
                    <TableCell align="center">Edit || Hapus</TableCell>
                  </TableRow>
                ))}
            </TableBody>
           </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </>
    // );
  );
}
