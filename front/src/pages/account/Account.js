import { Outlet } from "react-router-dom";

const Account = (props) => {
  return (
    <div className="loginContainer">
      <div className="accountContainer">
      <div className='accountHeader'>
      <p>this is account page</p>
      <p>Login/out</p>
      <p>to show order history</p>
      <p>to show/update personal info</p>
      </div>
      </div>
      <p>this is accouunt in page</p>
      <Outlet />
    </div>  
  );
}
export default Account;