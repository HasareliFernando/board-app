import React from "react";
import { Space, Tag, Avatar, Divider, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import KanbanBoard from "@/components/KanbanBoard";

export default function SportXiProjectLayout() {
  return (
    <>
      <header className="bg-white !min-h-fit h-1/3 flex justify-between ml-1 pt-5 pl-5 pb-5 !text-black">
        <Space direction="vertical" size={7} className="w-full">
          <span className="text-xl font-bold text-black-700 ">
            Sport Xi Project{" "}
            <Tag color="#FFA800" className="ml-20">
              In Progress
            </Tag>
          </span>
          <span className="text-base text-gray-300 ">event production</span>
          <span className="text-base text-gray-300 ">
            assigned
            <Avatar.Group
              maxCount={3}
              size="small"
              className="ml-3"
              maxStyle={{ backgroundColor: "#B1B5C3" }}
            >
              <Avatar
                style={{ backgroundColor: "#353945" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#353945" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#353945" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#353945" }}
                icon={<UserOutlined />}
              />
              <Avatar
                style={{ backgroundColor: "#353945" }}
                icon={<UserOutlined />}
              />
            </Avatar.Group>
            <Button
              className="bg-transparent border-2 !border-gray-300 !rounded-xl !text-gray-300 ml-3"
              icon={<EditOutlined />}
              iconPosition="end"
            >
              Manage
            </Button>
          </span>
          <Divider className="!w-full" />
          <span className="text-base text-gray-300 ">
            Last Updated on 04th April,2022
          </span>
        </Space>
      </header>
      <div className="h-2/3 flex flex-1 justify-between">
        <KanbanBoard
        // category={1}
        // title="jjh"
        // key={1}
        // teamlist={[{ id: 12, img: "" }]}
        // priority="Low"
        // linkcount={2}
        // messagecount={3}
        // duedate="2025-2-2"
        // reports={3}
        // stream={true}
        // groupcall={true}
        // imagesrc="/images/Rectangle_60.png"
        />
      </div>
    </>
  );
}
