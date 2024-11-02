import * as React from "react";
import { useRef } from "react";
import Image from "./Image";
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
import Hovercard from "./Hovercard";
import PosterDetailsHovercardContents from "./PosterDetailsHovercardContents";

export type Props = {
  posterRef: PosterBylineFragment$key;
};

export default function PosterByline({ posterRef }: Props): React.ReactElement {
  const actor = useFragment(
    graphql`
      fragment PosterBylineFragment on Actor {
        name
        profilePicture {
          ...ImageFragment @arguments(width: 60, height: 60)
        }
      }
    `,
    posterRef
  );
  const hoverRef = useRef(null);

  return (
    <div ref={hoverRef} className="byline">
      <Image
        imageRef={actor.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{actor.name}</div>
      <Hovercard targetRef={hoverRef}>
        <PosterDetailsHovercardContents />
      </Hovercard>
    </div>
  );
}
