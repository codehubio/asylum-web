import { gql } from "@apollo/client";

export const SearchGql = gql`
  query searchItem($q: String!) {
    search(q: $q) {
      hits {
        total {
          value
          relation
        }
        hits {
          source {
            hanyu
            pinyin
            meaning
            word_type
            link
            synonym
            tag
            created_at
          }
          highlight
          sort
        }
      }
    }
  }
`;
export const SearchNextGql = gql`
  query searchItem($q: String!, $cursor: [Float]!) {
    search(q: $q, cursor: $cursor) {
      hits {
        total {
          value
          relation
        }
        hits {
          source {
            hanyu
            pinyin
            meaning
            word_type
            link
            synonym
            tag
            created_at
          }
          highlight
          sort
        }
      }
    }
  }
`;
const exportGql = {
  SearchGql,
  SearchNextGql,
};

export default exportGql;
