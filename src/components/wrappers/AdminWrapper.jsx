import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "bootstrap/dist/css/bootstrap.css";

import Fade from 'react-reveal/Fade';


export default function AdminWrapper(props) {
  const [isSelected, setSelected] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    useDragOverlay,
    isDragging
  } = useSortable({ id: props.id });

  const style = {
    cursor: isDragging ? "move" : "grab",
    // opacity: isDragging ? 0.5 : 1,
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (

    <div
    //   onClick={() => {
    //     if (isSelected) {
    //       props.removeSelected(props.id);
    //     } else {
    //       props.addSelected(props.id);
    //     }
    //     setSelected(!isSelected);
    //   }}
      className="py-3"
      ref={setNodeRef}
      style={{ ...style, ...props.style }}
      {...attributes}
      {...listeners}
    >
      {/* data-no-dnd="true" */}
        <Fade>
          <div className="relative-div" style={{cursor:"auto"}}>
          {props.children}

          </div>
          </Fade>
    </div>
  );
}
