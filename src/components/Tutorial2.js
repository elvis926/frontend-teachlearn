import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogContent,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TablePagination,
  IconButton,
} from "@material-ui/core";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth";
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 600,
  },
  textField: {
    width: "100%",
  },
}));

const Tutorial2 = ({ tutorialId }) => {
  const { user } = useAuth();
  const classes = useStyles();
  const { data, error } = useSWR("/pending", fetcher);

  console.log("data Complaints", data);

  if (error) return <div>No se pudo cargar los datos de la tutoria</div>;
  if (!data) return <Loading />;

  return (
    <>
      <h2>Tutorias</h2>
      <div>
        {data ? (
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Día</StyledTableCell>
                    <StyledTableCell align="center">Hora</StyledTableCell>
                    <StyledTableCell align="center">Tema</StyledTableCell>
                    <StyledTableCell align="center">
                      Observación
                    </StyledTableCell>
                    <StyledTableCell align="center">Estudiante</StyledTableCell>
                    <StyledTableCell align="center">Asignation</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data.map((tutorial) => (
                    <StyledTableRow key={tutorial.id}>
                      <StyledTableCell align="justify">
                        {tutorial.date}
                      </StyledTableCell>
                      <StyledTableCell align="justify">
                        {tutorial.hour}
                      </StyledTableCell>
                      <StyledTableCell align="justify">
                        {tutorial.topic}
                      </StyledTableCell>
                      <StyledTableCell align="justify">
                        {tutorial.observation}
                      </StyledTableCell>
                      <StyledTableCell align="justify">
                        {tutorial.student_name}
                      </StyledTableCell>
                      <StyledTableCell align="justify">
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >
                          Aceptar Tutoria
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
export default withAuth(Tutorial2);