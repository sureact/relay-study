import * as React from "react";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Image from "./Image";
import Timestamp from "./Timestamp";

import type { PosterDetailsHovercardContentsQuery as QueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";
import type { PosterDetailsHovercardContentsBodyFragment$key } from "./__generated__/PosterDetailsHovercardContentsBodyFragment.graphql";

export default function PosterDetailsHovercardContents({
  posterID,
}: {
  posterID: string;
}): React.ReactElement {
  const data = useLazyLoadQuery<QueryType>(
    graphql`
      query PosterDetailsHovercardContentsQuery($posterID: ID!) {
        node(id: $posterID) {
          ... on Actor {
            ...PosterDetailsHovercardContentsBodyFragment
          }
        }
      }
    `,
    { posterID }
  );
  return (
    <div className="posterHovercard">
      <PosterDetailsHovercardContentsBody poster={data.node} />
    </div>
  );
}

const PosterDetailsHovercardContentsBodyFragment = graphql`
  fragment PosterDetailsHovercardContentsBodyFragment on Actor {
    id
    name
    joined
    profilePicture {
      ...ImageFragment
    }
  }
`;

function PosterDetailsHovercardContentsBody({
  poster,
}: {
  poster: PosterDetailsHovercardContentsBodyFragment$key;
}) {
  const data = useFragment(PosterDetailsHovercardContentsBodyFragment, poster);
  return (
    <>
      <Image
        imageRef={data.profilePicture}
        width={128}
        height={128}
        className="posterHovercard__image"
      />
      <div className="posterHovercard__name">{data.name}</div>
      <ul className="posterHovercard__details">
        <li>
          Joined <Timestamp time={data.joined} />
        </li>
      </ul>
      <div className="posterHovercard__buttons">
        <button>Friend</button>
        <button>Message</button>
      </div>
    </>
  );
}
