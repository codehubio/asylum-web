import { Typography } from "@mui/material";
import TextToSpeech from "./Speech";
export default function ExampleHanyu({
  exampleHanyuWithHighlight,
  exampleHanyu,
  examplePinyin,
  exampleMeaning,
}: {
  exampleHanyuWithHighlight: string[];
  exampleHanyu: string[];
  examplePinyin: string[];
  exampleMeaning: string[];
}) {
  return (
    <>
      <Typography color="green" variant="subtitle1">
        Ví dụ
      </Typography>
      <ul>
        {exampleHanyuWithHighlight
          .filter((m) => m)
          .map((m, index) => (
            <li key={index}>
              <Typography
                dangerouslySetInnerHTML={{ __html: m }}
                variant="body2"
              ></Typography>
              <TextToSpeech
                gender={0}
                text={exampleHanyu[index]}
              ></TextToSpeech>
              <TextToSpeech
                gender={1}
                text={exampleHanyu[index]}
              ></TextToSpeech>
              <ul>
                <li>
                  <Typography
                    dangerouslySetInnerHTML={{ __html: examplePinyin[index] }}
                    variant="body2"
                  ></Typography>
                </li>
                <li>
                  <Typography
                    dangerouslySetInnerHTML={{ __html: exampleMeaning[index] }}
                    variant="body2"
                  ></Typography>
                </li>
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
}
