"use client";
import { SearchNextGql } from "@/app/lib/query.service";
import { useDebounce } from "@/app/lib/util.service";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export default function SearchNextPage({
  cursor,
  q,
  onSuccessfulSearch,
  onFailedSearch,
}: {
  q: String;
  cursor: (number | string)[];
  onSuccessfulSearch?: Function;
  onFailedSearch?: Function;
}) {
  const [isRefreshed, setRefresh] = useState(false);
  const [query] = useLazyQuery(SearchNextGql, {
    onCompleted: (response: SearchResult) => {
      setRefresh(false);
      if (onSuccessfulSearch) {
        onSuccessfulSearch({ query: q, result: response });
      }
    },
    onError: (err) => {
      setRefresh(false);
      if (onFailedSearch) {
        onFailedSearch(err);
      }
    },
  });
  useDebounce(
    () => {
      if (!isRefreshed || !q || !cursor.length) {
        return;
      }
      setRefresh(false);
      let variables: any = { q, cursor };
      query({
        variables,
      });
    },
    [q, cursor, isRefreshed],
    1500
  );
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom && !isRefreshed) {
        setRefresh(true);
        // handleSearch();
      }
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("wheel", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isRefreshed]);
  return <></>;
}
