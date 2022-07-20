import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import session from "redux-persist/lib/storage/session";
import AccessForbidden from "../modules/403/AccessForbidden";
import Content from "../modules/UserPanel/Content";
import Sidebar from "../modules/UserPanel/Sidebar";
import { RootState } from "../Redux/store";

function UserPanel() {
  const Session =
    useSelector((state: RootState) => state.AuthReducer.Session) || {};
  return (
    <div>
      <Head>
        <title>Workoutly Ecommerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="shortcut icon" href="/Logo.ico" type="image/x-icon" />
      </Head>
      <main style={{ display: "flex" }}>
        {Session.Auth !== undefined ? (
          <>
            <Sidebar />
            <Content />
          </>
        ) : (
          <AccessForbidden />
        )}
      </main>
    </div>
  );
}

export default UserPanel;
