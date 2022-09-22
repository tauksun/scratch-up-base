import "../css/Form.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { ChangeEvent, useEffect, useState } from "react";
import validate from "../validations";
import constants from "../constants";
import LoadingScreenJSX from "./Loading-Screen";
import UserAccountJSX from "./User-Account";

const backend = constants.backend;

interface IFormData {
  email: string;
  password: string;
  username: string;
}

function Form() {
  // useEffect to check & re-direct to userAccount on refresh
  // if user is already logged in i.e., session is active
  useEffect(() => {
    fetchUserData().catch((error) => {});
  }, []);

  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    username: "",
  });

  // Loading Screen //
  const [loading, setLoading] = useState(false);

  // User Account //
  interface IUserAccountData {
    show: boolean;
    data: any;
  }
  const [userAccountData, setUserAccountData] = useState<IUserAccountData>({
    show: false,
    data: {},
  });

  // Form //
  const [showForm, setShowForm] = useState(true);

  // Error //
  const [error, setError] = useState("");

  const errorCleaner = (timeInSeconds: number) => {
    const timeInMilliSeconds = timeInSeconds * 1000;
    setTimeout(() => {
      setError("");
    }, timeInMilliSeconds);
  };

  const errorHandler = (error: any) => {
    if (typeof error !== "string") {
      // Default Error
      error = "Error occured";
    }
    errorCleaner(3);
    setError(error);
  };

  // Api Functions : signIn & signUp //
  async function interaction(interactionEvent: string) {
    const schema = interactionEvent === "sign-in" ? "signIn" : "signUp";
    const interactionRoute =
      interactionEvent === "sign-in" ? "sign-in" : "sign-up";

    const data = formData;
    try {
      validate({ data, schema });
      // Loading
      setLoading(true);
      setShowForm(false);
      const response = await fetch(`${backend}/${interactionRoute}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const { code, error } = await response.json();

      if (code !== 200) {
        throw error;
      }
      await fetchUserData();
    } catch (error: any) {
      setLoading(false);
      setShowForm(true);
      return errorHandler(error);
    }
  }

  function signUp() {
    return interaction("sign-up");
  }

  function signIn() {
    return interaction("sign-in");
  }

  async function fetchUserData() {
    // Fetch User Data //
    const userDataResponse = await fetch(`${backend}/user-data`);
    const userDataResult = await userDataResponse.json();
    if (userDataResult.code !== 200) {
      throw userDataResult.error;
    }
    const userData = userDataResult.data;

    // Show user Account
    setLoading(false);
    setShowForm(false);
    setUserAccountData({ show: true, data: userData });
  }

  // Form //
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

  const showJSX = (
    <div>
      {loading ? <LoadingScreenJSX /> : <div></div>}
      {showForm ? formJSX : <div></div>}
      {userAccountData.show ? (
        <UserAccountJSX data={userAccountData.data} />
      ) : (
        <div></div>
      )}
    </div>
  );

  return showJSX;
}

export default Form;
