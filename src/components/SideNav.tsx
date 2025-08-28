//Create - HF
//Description -  Dashboard HeaderBar

import React, { ReactNode } from "react";
import { useState } from "react";
import { Avatar, Space, Button } from "antd";
import { useRouter } from "next/router";
import {
  UserOutlined,
  AppstoreOutlined,
  DownOutlined,
  UpOutlined,
  CalendarOutlined,
  MessageOutlined,
  RightOutlined,
  FolderOutlined,
  ToTopOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";

interface MenuItem {
  key: number;
  label: string;
  url: string;
  className: string;
  type: "TextButton" | "Dropdown" | "BottomButton";
  icon: ReactNode;
  badge: number;
  show: boolean;
  dropdownlist?: {
    key: number;
    label: string;
    url: string;
  }[];
}

const SideNav: React.FC = () => {
  const menuItem: MenuItem[] = [
    {
      key: 1,
      label: "Dashboard",
      type: "TextButton",
      url: "/dashboard",
      show: false,
      className: '',
      icon: <AppstoreOutlined />,
      badge: 0,
    },
    {
      key: 2,
      label: "Boards",
      type: "Dropdown",
      url: "",
      className: '',
      icon: <FolderOutlined />,
      show: false,
      dropdownlist: [
        {
          key: 6,
          label: "Create routes",
          url: "/dashboard",
        },
        {
          key: 7,
          label: "Development React App",
          url: "/dashboard",
        },
        {
          key: 8,
          label: "Sport Xi Project",
          url: "/sportxiproject",
        },
        {
          key: 9,
          label: "Wordpress theme",
          url: "/dashboard",
        },
      ],
      badge: 0,
    },
    {
      key: 3,
      label: "Messages",
      type: "TextButton",
      url: "/dashboard",
      show: false,
      className: '',
      icon: <MessageOutlined />,
      badge: 3,
    },
    {
      key: 4,
      label: "Calendar",
      type: "TextButton",
      url: "/dashboard",
      className: '',
      icon: <CalendarOutlined />,
      show: false,
      badge: 0,
    },
    {
      key: 5,
      label: "Team members",
      type: "TextButton",
      url: "/dashboard",
      className: '',
      icon: <UserOutlined />,
      show: false,
      badge: 0,
    },
    {
      key: 6,
      label: "Support",
      type: "BottomButton",
      url: "/dashboard",
      className: 'support-btn',
      icon: <InfoCircleOutlined />,
      show: false,
      badge: 0,
    },
    {
      key: 7,
      label: "Logout",
      type: "BottomButton",
      url: "/dashboard",
      className: 'logout-btn',
      icon: <ToTopOutlined className="rotate-270" />,
      show: false,
      badge: 0,
    },
  ];
  const router = useRouter();
  const [selected, setSelected] = useState<Number>(1);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menuItem);

  const handleSelect = (key: number, url: string) => {
    setSelected(key);
    router.push(url);
    setMenuItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, show: !item.show } : item
      )
    );
  };

  return (
    <header className="bg-white lg:w-1/5 md:w-1/4  pr-1">
      <Space direction="vertical" size="small" className="w-full px-7">
        <Button type="default" className="!h-20 !w-full flex items-center mt-8">
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
                  onClick={() => handleSelect(item.key, item.url)}
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
                        } text-base font-semibold`}
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
                    onClick={() => handleSelect(item.key, item.url)}
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
                        } text-base font-semibold`}
                      />

                      <div className="flex flex-col text-left leading-tight ml-2">
                        <span
                          className={`!bg-transparent ${
                            selected === item.key
                              ? "!text-blue-500"
                              : "!text-gray-500"
                          } text-base font-semibold`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </span>
                    {item.show ? (
                      <UpOutlined
                        className={`ml-auto text-xs justify-end ${
                          selected === item.key
                            ? "!text-blue-500"
                            : "!text-gray-500"
                        }`}
                      />
                    ) : (
                      <DownOutlined
                        className={`ml-auto text-xs justify-end ${
                          selected === item.key
                            ? "!text-blue-500"
                            : "!text-gray-500"
                        }`}
                      />
                    )}
                  </Button>
                  <div
                    hidden={!item.show}
                    className={`${
                      item.show
                        ? "!border !border-gray-300 rounded"
                        : "!border-none"
                    }`}
                  >
                    {item.dropdownlist?.map((subitem) => (
                      <Button
                        onClick={() => handleSelect(subitem.key, subitem.url)}
                        type="text"
                        className="!h-10 !w-full flex !justify-start items-center gap-3 px-4"
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
                            } text-base`}
                          >
                            {subitem.label}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </>
              );
            } else {
              return (
                <Button
                  onClick={() => handleSelect(item.key, item.url)}
                  type="text"
                  className={`!h-15 ${item?.className} w-60 flex items-center gap-3 px-4 ${
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
                        } text-base font-semibold`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </span>
                </Button>
              );
            }
          })}
        </Space>
      </Space>
    </header>
  );
};

export default SideNav;
