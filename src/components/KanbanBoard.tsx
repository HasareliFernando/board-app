import { DragEndEvent, DndContext } from "@dnd-kit/core";
import { Row } from "antd";

import KanbanColumn from "./KanbanColumn";
import { KanbanCardProps } from "./KanbanCard";

type KanbanBoardType = {
  todoList: KanbanCardProps[] | [];
  progressList: KanbanCardProps[] | [];
  approvedList: KanbanCardProps[] | [];
  rejectList: KanbanCardProps[] | [];
  handleTaskChange: (
    id: number | string,
    status: number | string | undefined
  ) => void;
};

const KanbanBoard: React.FC<KanbanBoardType> = ({
  todoList,
  progressList,
  approvedList,
  rejectList,
  handleTaskChange,
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const issueId = active.id as string;
    const newStatus = over.id as KanbanCardProps["status"];
    handleTaskChange(issueId, newStatus);
  };

  return (
    <Row className="!w-full !h-full flex flex-1">
      <DndContext onDragEnd={handleDragEnd}>
        <KanbanColumn
          color="#E6E8EC"
          textColor="#353945"
          name="To Do"
          type={1}
          cardList={todoList}
        />
        <KanbanColumn
          color="#FFA800"
          textColor="#353945"
          name="In Progress"
          type={2}
          cardList={progressList}
        />
        <KanbanColumn
          color="#AEE753"
          textColor="#353945"
          name="Approved"
          type={3}
          cardList={approvedList}
        />
        <KanbanColumn
          color="#F90430"
          textColor="#ffffff"
          name="Reject"
          type={4}
          cardList={rejectList}
        />
      </DndContext>
    </Row>
  );
};

export default KanbanBoard;
