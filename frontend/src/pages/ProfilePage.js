import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProfilePage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, []);

  return <div>profile page</div>;
}

export default ProfilePage;
