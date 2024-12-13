import { Chip, Typography } from "@mui/material";
export default function WordType({ wordType }: { wordType: string[] }) {
  return (
    <>
      <Typography color="green" variant="subtitle1">
        Từ loại
      </Typography>
      <ul>
        {wordType
          .filter((m) => m)
          .map((m, index) => (
            <li key={index} color="secondary">
              <Typography variant="body2">{m}</Typography>
            </li>
          ))}
      </ul>
    </>
  );
}
