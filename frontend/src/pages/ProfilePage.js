import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "../components/Profile/UpdateProfile";

function ProfilePage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <UpdateProfile />
    </>
  );
}

export default ProfilePage;


