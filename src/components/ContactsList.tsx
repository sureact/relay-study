import * as React from "react";
import { useState, useTransition } from "react";
import { graphql } from "relay-runtime";
import { useRefetchableFragment } from "react-relay";
import type { ContactsListFragment$key } from "./__generated__/ContactsListFragment.graphql";
import Card from "./Card";
import ContactRow from "./ContactRow";
import SearchInput from "./SearchInput";

export type Props = {
  viewer: ContactsListFragment$key;
};

export default function ContactsList({ viewer }: Props) {
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment ContactsListFragment on Viewer
      @refetchable(queryName: "ContactsListRefetchQuery")
      @argumentDefinitions(search: { type: "String", defaultValue: null }) {
        contacts(search: $search) {
          id
          ...ContactRowFragment
        }
      }
    `,
    viewer
  );
  const [isPending, startTransition] = useTransition();
  const [searchString, setSearchString] = useState("");

  const handleSearchInputChange = (value: string) => {
    setSearchString(value);
    startTransition(() => {
      refetch({ search: value });
    });
  };

  return (
    <Card dim={true}>
      <h3>Contacts</h3>
      <SearchInput
        value={searchString}
        onChange={handleSearchInputChange}
        isPending={isPending}
      />
      {data.contacts.map((contact) => (
        <ContactRow key={contact.id} contact={contact} />
      ))}
    </Card>
  );
}
