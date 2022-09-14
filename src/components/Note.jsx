import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ShowEntireLogBox from "./ShowEntireLogBox";
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
      <h1 style={{overflow:"hidden"}}>{title}</h1>
      <p style={{overflow:"hidden"}}>{content}</p>
      <small>{months[monthCreated]} {dayCreated}, {yearCreated} at {timeCreated}</small>
      
      <div style={{display:"flex", width:"100%", justifyContent:"flex-end"}}>

        <ShowEntireLogBox title={title} content={content} />
        <button onClick={handleClick}>
          <DeleteIcon />
        </button>

      </div>
    </div>
  );
}

export default Note;
