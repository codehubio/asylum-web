import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  TableBody,
  Table,
  TableContainer,
  Paper,
} from "@mui/material";
import TextToSpeech from "./Speech";
import { getFieldWithHighlight } from "@/app/lib/util.service";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import Description from "./Description";
export default function Word({
  word,
  highlight,
  prefix,
}: {
  word: WordV2;
  highlight?: WordV2;
  prefix?: string;
}) {
  const [open, setOpen] = useState(false);
  return word && word.hanyu && word.hanyu[0] ? (
    <>
      <TableRow>
        <TableCell width={"5%"}>
          {word &&
          word.link &&
          word.link &&
          word.link[0] &&
          word.link[0].hanyu &&
          word.link[0].hanyu[0] ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <></>
          )}
        </TableCell>
        <TableCell width={"10%"}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h6">
              <span
                dangerouslySetInnerHTML={{
                  __html: getFieldWithHighlight(
                    word,
                    "hanyu",
                    highlight,
                    prefix
                  ).join(", "),
                }}
              ></span>
            </Typography>
            <span>
              <TextToSpeech gender={0} text={word.hanyu}></TextToSpeech>
              <TextToSpeech gender={1} text={word.hanyu}></TextToSpeech>
            </span>
          </div>
        </TableCell>
        <TableCell width={"10%"}>
          {" "}
          <span
            dangerouslySetInnerHTML={{
              __html: getFieldWithHighlight(
                word,
                "pinyin",
                highlight,
                prefix
              ).join(", "),
            }}
          ></span>
        </TableCell>
        <TableCell
          scope="row"
          dangerouslySetInnerHTML={{
            __html: getFieldWithHighlight(
              word,
              "meaning",
              highlight,
              prefix
            ).join(", "),
          }}
        ></TableCell>
      </TableRow>
      {word.link &&
      word.link &&
      word.link[0] &&
      word.link[0].hanyu &&
      word.link[0].hanyu[0] ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}></TableCell>
          <TableCell
            width="auto"
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={12}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>
                <Typography
                  color="green"
                  variant="h6"
                  gutterBottom
                  component="div"
                >
                  Ví dụ
                </Typography>
                {word.link.map((example: WordV2, index: number) => {
                  return (
                    <>
                      <Word
                        key={index}
                        word={example}
                        prefix="link"
                        highlight={highlight}
                      ></Word>
                    </>
                  );
                })}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  );
}
