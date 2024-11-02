import * as React from "react";
import Story from "./Story";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import type { NewsfeedQuery } from "./__generated__/NewsfeedQuery.graphql";

export default function Newsfeed() {
  const query = useLazyLoadQuery<NewsfeedQuery>(
    graphql`
      query NewsfeedQuery {
        topStory {
          ...StoryFragment
        }
      }
    `,
    {}
  );

  const story = query.topStory;

  return (
    <div className="newsfeed">
      <Story storyRef={story} />
    </div>
  );
}
