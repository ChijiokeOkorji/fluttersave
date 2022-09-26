import { Outlet } from "react-router-dom";

import { BottomAppBar } from "../bottom-app-bar";

const HomeLayout = () => {
  return (
    <>
      <Outlet />

      <BottomAppBar />
    </>
  );
};

export { HomeLayout };
