import { forwardRef } from "react";
const DroppableVirtuosoList = (provided) =>
  forwardRef(({ style, children }, ref) => (
    <div
      {...provided.droppableProps}
      ref={(el) => {
        provided.innerRef(el);
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      style={style}
    >
      {children}
      {provided.placeholder}
    </div>
  ));
DroppableVirtuosoList.displayName = "DroppableVirtuosoList";

export default DroppableVirtuosoList;
