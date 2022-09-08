import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "../Footer";
import Note from "../Note";


function AllPosts() {
  const [notes, setNotes] = useState([]);

  const userEmail = "bonkers@gmail.com";

  useEffect(() => {
    fetch(`http://localhost:2218/posts/${userEmail}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': `http://localhost:3000`
      }
    }).then(res => res.json())
      .then((userPosts) => {
        setNotes(userPosts);
      });
  }, []);


  function deleteNote(id) {
    try {
      fetch(`http://localhost:2218/delete/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      alert(error);
    }

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
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

export default AllPosts;
