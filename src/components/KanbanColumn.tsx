import React from "react";
import { Col, Tag } from "antd";
import {
  DashOutlined,
  PlusOutlined
} from "@ant-design/icons";

type KanbanColumn = {
  type: number;
  name: string;
  color: string;
  textcolor: string
};
const KanbanColumn: React.FC<KanbanColumn> = ({type, name, color, textcolor}) => {
  return <Col span={6} className="!h-full flex-1">
    <header className="bg-white ml-1 mt-1 min-h-15 flex">
      <Tag className={`!h-6 !justify-start !item-center !text-[${textcolor}] !text-semibold !text-sm !mt-5 !ml-5 !rounded-full`} color={color} >{name}</Tag>
      <PlusOutlined className="justify-end ml-auto mr-2 !text-[#353945]"/>
      <DashOutlined className="justify-end mr-2 !text-[#353945]"/>
    </header>
    <div className="bg-[#F4F5F6] h-80 flex-1 ml-1 mt-1"></div>
    </Col>;
};

export default KanbanColumn;
