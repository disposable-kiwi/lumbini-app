import React, {useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { months } from "../months";

function Note({note, onDelete}) {

  const{id, title, content, monthCreated, dayCreated, yearCreated, timeCreated} =  note;

  function handleClick() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (isConfirmed) {
      onDelete(id);
    }
  }

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <small>{months[monthCreated]} {dayCreated}, {yearCreated} at {timeCreated}</small>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
