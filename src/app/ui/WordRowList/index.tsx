/* eslint-disable react/display-name */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import WordItem from "../WordRowList/WordItem";
// import Description from "./Description";
export default function Word({ words }: { words: SearchHitItem[] }) {
  return (
    <>
      {words && words.length ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Typography variant="h5">Hán ngữ</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">Bính âm</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h5">Nghĩa</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {words.map((row, index) => {
                return (
                  <WordItem
                    key={index}
                    word={row._source}
                    highlight={row.highlight}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
}
