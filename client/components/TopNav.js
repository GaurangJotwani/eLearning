import Link from "next/link";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const TopNav = () => {
  const menuItems = [
    {
      label: <Link href="/">App</Link>,
      key: "app",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link href="/login">Login</Link>,
      key: "login",
      icon: <LoginOutlined />,
    },
    {
      label: <Link href="/register">Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
    },
  ];
  return (
    <>
      <Menu items={menuItems} mode="horizontal" />
    </>
  );
};

export default TopNav;
