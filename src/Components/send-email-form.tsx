"use client";

import { useState } from "react";
import { Input } from "./UI/input";
import { Button } from "./UI/button";

const SendEmailForm = () => {
  const [state, setState] = useState<string>();

  const isInputNamedElement = (
    e: Element
  ): e is HTMLInputElement & { name: string } => {
    return "value" in e && "name" in e;
  };

  const handleOnSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: Record<string, string> = {};

    Array.from(e.currentTarget.elements)
      .filter(isInputNamedElement)
      .forEach((field) => {
        if (!field.name) return;
        formData[field.name] = field.value;
      });

    setState("loading");

    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        firstName: formData.firstName,
        email: formData.email,
      }),
    });

    setTimeout(() => {
      setState("ready");
    }, 1500);
  };

  return (
    <form className="mail-container" onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <Input id="firstName" name="firstName" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <Input id="email" name="email" />
      </div>
      <Button className="mail-button" disabled={state === "loading"}>
        Send
      </Button>
    </form>
  );
};

export default SendEmailForm;
