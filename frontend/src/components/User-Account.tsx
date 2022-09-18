// As best practice > replace any with the structure of user-data
function UserAccount(props: { data: any }) {
  const userData = props.data;
  console.log({userData})
  const username = userData.username;
  const userAccountJSX = (
    <div>
      <h1>Welcome to Scratch-Up {username}</h1>
    </div>
  );
  return userAccountJSX;
}

export default UserAccount;
