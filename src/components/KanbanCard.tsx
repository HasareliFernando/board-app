import React, { ReactNode, useState, useMemo } from "react";
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
import { Avatar, Card, Flex, Space, Badge, Tag, Image } from "antd";
import { useDraggable } from "@dnd-kit/core";

type ActionWithCountProps = {
  count: any;
  icon: ReactNode;
  type: string;
  color?: string | null;
};

const ActionWithCount: React.FC<ActionWithCountProps> = ({
  icon,
  count,
  type,
  color,
}) => (
  <div className={color ? `!text-[${color}]` : "text-gray"}>
    {icon}
    {count}
  </div>
);

export type KanbanCardProps = {
  id: number;
  category: number;
  title: string;
  key: number;
  teamList: { id: number; img: string }[];
  priority: "High" | "Low" | "Medium";
  imageSrc?: string;
  linkCount: number;
  messageCount: number;
  dueDate: string | null;
  reports: number;
  stream: boolean;
  groupCall: boolean;
  status?: number;
};

const KanbanCard: React.FC<KanbanCardProps> = ({
  id,
  category,
  title,
  key,
  teamList,
  priority,
  imageSrc,
  linkCount,
  messageCount,
  dueDate,
  reports,
  stream,
  groupCall,
  status,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
  });

  const actions = useMemo(() => {
    const items: ReactNode[] = [];

    if (linkCount > 0) {
      items.push(
        <ActionWithCount
          type="link"
          count={linkCount}
          icon={<LinkOutlined />}
        />
      );
    }

    if (messageCount > 0) {
      items.push(
        <ActionWithCount
          type="message"
          count={messageCount}
          icon={<MessageOutlined />}
        />
      );
    }

    if (dueDate !== null) {
      items.push(
        <ActionWithCount
          type="dueDate"
          count={""}
          icon={<CalendarOutlined />}
        />
      );
    }

    if (reports) {
      items.push(
        <ActionWithCount
          type="reports"
          count={reports + " Reports"}
          icon={<WarningOutlined />}
          color={"red-111"}
        />
      );
    }

    if (groupCall) {
      items.push(
        <ActionWithCount
          type="groupCall"
          count={"Group Call"}
          icon={<BellOutlined />}
          color={"#3772FF"}
        />
      );
    }

    if (stream) {
      items.push(
        <ActionWithCount
          type="stream"
          count={"Stream"}
          icon={<BellOutlined />}
          color={"#3772FF"}
        />
      );
    }

    return items;
  }, []);

  return (
    <Flex
      gap="middle"
      align="start"
      vertical
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <Card
        actions={actions}
        style={{ minWidth: 260 }}
        bodyStyle={{ paddingTop: 2, padding: 10 }}
        key={key}
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
              className="card-category"
            ></Badge>
            <MoreOutlined className="ml-auto justify-end rotate-90" />
          </span>
          <span className="text-lg text-black-300 font-semibold">{title}</span>
          <span>
            <Avatar.Group size="small" max={{ count: 3 }}>
              {teamList?.length &&
                teamList.map((item) => (
                  <Avatar
                    style={{ backgroundColor: "#353945" }}
                    icon={<UserOutlined />}
                  />
                ))}
            </Avatar.Group>
            <Tag color="#F4F5F6" className="!ml-2">
              <ThunderboltOutlined className="!text-[#B1B5C3] " />
              <span className="text-[#B1B5C3] ml-3">{priority}</span>
            </Tag>
          </span>
          {imageSrc ? (
            <Image
              width={"100%"}
              height={90}
              className="card-img"
              src={imageSrc}
            />
          ) : null}
        </Space>
      </Card>
    </Flex>
  );
};

export default KanbanCard;
