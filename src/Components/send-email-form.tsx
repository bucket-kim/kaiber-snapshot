"use client";

import { SyntheticEvent, useState } from "react";
import { Input } from "./UI/input";
import { Button } from "./UI/button";
import Axios from "axios";

const SendEmailForm = () => {
  const [state, setState] = useState<string>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setState("loading");

    console.log("Data to be posted:", {
      clientName: name,
      emailAddress: email,
    });

    try {
      await Axios.post("http://localhost:8080/api/clients", {
        clientName: name,
        emailAddress: email,
      });
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setState("ready");
    }, 1500);
  };

  return (
    <form className="mail-container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          className="Name"
          type="text"
          placeholder="name..."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className="email"
          type="text"
          placeholder="email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <Button className="mail-button" disabled={state === "loading"}>
        Send
      </Button>
    </form>
  );
};

export default SendEmailForm;
