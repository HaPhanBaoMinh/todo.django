import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ROUTER from "../api/server";
import AuthContext from "../context/AuthContext";

export const Home = () => {
  const { logoutUser, Auth, tokens } = useContext(AuthContext);
  const [notes, setNotes] = useState([])
  // "Content-Type": "application/json",
  //         "Authorization": `Bearer ${tokens.access}`

  useEffect(() => {
    getNotes()
  }, [])
  const getNotes = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokens.access}`
        }
      }
      const response = await axios.get(`${ROUTER}/api/notes`, config)
      const data = await response.data;
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full h-full p-10"> 
      <h1 className="text-3xl font-bold">Welcomeback! {Auth.username}</h1>
      <button onClick={(e) => logoutUser(e)} className="py-1 px-4 font-medium text-white bg-blue-400 rounded-md text-xl" >Logout</button>

      <h4 className="text-xl font-bold mt-5">Note list</h4>
      <ul className="list-disc pl-5">
        {
          notes.map((note) => <li key={note.id}>{note.body}</li>)
        }
      </ul>
    </div>
  );
};
