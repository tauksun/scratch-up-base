import "../css/form.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChangeEvent, useState } from "react";
import validate from "../validations";

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

  function signUp() {
    const data = formData;
    try {
      console.log({ data });
      validate({ data, schema: "signUp" });
      console.log("VAlidated > Call Api ");
      console.log({ data });
      // API CAll ////////////////////////////////////////////
      /////////// How to show error ///////////////////
    } catch (error: any) {
      return setError(error);
    }
  }

  function signIn() {
    const data = formData;
    try {
      validate({ data, schema: "signIn" });
      console.log("VAlidated > Call Api ");
      console.log({ data });
      // API CAll ////////////////////////////////////////////
      /////////// How to show error ///////////////////
    } catch (error: any) {
      return setError(error);
    }
  }

  const formJSX = (
    <div id="form-parent">
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
