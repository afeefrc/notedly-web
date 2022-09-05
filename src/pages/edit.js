import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

import NoteForm from "../components/NoteForm";
import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from "../gql/mutation";

const EditNote = (props) => {
  const { id } = useParams(props);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { id: id },
  });
  //get current users data
  const { data: userdata } = useQuery(GET_ME);
  //define our mutation
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id,
    },
    onCompleted: () => {
      navigate(`/note/${id}`);
    },
  });

  if (loading) return "Loading...";
  if (error) return <p>Error! note not found</p>;
  //check authorization
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
