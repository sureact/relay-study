import * as React from "react";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Image from "./Image";
import Timestamp from "./Timestamp";

import type { PosterDetailsHovercardContentsQuery as QueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";
import type { PosterDetailsHovercardContentsBodyFragment$key } from "./__generated__/PosterDetailsHovercardContentsBodyFragment.graphql";

export const PosterDetailsHovercardContentsQuery = graphql`
  query PosterDetailsHovercardContentsQuery($posterID: ID!) {
    node(id: $posterID) {
      ... on Actor {
        ...PosterDetailsHovercardContentsBodyFragment
      }
    }
  }
`;

export default function PosterDetailsHovercardContents({
  queryRef,
}: {
  queryRef: PreloadedQuery<QueryType>;
}): React.ReactElement {
  const data = usePreloadedQuery<QueryType>(
    PosterDetailsHovercardContentsQuery,
    queryRef
  );
  return (
    <div className="posterHovercard">
      <PosterDetailsHovercardContentsBody poster={data.node} />
    </div>
  );
}

function PosterDetailsHovercardContentsBody({
  poster,
}: {
  poster: PosterDetailsHovercardContentsBodyFragment$key;
}) {
  const actor = useFragment(
    graphql`
      fragment PosterDetailsHovercardContentsBodyFragment on Actor {
        id
        name
        joined
        profilePicture {
          ...ImageFragment
        }
        ... on Organization {
          organizationKind
        }
        ... on Person {
          location {
            name
          }
        }
      }
    `,
    poster
  );

  return (
    <>
      <Image
        imageRef={actor.profilePicture}
        width={128}
        height={128}
        className="posterHovercard__image"
      />
      <div className="posterHovercard__name">{actor.name}</div>
      <ul className="posterHovercard__details">
        <li>
          Joined <Timestamp time={actor.joined} />
        </li>
        {actor.location && <li>{actor.location.name}</li>}
        {actor.organizationKind && (
          <li>Organization Kind={actor.organizationKind}</li>
        )}
      </ul>
      <div className="posterHovercard__buttons">
        <button>Friend</button>
        <button>Message</button>
      </div>
    </>
  );
}
