import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axiosInstance from '../lib/axios';

interface TaskProps {
  task: { id: number; title: string; description?: string; completed: boolean };
  onUpdate: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdate }) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleToggle = async () => {
    try {
      await axiosInstance.put(`/tasks/${task.id}/`, { completed: !completed });
      setCompleted(!completed);
      onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Box className="p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-sm">
      <Typography variant="h6" component="h2" className="text-gray-800 mb-2">
        {task.title}
      </Typography>
      <Typography variant="body2" component="p" className="text-gray-600 mb-4">
        {task.description}
      </Typography>
      <Button
        variant="contained"
        color={completed ? 'secondary' : 'primary'}
        onClick={handleToggle}
        className="w-full"
      >
        {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
      </Button>
    </Box>
  );
};

export default Task;