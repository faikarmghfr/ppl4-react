import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DataPenguji() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [penguji, setPenguji] = useState([]);
  const [isAllExist, setIsAllExist] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    retrievePenguji();
  }, []);

  const retrievePenguji = async () => {
    try {
      const { data } = await axios.get(
        "https://kelompok4-strapi.herokuapp.com/api/pengujis?populate[pegawais][populate][0]=grade,jenjang,jabatan"
      );
      setPenguji(data.data);
      setIsAllExist(true);
      // console.log(data.data[0].attributes.jenjang, "<== response data penguji");
    } catch (error) {
      console.log(error, "<== error retrive ");
    }
  };

  console.log(penguji);

  return (
    <Paper
      sx={{ width: "85%", overflow: "hidden", margin: "100px 0 76px 110px" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
            {penguji &&
              isAllExist &&
              penguji.map((row) => (
                <TableRow key={row.id}>
                  {/* semua ini belom selesai nunggu dari be */}
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
                  <TableCell align="center">{
                      row.attributes.pegawais.data[0].attributes.grade.data
                        .attributes.Nama_Grade
                    }</TableCell>
                  <TableCell align="center">{
                      row.attributes.pegawais.data[0].attributes.jenjang.data
                        .attributes.Nama_Jenjang
                    }</TableCell>
                  <TableCell align="center">Edit || Hapus</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={penguji.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
