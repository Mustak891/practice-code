// import './App.css';
// import { TodoWrapper } from './components/TodoWrapper';
// import { useState, useEffect } from 'react';

// function App() {
//   // const countries = [
//   // { name: "India", value: "IN", cities: ["Delhi", "Mumbai"] },
//   // { name: "Pak", value: "PK", cities: ["Lahore", "Karachi"] },
//   // { name: "Bangladesh", value: "BG", cities: ["Dhaka", "Chittagong"] }
//   // ];

//   // const [country, setCountry] = useState([]);

//   // useEffect(() => {
//   //       console.log(country[0]);
//   //       console.log(country[1]);
//   //     }, [country]);

//   const arr = ["play cricket", "play video game", "read book", "bade"];

//   const [task, setTask] = useState([]);
//   const [words, setWords] = useState(arr);

//   console.log(task);
//   // console.log(setTask(task))

//   const handleChange = (item) => {
//     if (task.includes(item)) {
//       setTask(task.filter((w) => w !== item));
//     }
//     else {
//       setTask([...task, item])
//     }
//   }

//   const handleDelete = () => {
//     setWords(words.filter((w) => !task.includes(w)))
//     setTask([])
//   }

//   return (
//     <div className="App">
//       {/* <TodoWrapper /> */}
//       <ul>
//         {words.map((item, index) => (
//           <li key={index}>
//             <input type='checkbox' onChange={() => handleChange(item)} checked={task.includes(item)} />
//             {item}
//             {
//               task.includes(item) &&
//               <button onClick={handleDelete}>delete</button>
//             }
//           </li>
//         ))}
//       </ul>

//       {/* <select onChange={(e) => {
//         setCountry([e.target.value]);
//         console.log(e.target.value);
//       }} value={country}>
//         {countries.map((item, index) => {
//           return <option key={index} value={index}>{item.name}</option>
//         })}
//       </select>

//       <select >
//         {countries[country] && countries[country].cities.map((item, index) => {
//           return <option value={index}>{item}</option>
//         })}
//       </select> */}

//     </div>
//   );
// }

// export default App;

import "./App.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Pill from "./components/Pill";

const App = () => {
  // https://dummyjson.com/users/search?q=John

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  const initialRef = useRef(null);

  const handleSelectUser = (user) => {
    setSelected([...selected, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestion([]);
    initialRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updateUser = selected.filter((select) => select.id !== user.id);
    setSelected(updateUser);

    const updatedEmail = new Set(selectedUserSet);
    updatedEmail.delete(user.email);
    setSelectedUserSet(updatedEmail);
  };

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim === "") {
        setSuggestion([]);
        return;
      }

      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestion(data))
        .catch((err) => console.log(err));
    };

    fetchUsers();
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && e.target.value === "" && selected.length > 0) {
      const lastUser = selected[selected.length - 1];
      handleRemoveUser(lastUser);
      setSuggestion([]);
    }
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* pills */}
        {selected.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
        {/* input field with suggestion */}
        <div>
          <input
            ref={initialRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search for a user... "
            onKeyDown={handleKeyDown}
          />
          {/* search suggestion */}
          <ul className="suggestions-list">
            {suggestion?.users?.map((user, index) => {
              return !selectedUserSet.has(user.email) ? (
                <li key={user.email} onClick={() => handleSelectUser(user)}>
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ) : (
                <></>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

// import "./styles.css";
// import { useEffect, useState } from "react";
// const countries = [
//   { name: "India", value: "IN", cities: ["Delhi", "Mumbai"] },
//   { name: "Pak", value: "PK", cities: ["Lahore", "Karachi"] },
//   { name: "Bangladesh", value: "BG", cities: ["Dhaka", "Chittagong"] }
// ];

// export default function App() {
//   // state to store the value of the country
//   const [country, setCountry] = useState([]);

//   useEffect(() => {
//     console.log(country[0]);
//     console.log(country[1]);
//   }, [country]);

//   return (
//     <div className="App">
//       {/* 1st DropDown */}
//       <select
//         value={country}
//         onChange={(e) => {
//           console.log(e.target.value);
//           setCountry([e.target.value]);
//         }}
//       >
//         {countries.map((item, index) => {
//           return (
//             <option key={index} value={index}>
//               {item.name}
//             </option>
//           );
//         })}
//       </select>

//       {/* 2nd DropDown */}

//       <select>
//         {countries[country] &&
//           countries[country].cities.map((item, index) => {
//             return <option value={index}>{item}</option>;
//           })}
//       </select>
//     </div>
//   );
// }
