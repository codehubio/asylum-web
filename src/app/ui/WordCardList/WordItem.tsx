import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Hanyu from "./Hanyu";
import Pinyin from "./Pinyin";
import Meaning from "./Meaning";
import WordType from "./WordType";
import TextToSpeech from "./Speech";
import Example from "./Example";
import { getFieldWithHighlight } from "@/app/lib/util.service";
// import Description from "./Description";
export default function WordItem({
  word,
  highlight,
}: {
  word: Word;
  highlight?: Word;
}) {
  return (
    <Card>
      <CardContent>
        <Hanyu hanyu={getFieldWithHighlight(word, "hanyu", highlight)}></Hanyu>
        <div style={{ display: "flex" }}>
          <Pinyin
            pinyin={getFieldWithHighlight(word, "pinyin", highlight)}
          ></Pinyin>
          <TextToSpeech gender={0} text={word.hanyu}></TextToSpeech>
          <TextToSpeech gender={1} text={word.hanyu}></TextToSpeech>
        </div>
        <Meaning
          meaning={getFieldWithHighlight(word, "meaning", highlight)}
        ></Meaning>
        {word.example_hanyu && word.example_hanyu[0] ? (
          <Example
            exampleHanyu={word.example_hanyu}
            exampleHanyuWithHighlight={getFieldWithHighlight(
              word,
              "example_hanyu",
              highlight
            )}
            exampleMeaning={getFieldWithHighlight(
              word,
              "example_meaning",
              highlight
            )}
            examplePinyin={getFieldWithHighlight(
              word,
              "example_pinyin",
              highlight
            )}
          ></Example>
        ) : (
          <></>
        )}
        {/* <Description description={word.description || []}></Description> */}
        {/* <WordType wordType={word.word_type}></WordType> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
