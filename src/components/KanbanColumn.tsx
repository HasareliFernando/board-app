import React from "react";
import { Col, Space, Tag } from "antd";
import {
  DashOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core";
import TaskCard, {TaskCardProps} from "./KanbanCard";

type KanbanColumn = {
  type: number;
  name: string;
  color: string;
  textcolor: string;
  cardlist: TaskCardProps[] | [];
};
const KanbanColumn: React.FC<KanbanColumn> = ({type, name, color, textcolor, cardlist}) => {
  const { setNodeRef } = useDroppable({ id: type });
  return <Col span={6} className="!h-full flex-1" ref={setNodeRef}>
    <header className="bg-white ml-1 mt-1 min-h-15 flex">
      <Tag className={`!h-6 !justify-start !item-center !text-[${textcolor}] !text-semibold !text-sm !mt-5 !ml-5 !rounded-full`} color={color} >{name}</Tag>
      <PlusOutlined className="justify-end ml-auto mr-2 !text-[#353945]"/>
      <DashOutlined className="justify-end mr-2 !text-[#353945]"/>
    </header>
    <div className="bg-[#F4F5F6] h-80 min-h-fit flex-1 ml-1 mt-1 overflow-x-scroll">
      <Space direction="vertical" size={12} className="ml-3 mt-5">
      {cardlist.map((item)=>(
        <TaskCard{ ...item}/>
      ))}
      </Space>
    </div>
    </Col>;
};

export default KanbanColumn;
