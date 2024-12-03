/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from "react";

export function setUserData(data: any) {
  window && window.localStorage.setItem("BJS_USERNAME", data.username);
  window && window.localStorage.setItem("BJS_TOKEN", data.token);
}

export function clearUserData() {
  setUserData({
    username: "",
    token: "",
  });
}

export function getUserData() {
  const userData = {
    username: window ? window.localStorage.getItem("BJS_USERNAME") : "",
    token: window ? window.localStorage.getItem("BJS_TOKEN") : "",
  };
  return userData;
}

export function useDebounce(cb: any, dependencies: any, delay: any) {
  const callback = useCallback(cb, dependencies);
  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
export function getFieldWithHighlight(
  word: WordV2,
  field: string,
  highlight?: WordV2,
  prefix?: string
): string[] {
  const highlightField = prefix ? `${prefix}.${field}` : field;
  const arrHighlight =
    highlight && highlight[highlightField]
      ? [].concat(highlight[highlightField])
      : [];
  const arrWord = word && word[field] ? [].concat(word[field]) : [];
  const rawHighlighData = arrHighlight.map((n: string) =>
    n.replace(/\<em\>|\<\/em\>/g, "")
  );
  const missingData = arrHighlight
    .concat(arrWord.filter((w: string) => rawHighlighData.indexOf(w) < 0))
    .filter((data, index, arr) => arr.indexOf(data) === index);
  return missingData;
}
const methods = {
  setUserData,
  getUserData,
  useDebounce,
  getFieldWithHighlight,
};
export default methods;
