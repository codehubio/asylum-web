import { Typography } from "@mui/material";
import TextToSpeech from "./Speech";

export default function Hanyu({ hanyu }: { hanyu: string }) {
  return (
    <>
      <Typography
        dangerouslySetInnerHTML={{ __html: hanyu }}
        variant="h4"
        component="div"
      >
        {/* {hanyu} */}
      </Typography>
    </>
  );
}
