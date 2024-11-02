import * as React from "react";
import Story from "./Story";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import type {NewsfeedQuery   } from "./__generated__/NewsfeedQuery.graphql";

export default function Newsfeed() {
  const data = useLazyLoadQuery<NewsfeedQuery>(graphql`
      query NewsfeedQuery {
          topStory {
              title
              summary
              createdAt
              poster {
                  name
                  profilePicture {
                      url
                  }
              }
              thumbnail {
                  url
              }
          }
      }
  `, {});

  const story = data.topStory;

  return (
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}
