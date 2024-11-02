import * as React from "react";
import { graphql } from "relay-runtime";
import { ImageFragment$key } from "./__generated__/ImageFragment.graphql";
import { useFragment } from "react-relay";

type Props = {
  imageRef: ImageFragment$key;
  width?: number;
  height?: number;
  className?: string;
};

export default function Image({
  imageRef,
  width,
  height,
  className,
}: Props): React.ReactElement {
  const image = useFragment(
    graphql`
      fragment ImageFragment on Image
      @argumentDefinitions(
        width: { type: "Int", defaultValue: null }
        height: { type: "Int", defaultValue: null }
      ) {
        url(width: $width, height: $height)
        altText
      }
    `,
    imageRef
  );

  return (
    <img
      key={image.url}
      src={image.url}
      alt={image.altText}
      width={width}
      height={height}
      className={className}
    />
  );
}
