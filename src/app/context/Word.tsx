import { createContext } from "react";
const defaultWordContext = {
  init: (): any => {
    const charData: any = {};
    return {
      loadCharDataFromFile: (cnChar: string) => {
        if (!charData[cnChar]) {
          const newData = require(`../hanzi-writer-data/${cnChar}.json`);
          charData[cnChar] = newData;
        }
        return charData[cnChar];
      },
    };
  },
};
const WordContext = createContext({
  loadCharDataFromFile: () => {},
});
export default {
  WordContext,
  defaultWordContext,
};
