import * as React from "react";
import { useRef } from "react";
import Image from "./Image";
import { graphql } from "relay-runtime";
import { useFragment, useQueryLoader } from "react-relay";
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
import Hovercard from "./Hovercard";
import PosterDetailsHovercardContents, {
  PosterDetailsHovercardContentsQuery,
} from "./PosterDetailsHovercardContents";
import type { PosterDetailsHovercardContentsQuery as HovercardQueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";

export type Props = {
  posterRef: PosterBylineFragment$key;
};

export default function PosterByline({ posterRef }: Props): React.ReactElement {
  const actor = useFragment(
    graphql`
      fragment PosterBylineFragment on Actor {
        id
        name
        profilePicture {
          ...ImageFragment @arguments(width: 60, height: 60)
        }
      }
    `,
    posterRef
  );
  const [hovercardQueryRef, loadHovercardQuery] =
    useQueryLoader<HovercardQueryType>(PosterDetailsHovercardContentsQuery);
  const hoverRef = useRef(null);

  const handleBeginHover = () => {
    loadHovercardQuery({ posterID: actor.id });
  };

  return (
    <div ref={hoverRef} className="byline">
      <Image
        imageRef={actor.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{actor.name}</div>
      <Hovercard targetRef={hoverRef} onBeginHover={handleBeginHover}>
        <PosterDetailsHovercardContents queryRef={hovercardQueryRef} />
      </Hovercard>
    </div>
  );
}
