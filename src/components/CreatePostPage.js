import React, { useEffect, useState, useContext } from "react";
import Header from './routes/Header';
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { UserContext } from "./context/user.context";
import ResponsiveAppBar from "./NavBar";

function CreatePostPage() {
  const [notes, setNotes] = useState([]);

  const {userEmail} = useContext(UserContext);

  useEffect(()=>{
    fetch('http://localhost:2218/all',{
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({"email":userEmail})
    }).then(res => res.json())
    .then((userPosts)=>{
      setNotes(userPosts);
    });
  },[userEmail]);

  function addNote(newNote) {
    fetch("http://localhost:2218/createPost",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application:json'
      },
      body:JSON.stringify(newNote)
    });

    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {

    fetch('http://localhost:2218/delete',{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({id:id})
    });
    

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default CreatePostPage;
