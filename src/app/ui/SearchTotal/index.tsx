import { Box, Typography } from "@mui/material";
export default function SearchTotal({ total }: { total: number }) {
  return (
    <Box
      sx={{
        margin: "auto",
        textAign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Typography color="gray" variant="subtitle2" fontStyle="italic">
        Tìm thấy khoảng
        <Box display="inline" color="yellow">
          &nbsp;{total}&nbsp;
        </Box>
        kết quả. Xin kéo xuống để hiển thị kết quả tiếp theo nếu còn.
      </Typography>
    </Box>
  );
}
