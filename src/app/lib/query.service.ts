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
            _score
            highlight
            sort
            _source {
              hanyu
              meaning
              pinyin
              link {
                item {
                  hanyu
                  meaning
                  pinyin
                }
                type
              }
            }
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
            _score
            highlight
            sort
            _source {
              hanyu
              meaning
              pinyin
              link {
                item {
                  hanyu
                  meaning
                  pinyin
                }
                type
              }
            }
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
