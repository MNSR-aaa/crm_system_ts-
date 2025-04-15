import { Outlet } from "react-router";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { Box, Burger } from "@mantine/core";
import { useEffect } from "react";
import useUserStore from "../../store/userStore";
import useBurgerStore from "../../store/burgerStore";

import { useNavigate } from "react-router";

export default function Overlay() {
  const navigate = useNavigate();

  const { getUserFromToken } = useUserStore();
  const { isOpened, isBurgerPressed } = useBurgerStore();

  useEffect(() => {
    getUserFromToken().catch((error: Error) => {
      navigate("/signIn");
      console.log("Error while getting user from token", error);
    });
  }, []);

  return (
    <div>
      <TopBar />

      <Burger onClick={() => isBurgerPressed()} />

      {isOpened && <SideBar />}

      <Box left={300} top={78} bottom={0} right={0} pos="absolute">
        <Outlet />
      </Box>
    </div>
  );
}
