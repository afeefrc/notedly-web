import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import NoteForm from "../components/NoteForm";

import { GET_NOTES, GET_MY_NOTES } from "../gql/query";

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const NewNote = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "New Note - Notedly";
  });
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    //refresh the GET_NOTES and GET_MY_NOTES query to update the cache
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: (data) => {
      navigate(`/note/${data.newNote.id}`);
    },
  });

  return (
    <React.Fragment>
      {/* if loading */}
      {loading && <p>Loading...</p>}
      {/* if error */}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;
