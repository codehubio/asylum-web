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
  source: Word;
  highlight?: Word;
  sort: (number | string)[];
};
type SearchData = {
  total: SearchTotalData;
  hits: SearchHitItem[];
};
type SearchResult = {
  search: {
    hits: SearchData;
    _shards: SearchShardData;
    took: number;
    timed_out: boolean;
  };
};
