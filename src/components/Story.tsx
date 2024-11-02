import * as React from "react";
import Card from "./Card";
import Heading from "./Heading";
import PosterByline from "./PosterByline";
import StorySummary from "./StorySummary";
import Image from "./Image";
import Timestamp from "./Timestamp";
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";
import { StoryFragment$key } from "./__generated__/StoryFragment.graphql";

type Props = {
  storyRef: StoryFragment$key;
};

export default function Story({ storyRef }: Props): React.ReactElement {
  const story = useFragment(
    graphql`
      fragment StoryFragment on Story {
        title
        summary
        createdAt
        poster {
          ...PosterBylineFragment
        }
        thumbnail {
          ...ImageFragment
        }
      }
    `,
    storyRef
  );

  return (
    <Card>
      <PosterByline posterRef={story.poster} />
      <Heading>{story.title}</Heading>
      <Timestamp time={story.createdAt} />
      <Image imageRef={story.thumbnail} width={400} height={400} />
      <StorySummary summary={story.summary} />
    </Card>
  );
}
