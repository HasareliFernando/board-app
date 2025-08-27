//Create - HF
//Description -  Dashboard Headerbar

import React, { ReactNode } from "react";
import { useState } from "react";
import { Input, Avatar, Typography, Space, Button } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  DownOutlined,
  UpOutlined,
  CalendarOutlined,
  MessageOutlined,
  FileOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface MenuItem {
  key: number;
  label: string;
  type: "TextButton" | "Dropdown";
  icon: ReactNode;
  badge: number;
  show: boolean;
  dropdownlist?: {
    key: number;
    label: string;
  }[];
}

const SideNav: React.FC = () => {
  
  const menuItem: MenuItem[] = [
    {
      key: 1,
      label: "Dashboard",
      type: "TextButton",
      show: false,
      icon: <AppstoreOutlined />,
      badge: 0,
    },
    {
      key: 2,
      label: "Boards",
      type: "Dropdown",
      icon: <FileOutlined />,
      show: false,
      dropdownlist: [
        {
          key: 6,
          label: "Create routes",
        },
        {
          key: 7,
          label: "Development React App",
        },
        {
          key: 8,
          label: "Sport Xi Project",
        },
        {
          key: 9,
          label: "Wordpress theme",
        },
      ],
      badge: 0,
    },
    {
      key: 3,
      label: "Messages",
      type: "TextButton",
      show: false,
      icon: <MessageOutlined />,
      badge: 3,
    },
    {
      key: 4,
      label: "Calendar",
      type: "TextButton",
      icon: <CalendarOutlined />,
      show: false,
      badge: 0,
    },
    {
      key: 5,
      label: "Team members",
      type: "TextButton",
      icon: <UserOutlined />,
      show: false,
      badge: 0,
    },
  ];

  const [selected, setSelected] = useState<Number>(1);
  const [menuItems, setMenuItems] = useState(menuItem);

  const handleSelect = (key: number) => {
    
    setSelected(key);
    setMenuItems(prev =>
      prev.map(item =>
        item.key === key
          ? { ...item, show: !item.show }
          : item 
      )
    );
  };

  return (
    <header className="bg-[#ffffff] lg:w-1/5 md:w-1/4  pr-1">
      <Space direction="vertical" size="small" className="w-full px-7">
        <Button
          type="default"
          className="!h-20 !w-full flex items-center mt-10"
        >
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="justify-start !bg-gray-700"
          />
          <div className="flex flex-col text-left leading-tight">
            <span className="text-xs text-gray-500">workspace</span>
            <span className="text-base font-semibold text-gray-700">
              Root folder
            </span>
          </div>
          <DownOutlined className="ml-auto text-xs justify-end" />
        </Button>
        <Space direction="vertical" size={10} className="w-full">
          {menuItems.map((item) => {
            if (item.type === "TextButton") {
              return (
                <Button
                  onClick={() => handleSelect(item.key)}
                  type="text"
                  className={`!h-15 !w-full flex items-center gap-3 px-4 ${
                    selected === item.key
                      ? "!border !border-gray-300 rounded"
                      : "!border-none"
                  }`}
                >
                  <span className="!w-full flex !justify-start items-center ">
                    <Avatar
                      size="large"
                      icon={item.icon}
                      className={`!bg-transparent ${
                        selected === item.key
                          ? "!text-blue-500"
                          : "!text-gray-500"
                      } text-xl`}
                    />

                    <div className="flex flex-col text-left leading-tight ml-2">
                      <span
                        className={`!bg-transparent ${
                          selected === item.key
                            ? "!text-blue-500"
                            : "!text-gray-500"
                        } text-xl`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </span>
                  {item.badge ? (
                    <Badge
                      count={item.badge}
                      className="ml-auto text-xs !float-right "
                    ></Badge>
                  ) : (
                    ""
                  )}
                </Button>
              );
            } else if (item.type === "Dropdown") {
              return (
                <>
                  <Button
                    onClick={() => handleSelect(item.key)}
                    type="text"
                    className={`!h-15 !w-full flex items-center gap-3 px-4 ${
                      selected === item.key
                        ? "!border !border-gray-300 rounded"
                        : "!border-none"
                    }`}
                  >
                    <span className="!w-full flex !justify-start items-center ">
                      <Avatar
                        size="large"
                        icon={item.icon}
                        className={`!bg-transparent ${
                          selected === item.key
                            ? "!text-blue-500"
                            : "!text-gray-500"
                        } text-xl`}
                      />

                      <div className="flex flex-col text-left leading-tight ml-2">
                        <span
                          className={`!bg-transparent ${
                            selected === item.key
                              ? "!text-blue-500"
                              : "!text-gray-500"
                          } text-xl`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </span>
                   { item.show ? <UpOutlined
                      className={`ml-auto text-xs justify-end ${
                        selected === item.key
                          ? "!text-blue-500"
                          : "!text-gray-500"
                      }`}
                    />:
                    <DownOutlined
                      className={`ml-auto text-xs justify-end ${
                        selected === item.key
                          ? "!text-blue-500"
                          : "!text-gray-500"
                      }`}
                    />}

                  </Button>
                  <div hidden={!item.show} className={`${
                      item.show
                        ? "!border !border-gray-300 rounded"
                        : "!border-none"
                    }`}>
                    {item.dropdownlist?.map((subitem) => (
                      <Button
                        onClick={() => handleSelect(subitem.key)}
                        type="text"
                        className="!h-15 !w-full flex !justify-start items-center gap-3 px-4"
                      >
                        <RightOutlined
                          className={`text-xs justify-start !bg-transparent ${
                            selected === subitem.key
                              ? "!text-blue-500"
                              : "!text-gray-400"
                          } text-lg`}
                        />
                        <div className="flex flex-col leading-tight ml-2">
                          <span
                            className={`!bg-transparent ${
                              selected === subitem.key
                                ? "!text-blue-500"
                                : "!text-gray-400"
                            } text-lg`}
                          >
                            {subitem.label}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </>
              );
            }
          })}
        </Space>
      </Space>
    </header>
  );
};

export default SideNav;
