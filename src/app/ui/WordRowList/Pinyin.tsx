import { Typography } from "@mui/material";
export default function Pinyin({ pinyin }: { pinyin: string[] }) {
  return (
    <>
      <Typography
        dangerouslySetInnerHTML={{ __html: `/${pinyin.filter((m) => m)[0]}/` }}
        sx={{ fontStyle: "italic" }}
        variant="body2"
      ></Typography>
    </>
  );
}
