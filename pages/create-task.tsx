import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import axiosInstance from '../lib/axios';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const [projectId, setProjectId] = useState<number | null>(null);

  useEffect(() => {
    const { projectId } = router.query;

    if (typeof projectId === 'string') {
      setProjectId(parseInt(projectId, 10));
    } else {
      console.error('Project ID is not available');
    }
  }, [router.query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/tasks/', {title, description, completed, projectId });
      router.push(`/projects/${projectId}`);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Box className="p-6 bg-white border rounded-lg shadow-md">
        <Typography variant="h4" component="h1" className="mb-4 text-center" sx={{ color: 'black' }}>
          Create a New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mt-4"
          >
            Create Task
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateTask;