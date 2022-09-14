import React, { useState, useEffect, useContext } from "react";
import Footer from "../Footer";
import Note from "../Note";
import { UserContext } from "../context/user.context";
import DateSelect from "../DateSelect";
import { months } from "../../months";
import AffirmDialog from "../AffirmDialog";
import { TextField } from "@mui/material";
import BootHeader from "./BootHeader";


function AllPosts() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [search, setSearch] = useState('');
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

  useEffect(() => {
    if (!monthSearch && !search) {
      setFilteredNotes(notes);
    } else if (!monthSearch && search) {
      const returnArray = notes.filter((post) => {
        console.log(post.title);
        return post.title.toLowerCase().includes(search);
      });
      setFilteredNotes(returnArray);
    } else {
      const newArray = notes.filter((post) => {
        return post.monthCreated === months.indexOf(monthSearch);
      });

      const returnArray = newArray.filter((post) => {
        console.log(post.title);
        return post.title.toLowerCase().includes(search);
      });
      setFilteredNotes(returnArray);
    }
  }, [notes, monthSearch, search]);

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

  function monthFilter(month) {
    setMonthSearch(month);
  }

  function searchFilter(e) {
    const logSearch = e.target.value.toLowerCase();
    setSearch(logSearch);
  }

  return (
    <>
    <BootHeader />
    <div style={{display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column", minHeight:"100vh"}}>
      <div className="all-posts-bar">
        <AffirmDialog className="affirm-button" />
        <h5 className="greeting all-postspage-text">Let's see what's been on your mind lately, {user.userName}.</h5>
      </div>
      <div className="all-posts-select">

        <TextField
          label="Search for a Log"
          id="logSearch"
          size="medium"
          variant="standard"
          value={search}
          onChange={searchFilter}
        />
        <DateSelect monthFilter={monthFilter} />

      </div>
      <div className="all-posts-container">
          {filteredNotes.map((noteItem) => {
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
    </>
  );
}

export default AllPosts;
