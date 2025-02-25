type SearchTotalData = {
  value: number;
  relation: string;
};
type SearchShardData = {
  total: number;
  successful: number;
  skipped: number;
  failed: number;
};
type SearchHitItem = {
  _source: WordV2;
  highlight?: WordV2;
  sort: (number | string)[];
};
type SearchData = {
  total: SearchTotalData;
  hits: SearchHitItem[];
};
type SearchResult = {
  search: {
    payload: {
      hits: SearchData;
      _shards: SearchShardData;
      took: number;
      timed_out: boolean;
    };
  };
};
