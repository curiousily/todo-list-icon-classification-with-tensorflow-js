import React from "react";
import { ButtonIcon, Input } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning, faBook, faTrash } from "@fortawesome/free-solid-svg-icons";

const Task = ({ id, name, isComplete, icon, onComplete, onUndo, onRemove }) => {
  const handleClick = e => {
    if (isComplete) {
      onUndo(id);
    } else {
      onComplete(id);
    }
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div
      className="rainbow-p-top_large rainbow-p-left_medium rainbow-p-right_medium"
      style={{ width: "100%" }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 10 }}>
          <Input
            className="rainbow-m-around_medium"
            checked={isComplete}
            readOnly
            style={{
              textDecoration: isComplete ? "line-through" : "none"
            }}
            type="checkbox"
            onClick={handleClick}
            label={name}
          />
        </div>
        <div className="rainbow-p-left_medium">
          <ButtonIcon
            size="medium"
            variant="brand"
            style={{
              backgroundColor: icon === "RUN" ? "#4CAF50" : "#2196F3",
              borderColor: "transparent"
            }}
            icon={
              <FontAwesomeIcon icon={icon === "RUN" ? faRunning : faBook} />
            }
          />
        </div>
        <div className="rainbow-p-left_medium">
          <ButtonIcon
            size="medium"
            icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={handleRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
