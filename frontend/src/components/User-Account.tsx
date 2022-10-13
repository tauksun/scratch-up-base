import "../css/User-Account.css";
import Button from "@mui/material/Button";
import constants from "../react-constants";
import React from "react";
import { IUserAccountData } from "./Form";
// As best practice > replace any with the structure of user-data
function UserAccount(props: {
  data: any;
  setUserAccountData: (params: IUserAccountData) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const setUserAccountData = props.setUserAccountData;
  const setShowForm = props.setShowForm;
  const userData = props.data;
  const username = userData.username;

  const backend = constants.backend;
  const logoutRoute = constants.logoutRoute;

  function resetPage() {
    setUserAccountData({
      show: false,
      data: {},
    });
    setShowForm(true);
  }

  async function logOut() {
    try {
      const response = await fetch(`${backend}/${logoutRoute}`);

      const { code, error } = await response.json();

      if (code !== 200) {
        throw error;
      }
      resetPage();
    } catch (error) {
      // Do something with error
      resetPage();
    }
  }

  const userAccountJSX = (
    <div id="userAccount">
      <h2>Welcome to Scratch-Up {username}</h2>
      <br />
      <Button onClick={logOut} variant={"contained"}>
        Log out
      </Button>
    </div>
  );
  return userAccountJSX;
}

export default UserAccount;
