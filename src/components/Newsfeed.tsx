import * as React from "react";
import Story from "./Story";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import type { NewsfeedQuery } from "./__generated__/NewsfeedQuery.graphql";

export default function Newsfeed() {
  const query = useLazyLoadQuery<NewsfeedQuery>(
    graphql`
      query NewsfeedQuery {
        topStories {
          id
          ...StoryFragment
        }
      }
    `,
    {}
  );

  const stories = query.topStories;

  return (
    <div className="newsfeed">
      {stories.map((story) => (
        <Story key={story.id} storyRef={story} />
      ))}
    </div>
  );
}
