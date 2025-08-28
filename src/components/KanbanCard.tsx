import React, { ReactNode, useState, useMemo } from "react";
import Image from "next/image";
import {
  LinkOutlined,
  MessageOutlined,
  CalendarOutlined,
  WarningOutlined,
  BellOutlined,
  UserOutlined,
  ThunderboltOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Flex, Space, Badge, Tag } from "antd";
import { Color } from "antd/es/color-picker";

type ActionWithCountProps = {
  count: any;
  icon: ReactNode;
  key: string;
  color?: string | null;
};

const ActionWithCount: React.FC<ActionWithCountProps> = ({
  icon,
  count,
  key,
  color,
}) => (
  <div className={color ? `!text-[${color}]` : "text-gray"}>
    {icon}
    {count}
  </div>
);

type TaskCardProps = {
  category: number;
  title: ReactNode;
  key: number;
  teamlist: { id: number; img: string }[];
  priority: "High" | "Low" | "Medium";
  imagesrc?: string;
  linkcount: number;
  messagecount: number;
  duedate: string | null;
  reports: number;
  stream: boolean;
  groupcall: boolean;
};

const TaskCard: React.FC<TaskCardProps> = ({
  category,
  title,
  key,
  teamlist,
  priority,
  imagesrc,
  linkcount,
  messagecount,
  duedate,
  reports,
  stream,
  groupcall,
}) => {
  const actions = useMemo(() => {
    const items: ReactNode[] = [];

    if (linkcount > 0) {
      items.push(
        <ActionWithCount key="link" count={linkcount} icon={<LinkOutlined />} />
      );
    }

    if (messagecount > 0) {
      items.push(
        <ActionWithCount
          key="message"
          count={messagecount}
          icon={<MessageOutlined />}
        />
      );
    }

    if (duedate !== null) {
      items.push(
        <ActionWithCount key="duedate" count={""} icon={<CalendarOutlined />} />
      );
    }

    if (reports) {
      items.push(
        <ActionWithCount
          key="reports"
          count={reports + "Reports"}
          icon={<WarningOutlined />}
          color={"#F90430"}
        />
      );
    }

    if (groupcall) {
      items.push(
        <ActionWithCount
          key="groupcall"
          count={"Group Call"}
          icon={<BellOutlined />}
          color={"#3772FF"}
        />
      );
    }

    if (stream) {
      items.push(
        <ActionWithCount
          key="stream"
          count={"Stream"}
          icon={<BellOutlined />}
          color={"#3772FF"}
        />
      );
    }

    return items;
  }, []);

  return (
    <Flex gap="middle" align="start" vertical>
      <Card
        actions={actions}
        style={{ minWidth: 300 }}
        bodyStyle={{ paddingTop: 2, paddingLeft: 10 }}
        key={key}
        // cover={
        //   imagesrc !== null ? (
        //     <Image
        //       src={imagesrc || "/images/Rectangle_60.png"}
        //       alt=""
        //       width={100}
        //       height={60}
        //       className="rounded-lg"
        //     />
        //   ) : (
        //     ""
        //   )
        // }
      >
        <Space direction="vertical" size={10} className="!w-full ">
          <span className="!w-full flex">
            <Badge
              color={
                category === 1
                  ? "#AEE753"
                  : category === 2
                  ? "#F90430"
                  : category === 3
                  ? "#777E90"
                  : category === 4
                  ? "#3772FF"
                  : category === 5
                  ? "#FF5C00"
                  : category === 6
                  ? "#FFA800"
                  : category === 7
                  ? "#353945"
                  : undefined
              }
              text={
                category === 1
                  ? "Research"
                  : category === 2
                  ? "Designed"
                  : category === 3
                  ? "Other"
                  : category === 4
                  ? "Feedback"
                  : category === 5
                  ? "Presentation"
                  : category === 6
                  ? "UX Research"
                  : category === 7
                  ? "Interface"
                  : ""
              }
            ></Badge>
            <MoreOutlined className="ml-auto justify-end" />
          </span>
          <span className="text-lg text-blck-300 ">{title}</span>
          <span>
            <Avatar.Group
              maxCount={3}
              size="small"
              maxStyle={{ backgroundColor: "#B1B5C3" }}
            >
              {teamlist.map((item) => (
                <Avatar
                  style={{ backgroundColor: "#353945" }}
                  icon={<UserOutlined />}
                />
              ))}
            </Avatar.Group>
            <Tag color="#F4F5F6" className="!ml-20">
              <ThunderboltOutlined className="!text-[#B1B5C3] " />
              <span className="text-[#B1B5C3] ml-3">{priority}</span>
            </Tag>
          </span>
        </Space>
      </Card>
    </Flex>
  );
};

export default TaskCard;
