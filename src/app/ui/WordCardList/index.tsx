import { Grid2 } from "@mui/material";
import WordItem from "./WordItem";
// import Description from "./Description";
export default function WordCardList({ words }: { words: SearchHitItem[] }) {
  return (
    <>
      {words.map((h: SearchHitItem, index: number) => {
        return (
          <Grid2 key={index} maxWidth="25%">
            <WordItem word={h.source} highlight={h.highlight}></WordItem>
          </Grid2>
        );
      })}
    </>
  );
}
