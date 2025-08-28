import React from "react";
import { Col, Space, Tag } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core";
import KanbanCard, { KanbanCardProps } from "./KanbanCard";

type KanbanColumn = {
  type: number;
  name: string;
  color: string;
  textColor: string;
  cardList: KanbanCardProps[] | [];
};
const KanbanColumn: React.FC<KanbanColumn> = ({
  type,
  name,
  color,
  textColor,
  cardList,
}) => {
  const { setNodeRef } = useDroppable({ id: type });
  return (
    <Col span={6} className="!h-full flex-1" ref={setNodeRef}>
      <header className="bg-white ml-1 mt-1 min-h-15 flex">
        <Tag
          className={`!h-6 !px-4 !justify-start !item-center !text-[${textColor}] kanban-column !text-bold !text-sm !mt-5 !ml-5 !rounded-full`}
          color={color}
        >
          {name}
        </Tag>
        <PlusOutlined className="justify-end ml-auto mr-2 !text-[#353945] !text-bold text-black-300 text-lg" />
        <MoreOutlined className="justify-end mr-2 !text-[#353945] !text-bold rotate-90 text-black-300 text-lg" />
      </header>
      <div className="bg-[#F4F5F6] h-100 min-h-fit flex-1 ml-1 mt-1 overflow-x-scroll">
        <Space direction="vertical" size={12} className="ml-3 mt-5">
          {cardList.map((item) => (
            <KanbanCard {...item} />
          ))}
        </Space>
      </div>
    </Col>
  );
};

export default KanbanColumn;
