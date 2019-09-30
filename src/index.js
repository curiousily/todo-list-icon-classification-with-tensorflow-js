import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Card } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import UUID from "uuidjs";
import _ from "lodash";
import Task from "./Task";
import NewTask from "./NewTask";

const iconContainerStyles = {
  width: "2.5rem",
  height: "2.5rem"
};

const App = () => {
  const [tasks, setTasks] = useState({});

  const handleSaveTask = task => {
    const taskId = UUID.generate();
    const taskData = {
      id: taskId,
      name: task.name,
      icon: task.icon,
      isComplete: false
    };
    setTasks({
      ...tasks,
      [taskId]: taskData
    });
  };

  const completeTask = taskId => {
    const task = tasks[taskId];
    task.isComplete = true;
    setTasks({
      ...tasks,
      [taskId]: task
    });
  };

  const undoCompleteTask = taskId => {
    const task = tasks[taskId];
    task.isComplete = false;
    setTasks({
      ...tasks,
      [taskId]: task
    });
  };

  const removeTask = taskId => {
    const newTasks = _.omit(tasks, [taskId]);
    setTasks(newTasks);
  };

  return (
    <div className="rainbow-m-around_x-large">
      <Card
        title="The Cute List"
        icon={
          <span
            className="rainbow-background-color_success rainbow-border-radius_circle rainbow-align-content_center"
            style={iconContainerStyles}
          >
            <FontAwesomeIcon
              icon={faTasks}
              size="lg"
              className="rainbow-color_white"
            />
          </span>
        }
      >
        <div className="rainbow-p-around_x-large rainbow-align-content_center rainbow-flex_column">
          <NewTask onSaveTask={handleSaveTask} />
          {Object.values(tasks).map(t => (
            <Task
              key={t.id}
              id={t.id}
              name={t.name}
              icon={t.icon}
              isComplete={t.isComplete}
              onComplete={completeTask}
              onUndo={undoCompleteTask}
              onRemove={removeTask}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
