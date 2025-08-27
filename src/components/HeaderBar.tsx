//Create - HF
//Description -  Dashboard Headerbar

import React from "react";
import { Input, Avatar, Typography, Space, Button } from "antd";
import { UserOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";

const { Title } = Typography;

const HeaderBar: React.FC = () => {
  return (
    <header className="bg-[#ffffff] h-16 px-6 flex items-center justify-between">
      <div className="flex-1 justify-start">
        <Title level={4} className="!text-black !mb-0">
          <Image
            src="/images/logo.png"
            alt="Dashboard Logo"
            width={100}
            height={60}
            className="rounded-lg"
          />
        </Title>
      </div>

      <div className="flex-1 hidden md:flex justify-end-safe">
        <Space size={24}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            iconPosition="end"
            className="!h-12 max-w-md"
          >
            Create new board
          </Button>

          <Input
            placeholder="Search tasks ..."
            prefix={<SearchOutlined />}
            allowClear
            className="!h-12 !bg-gray-100 !border-none !rounded-md focus:!shadow-none focus:!ring-2 focus:!ring-blue-500 max-w-md"
          />
          <Space size={6}>
            <Avatar size="large" src="/images/settings.png" />

            <Badge dot>
              <Avatar
                size="large"
                style={{ backgroundColor: "transparent", color: "GrayText" }}
                icon={<BellOutlined />}
              />
            </Badge>

            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
        </Space>
      </div>
    </header>
  );
};

export default HeaderBar;
