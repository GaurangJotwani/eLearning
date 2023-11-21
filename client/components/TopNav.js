import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";

import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { SubMenu } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({
      type: "LOGOUT",
    });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  let menuItems = [
    {
      label: <Link href="/">App</Link>,
      key: "/",
      icon: <AppstoreOutlined />,
      onClick: (e) => setCurrent(e.key),
    },
    // Conditionally render Login and Register links
    ...(user
      ? [
          {
            label: `${user.name}`,
            className: "ms-auto",
            icon: <CoffeeOutlined />,
            children: [
              {
                label: "Logout",
                icon: <LogoutOutlined />,
                onClick: () => logout(),
              },
            ],
          },
        ]
      : [
          {
            label: <Link href="/login">Login</Link>,
            key: "/login",
            icon: <LoginOutlined />,
            onClick: (e) => setCurrent(e.key),
          },
          {
            label: <Link href="/register">Register</Link>,
            key: "/register",
            icon: <UserAddOutlined />,
            onClick: (e) => setCurrent(e.key),
          },
        ]),
  ];
  return (
    <>
      <Menu items={menuItems} mode="horizontal" selectedKeys={[current]} />
    </>
  );
};

export default TopNav;
