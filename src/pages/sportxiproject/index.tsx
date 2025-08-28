import React from "react";
import { Space, Tag, Avatar, Divider, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import KanbanBoard from "@/components/KanbanBoard";
import { useToDoTaskStore } from "@/store/useToDoTaskStore";
import { useProgressTaskStore } from "@/store/useProgressTaskStore";
import { useApprovedTaskStore } from "@/store/useApprovedTaskStore";
import { useRejectTaskStore } from "@/store/useRejectTaskStore";

export default function SportXiProjectLayout() {
  const { todoTasks, todoUpdate, removeToDoTaskByIndex } = useToDoTaskStore();
  const { progressTasks, progressUpdate, removeProgressTaskByIndex } =
    useProgressTaskStore();
  const { approvedTasks, approvedUpdate, removeApprovedTaskByIndex } =
    useApprovedTaskStore();
  const { rejectTasks, rejectUpdate, removeRejectTaskByIndex } =
    useRejectTaskStore();

  const handleTaskChange = (
    id: number | string,
    newStatus: number | string | undefined
  ) => {
    const numId = Number(id);
    const numStatus = Number(newStatus);
    let newTask = null;

    if (!isNaN(numId)) {
      const taskLists = [
        [...todoTasks],
        [...progressTasks],
        [...approvedTasks],
        [...rejectTasks],
      ];
      taskLists.forEach((list, index) => {
        const itemIndex = list.findIndex((item) => item.id === numId);
        if (itemIndex !== -1) {
          newTask = list[itemIndex];
          if (newTask?.status === numStatus) return;
          list.splice(itemIndex, 1); // ✅ remove the item
          if (!isNaN(numStatus) && newTask !== null) {
            if (newTask.status !== undefined) {
              newTask.status = numStatus;
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
              switch (index) {
                case 0:
                  removeToDoTaskByIndex(itemIndex);
                  break;

                case 1:
                  removeProgressTaskByIndex(itemIndex);
                  break;

                case 2:
                  removeApprovedTaskByIndex(itemIndex);
                  break;

                case 3:
                  removeRejectTaskByIndex(itemIndex);
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
              className="bg-transparent border-2 !border-gray-300 !text-gray-300 ml-3 !rounded-full !px-3 manage-btn"
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
          todoList={todoTasks}
          progressList={progressTasks}
          approvedList={approvedTasks}
          rejectList={rejectTasks}
          handleTaskChange={handleTaskChange}
        />
      </div>
    </>
  );
}
