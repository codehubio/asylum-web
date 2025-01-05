import { gql } from "@apollo/client";

export const SearchGql = gql`
  query searchItem($input: SearchInput) {
    search(input: $input) {
      payload {
        hits {
          total {
            value
            relation
          }
          hits {
            _source
            _score
            highlight
            sort
          }
        }
      }
    }
  }
`;
export const SearchNextGql = gql`
  query searchItem($input: SearchInput) {
    search(input: $input) {
      payload {
        hits {
          total {
            value
            relation
          }
          hits {
            _source
            _score
            highlight
            sort
          }
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
