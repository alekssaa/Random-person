import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState();
  const [title, setTaitle] = useState("name");
  const [value, setValue] = useState();

  const getPerson = async () => {
    try {
      const responese = await fetch(url);
      const data = await responese.json();
      const {
        id,
        email,
        phone,
        location: {
          street: { number, name },
        },
        login: { password },
        dob: { age },
        name: { first, last },
        picture: { large: image },
      } = data.results[0];
      const newPersone = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };
      setPerson(newPersone);
      setIsLoading(false);
      setTaitle("name");
      setValue(newPersone.name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPerson();
  }, []);
  const handleValue = (e) => {
    const labela = e.target.classList.contains("icon")
      ? e.target.dataset.label
      : e.target.parentElement.classList.contains("icon")
      ? e.target.parentElement.dataset.label
      : e.target.parentElement.parentElement.dataset.label;

    setTaitle(labela);
    setValue(person[labela]);
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={person?.image} />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onClick={handleValue}>
              <FaUser />
            </button>
            <button className="icon" data-label="email" onClick={handleValue}>
              <FaEnvelopeOpen />
            </button>{" "}
            <button className="icon" data-label="age" onClick={handleValue}>
              <FaCalendarTimes />
            </button>{" "}
            <button className="icon" data-label="street" onClick={handleValue}>
              <FaMap />
            </button>
            <button className="icon" data-label="phone" onClick={handleValue}>
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onClick={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button
            className="btn"
            type="btn"
            onClick={() => {
              getPerson();
            }}
          >
            Get user
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
