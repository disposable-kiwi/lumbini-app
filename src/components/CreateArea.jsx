import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  //the state of isExpanded is used to keep track of whether or not the <CreateArea> Component has been expanded to show the title <input>
  //it is initially set to false to indicate that it has not been expanded yet

  //we seek to add functionality that sets the state of isExpanded to "true" when clicked and then tie that boolen value
  //to a function that will expand the boxes when isExpanded === true and we want this isExpanded to be toggled to true
  //*only when* the <textarea> is clicked on, which means we need to add an onClick attribute to the <textarea> element
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  //this function is called when the <button> element is clicked since it is
  //tied to the onClick attribute in the <button> element
  function expand() {
    //we want the <textarea> to expand when the <button> is clicked so
    //we will want to set the state of isExpanded to "true"
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {/* this ternary operator makes it so that the title <input> is only shown/rendered 
        when isExpanded is "true", otherwise nothing happens which is captured in null  */}
        {isExpanded ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          //this ternary operator sets the rows of the <textarea> to 3 when isExpanded is true
          //which only happens when the <textarea> is clicked on as evidenced by the <textarea>'s onClick attribute
          //this in effect expands the <textarea> when clicked on by adding rows from "1" to "3"
          rows={isExpanded ? "3" : "1"}
        />
        {/* only presents the <AddIcon> if the element has been expanded meaning 
        that the title <textarea> has been clicked into, switching the state of isExpanded to true */}
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
