import { DragEndEvent, DndContext } from "@dnd-kit/core";
import { Row } from "antd";

import KanbanColumn from "./KanbanColumn";
import { TaskCardProps } from "./KanbanCard";

type KanbanBoardType = {
  todolist: TaskCardProps[] | [];
  progresslist: TaskCardProps[] | [];
  approvedlist: TaskCardProps[] | [];
  rejectlist: TaskCardProps[] | [];
  handleTaskChange:(id: number | string, status: number | string | undefined) => void;
};

const KanbanBoard: React.FC<KanbanBoardType> = ({
  todolist,
  progresslist,
  approvedlist,
  rejectlist,
  handleTaskChange
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const issueId = active.id as string;
    const newStatus = over.id as TaskCardProps["status"];
    console.log({ issueId, newStatus });
    handleTaskChange(issueId, newStatus);
  };

  return (
    <Row className="!w-full !h-full flex flex-1">
      <DndContext onDragEnd={handleDragEnd}>
        <KanbanColumn
          color="#E6E8EC"
          textcolor="#353945"
          name="To Do"
          type={1}
          cardlist={todolist}
        />
        <KanbanColumn
          color="#FFA800"
          textcolor="#353945"
          name="In Progress"
          type={2}
          cardlist={progresslist}
        />
        <KanbanColumn
          color="#AEE753"
          textcolor="#353945"
          name="Approved"
          type={3}
          cardlist={approvedlist}
        />
        <KanbanColumn
          color="#F90430"
          textcolor="#ffffff"
          name="Reject"
          type={4}
          cardlist={rejectlist}
        />
      </DndContext>
    </Row>
  );
};

export default KanbanBoard;
