import React, { useEffect, useState } from "react";
import { Space, Tag, Avatar, Divider, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import KanbanBoard from "@/components/KanbanBoard";
import { useToDoTaskStore } from "@/store/useToDoTaskStore";
import { useProgressTaskStore } from "@/store/useProgressTaskStore";
import { useApprovedTaskStore } from "@/store/useApprovedTaskStore";
import { useRejectTaskStore } from "@/store/useRejectTaskStore";

import { TaskCardProps } from "@/components/KanbanCard";

export default function SportXiProjectLayout() {
  const { todotasks, todoUpdate, removeToDoTaskByIndex } =
    useToDoTaskStore();
  const {
    progresstasks,
    progressUpdate,
    removeProgressTaskByIndex
  } = useProgressTaskStore();
  const {
    approvedtasks,
    approvedUpdate,
    removeApprovedTaskByIndex
  } = useApprovedTaskStore();
  const {
    rejecttasks,
    rejectUpdate,
    removeRejectTaskByIndex
  } = useRejectTaskStore();

  const handleTaskChange = (
    id: number | string,
    newStatus: number | string | undefined
  ) => {
    console.log(id, newStatus);
    const numId = Number(id);
    const numStatus = Number(newStatus);
    let newTask = null;

    if (!isNaN(numId)) {
      const taskLists = [
        [...todotasks],
        [...progresstasks],
        [...approvedtasks],
        [...rejecttasks],
      ];
      taskLists.forEach((list, index) => {
        const itemindex = list.findIndex((item) => item.id === numId);
        if (itemindex !== -1) {
          newTask = list[itemindex];
          console.log(newTask);
          list.splice(itemindex, 1); // ✅ remove the item
          if (!isNaN(numStatus) && newTask !== null) {
            if (newTask.status !== undefined) {
              newTask.status = numStatus;
              console.log(newTask);
              switch (numStatus) {
                case 1:
                  todoUpdate(newTask);
                  break;

                case 2:
                  progressUpdate(newTask);
                  break;

                case 3:
                  approvedUpdate(newTask);
                  break;

                case 4:
                  rejectUpdate(newTask);
                  break;

                default:
                  console.log("Unknown status");
              }
              console.log(index)
              switch (index) {
                case 0:
                  removeToDoTaskByIndex(itemindex);
                  break;

                case 1:
                  removeProgressTaskByIndex(itemindex);
                  break;

                case 2:
                  removeApprovedTaskByIndex(itemindex);
                  break;

                case 3:
                  removeRejectTaskByIndex(itemindex);
                  break;

                default:
                  console.log("Unknown status");
              }
            }
          }
          return; 
        }
      });
    }
  };

  return (
    <>
      <header className="bg-white !min-h-fit flex justify-between ml-1 pt-5 pl-5 pb-5 !text-black">
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
      <div className="flex flex-1 justify-between overflow-y-scroll">
        <KanbanBoard
          todolist={todotasks}
          progresslist={progresstasks}
          approvedlist={approvedtasks}
          rejectlist={rejecttasks}
          handleTaskChange={handleTaskChange}
        />
      </div>
    </>
  );
}
