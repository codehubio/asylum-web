"use client";
import { Grid2 } from "@mui/material";
import { useState } from "react";
import SearchBox from "./ui/SearchBox";
import SearchNextPage from "./ui/SearchNextPage";
import SearchTotal from "./ui/SearchTotal";
import WordRowList from "./ui/WordRowList";

export default function Home() {
  const defaultSearchResult = {
    total: {
      value: 0,
      relation: "eq",
    },
    hits: [],
  };
  const [result, setResult] = useState<SearchData>(defaultSearchResult);
  const [q, setQ] = useState<String>("");
  function setQueryAndResult(
    clearOldResult: boolean,
    {
      query,
      result: newResult,
    }: {
      query: String;
      result: SearchResult | null;
    }
  ) {
    setResult({
      total: newResult?.search?.hits?.total || defaultSearchResult.total,
      hits: clearOldResult
        ? [...(newResult?.search?.hits?.hits || [])]
        : [...result.hits, ...(newResult?.search?.hits?.hits || [])],
    });
    setQ(query);
  }
  const len = result.hits.length || 0;
  const cursor = len ? result.hits[len - 1].sort || [] : [];
  return (
    <>
      <Grid2
        size={12}
        container
        columnSpacing={1}
        rowSpacing={1}
        alignContent="center"
        justifyContent="center"
        justifyItems="center"
      >
        <Grid2 size={12}>
          <SearchBox onSuccessfulSearch={setQueryAndResult.bind(null, true)} />
        </Grid2>
        <Grid2 size={12}>
          <SearchTotal total={result.total.value} />
        </Grid2>
        {/* <WordCardList words={result.hits}></WordCardList> */}
        <WordRowList words={result.hits}></WordRowList>
        <Grid2 size={12}>
          <SearchNextPage
            cursor={cursor}
            onSuccessfulSearch={setQueryAndResult.bind(null, false)}
            q={q}
          />
        </Grid2>
      </Grid2>
    </>
  );
}
