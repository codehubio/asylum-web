import {
  Box,
  Collapse,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextToSpeech from "./Speech";
import { getFieldWithHighlight } from "@/app/lib/util.service";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import Description from "./Description";
function buildExample({
  hanyuArray,
  pinyinArray,
  meaningArray,
}: {
  hanyuArray: string[];
  pinyinArray: string[];
  meaningArray: string[];
}) {
  return hanyuArray
    .filter((h) => h)
    .map((h, index) => {
      return {
        hanyu: h,
        pinyin: pinyinArray[index] || "",
        meaning: meaningArray[index] || "",
      };
    });
}
export default function Word({
  word,
  highlight,
}: {
  word: Word;
  highlight?: Word;
}) {
  const examples = buildExample({
    hanyuArray: getFieldWithHighlight(word, "example_hanyu", highlight),
    pinyinArray: getFieldWithHighlight(word, "example_pinyin", highlight),
    meaningArray: getFieldWithHighlight(word, "example_meaning", highlight),
  });
  const [open, setOpen] = useState(false);
  const CustomizedTableCell = styled(TableCell)({
    border: "none",
  });

  return (
    <>
      <TableRow>
        <TableCell width={"5%"}>
          {examples.length ? (
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
                  __html: getFieldWithHighlight(word, "hanyu", highlight).join(
                    ", "
                  ),
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
              __html: getFieldWithHighlight(word, "pinyin", highlight).join(
                ", "
              ),
            }}
          ></span>
        </TableCell>
        <TableCell
          scope="row"
          dangerouslySetInnerHTML={{
            __html: getFieldWithHighlight(word, "meaning", highlight).join(
              ", "
            ),
          }}
        ></TableCell>
      </TableRow>
      {examples.length ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}></TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}></TableCell>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
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
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ border: "none" }}>
                      <TableCell>Hán ngữ</TableCell>
                      <TableCell>Bính âm</TableCell>
                      <TableCell>Nghĩa</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {examples.map((example, index) => (
                      <TableRow key={index} sx={{ border: "none" }}>
                        <CustomizedTableCell>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: example.hanyu,
                            }}
                          ></span>
                          <span>
                            <TextToSpeech
                              gender={0}
                              text={example.hanyu}
                            ></TextToSpeech>
                            <TextToSpeech
                              gender={1}
                              text={example.hanyu}
                            ></TextToSpeech>
                          </span>
                        </CustomizedTableCell>
                        <CustomizedTableCell>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: example.pinyin,
                            }}
                          ></span>
                        </CustomizedTableCell>
                        <CustomizedTableCell>
                          {" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: example.meaning,
                            }}
                          ></span>
                        </CustomizedTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </>
  );
}
