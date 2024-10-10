interface MapJson {
  [key: string]: string | string[] | undefined;
}
// export interface IItem extends Record<string, any>
interface Word extends Record<string, any> {
  wordType: string[];
  hanyu: string;
  example_pinyin: string[];
  example_meaning: string[];
  example_hanyu: string[];
  meaning: string[];
  synonym: string[];
  tag: string[];
  pinyin: string[];
}
