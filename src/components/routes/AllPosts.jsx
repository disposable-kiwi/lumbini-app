import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Footer from "../Footer";
import Note from "../Note";
import { AuthContext } from "../context/auth.context";
import { UserContext } from "../context/user.context";
import DateSelect from "../DateSelect";
import { months } from "../../months";
import AffirmDialog from "../AffirmDialog";
import { color } from "@mui/system";


function AllPosts() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [monthSearch, setMonthSearch] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
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
          if (objRes['error']) {
            alert(objRes['error']);
          } else {
            console.log(objRes);
            setNotes(objRes);
          }
        });
    };
    checkAuthentication();
  }, []);

  useEffect(()=>{
    if(monthSearch===''){
      setFilteredNotes(notes);
    }else{
      const newArray = notes.filter((post)=>{
        return post.monthCreated === months.indexOf(monthSearch);
      });
  
      setFilteredNotes(newArray);
    }
  },[notes, monthSearch]);

  function deleteNote(id) {
    let token = localStorage.getItem("jwt");
    fetch('http://localhost:2218/delete', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    }).then(res => res.json())
      .then((reply) => {
        if (reply['success']) {
          setNotes(prevNotes => {
            return prevNotes.filter((noteItem) => {
              return noteItem.id !== id;
            });
          });
          alert('Deleted successfully!');
        } else {
          alert(reply);
        }
      });
  }

  function monthFilter(month){
    setMonthSearch(month);
  }

  return (
    <div>
      <Header />
      <div className="all-posts-bar">
        <h5 className="greeting">Let's see what's been on your mind lately, {user.userName}.</h5>
        <div className="all-posts-select">
          <AffirmDialog />
          <DateSelect monthFilter={monthFilter}/>
        </div>
      </div>
      {filteredNotes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            note={noteItem}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default AllPosts;
