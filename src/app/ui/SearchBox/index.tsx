"use client";
import { TextField } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { SearchGql } from "@/app/lib/query.service";
import { useDebounce } from "@/app/lib/util.service";

export default function SearchBox({
  onSuccessfulSearch,
  onFailedSearch,
}: {
  onSuccessfulSearch?: Function;
  onFailedSearch?: Function;
}) {
  const [searchText, setSearchText] = useState("");
  const [query] = useLazyQuery(SearchGql, {
    onCompleted: (response: SearchResult) => {
      if (onSuccessfulSearch) {
        onSuccessfulSearch({ query: searchText, result: response });
      }
    },
    onError: (err) => {
      if (onFailedSearch) {
        onFailedSearch(err);
      }
    },
  });
  useDebounce(
    () => {
      if (searchText)
        query({
          variables: {
            q: searchText.toLowerCase(),
          },
        });
    },
    [searchText],
    1000
  );
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };
  return (
    <TextField
      value={searchText || ""}
      onChange={handleSearch}
      fullWidth
      label="Nhập vào để tìm kiếm (hán tự, pinyin, tiếng Việt, ...)"
      variant="outlined"
    />
  );
}
