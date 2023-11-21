import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const menuItems = [
    {
      label: <Link href="/">App</Link>,
      key: "/",
      icon: <AppstoreOutlined />,
      onClick: (e) => setCurrent(e.key),
    },
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
  ];
  return (
    <>
      <Menu items={menuItems} mode="horizontal" selectedKeys={[current]} />
    </>
  );
};

export default TopNav;
