import { Chip, Typography } from "@mui/material";
export default function Meaning({ meaning }: { meaning: string[] }) {
  return (
    <>
      <Typography color="green" variant="subtitle1">
        Nghĩa
      </Typography>
      <ul>
        {meaning
          .filter((m) => m)
          .map((m, index) => (
            <li key={index}>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: m }}
              >
                {/* {m} */}
              </Typography>
            </li>
          ))}
      </ul>
    </>
  );
}
