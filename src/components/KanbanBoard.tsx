import { DragEndEvent, DndContext } from "@dnd-kit/core";
import { Row } from "antd";

import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard() {
  const handleDragEnd = (event: DragEndEvent) => {};

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Row className="!w-full !h-full flex flex-1">
        <KanbanColumn color="#E6E8EC" textcolor="#353945" name="To Do" type={1}/>
        <KanbanColumn color="#FFA800" textcolor="#353945" name="In Progress" type={2}/>
        <KanbanColumn color="#AEE753" textcolor="#353945" name="Approved" type={3}/>
        <KanbanColumn color="#F90430" textcolor="#ffffff" name="Reject" type={4}/>
      </Row>
    </DndContext>
  );
}
