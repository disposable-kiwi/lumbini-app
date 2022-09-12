import React, { useEffect, useState, useContext } from "react";
import Header from './routes/Header';
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { UserContext } from "./context/user.context";
import ResponsiveAppBar from "./NavBar";
import { AuthContext } from "./context/auth.context";


function CreatePostPage() {
  const [notes, setNotes] = useState([]);
  const {user} = useContext(UserContext);

  useEffect(()=>{
    let token = localStorage.getItem("jwt");
    const checkAuthentication = () => {
      let headerDetails = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      fetch(`http://localhost:2218/posts`, headerDetails)
        .then(res => res.json())
        .then((objRes) => {
          if (objRes['alert']) {
            alert(objRes['alert']);
          }else{
            const newReversedArray = objRes.slice(-5).reverse();
            console.log(objRes);
            console.log(newReversedArray);
            setNotes(newReversedArray);
          }
        });
    };
      checkAuthentication();
  },[]);

  function addNote(newNote) {
      let token = localStorage.getItem("jwt");
      let headerDetails = {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(newNote)
      };
      fetch("http://localhost:2218/createPost",headerDetails)
      .then(res=>res.json())
      .then((postedNote)=>{
        setNotes(prevNotes => {
          return [postedNote, ...prevNotes];
        });
      });
  }

  function deleteNote(id) {
    let token = localStorage.getItem("jwt");
    fetch('http://localhost:2218/delete',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body:JSON.stringify({id})
    }).then(res=>res.json())
    .then((reply)=>{
      if(reply['success']){
        setNotes(prevNotes => {
          return prevNotes.filter((noteItem) => {
            return noteItem.id !== id;
          });
        });
        alert('Deleted successfully!');
      }else{
        alert(reply);
      }
    });  
  }

  return (
    <div>
      <Header />
      <h5 className="greeting">What's on your mind, {user.userName}?</h5>
      <CreateArea onAdd={addNote} />
      <div>
      <h4>Recent Logs</h4>
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            note={noteItem}
            onDelete={deleteNote}
          />
        );
      })}
      </div>
      <Footer />
    </div>
  );
}

export default CreatePostPage;
