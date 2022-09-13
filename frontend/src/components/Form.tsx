import "../css/form.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { ChangeEvent, useState } from "react";
import validate from "../validations";
import constants from "../constants";

const backend = constants.backend;

interface IFormData {
  email: string;
  password: string;
  username: string;
}

function Form() {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    username: "",
  });

  const [error, setError] = useState("");

  const errorCleaner = (timeInSeconds: number) => {
    const timeInMilliSeconds = timeInSeconds * 1000;
    setTimeout(() => {
      setError("");
    }, timeInMilliSeconds);
  };

  const errorHandler = (error: any) => {
    if (typeof error !== "string") {
      error = "Failed to sign up";
    }
    errorCleaner(3);
    setError(error);
  };

  function collectFormData(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const key = target.name;
    const value = target.value;

    setFormData((previousData: IFormData) => {
      return {
        ...previousData,
        [key]: value,
      };
    });
  }

  async function signUp() {
    const data = formData;
    try {
      validate({ data, schema: "signUp" });
      const response = await fetch(`${backend}/sign-up`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      ///////////////////////////////////////////////////////
      console.log(result);
      ///////////////////////////////////////////////////
      const { code, error } = result;
      if (code !== 200) {
        throw error;
      }
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  async function signIn() {
    const data = formData;
    try {
      validate({ data, schema: "signIn" });
      const response = await fetch(`${backend}/sign-in`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      ///////////////////////////////////////////////////////
      console.log(result);
      ///////////////////////////////////////////////////
      const { code, error } = result;
      if (code !== 200) {
        throw error;
      }
    } catch (error: any) {
      return errorHandler(error);
    }
  }

  const formJSX = (
    <div id="form-parent">
      {error && (
        <Alert id="form-error" severity="error">
          {error}
        </Alert>
      )}
      <TextField
        name="email"
        id="email"
        type={"email"}
        required={true}
        label={"Email"}
        className="formField"
        onChange={collectFormData}
        value={formData.email}
      />
      <br />
      <TextField
        name="password"
        id="password"
        type={"password"}
        required={true}
        label={"Password"}
        className="formField"
        onChange={collectFormData}
        value={formData.password}
      />
      <br />
      <TextField
        name="username"
        id="username"
        type={"text"}
        required={true}
        label={"Username"}
        className="formField"
        onChange={collectFormData}
        value={formData.username}
      />
      <br />
      <div id="form-buttons">
        <Button onClick={signUp} variant={"contained"}>
          Sign Up
        </Button>
        <Button onClick={signIn} variant={"contained"}>
          Sign In
        </Button>
      </div>
    </div>
  );

  return formJSX;
}

export default Form;
