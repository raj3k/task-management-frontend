import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Task from '../../components/Task';
import {useAuth} from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";

const ProjectDetail = () => {
  const { token } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    const fetchProjectAndTasks = async () => {
      try {
        const projectResponse = await axiosInstance.get(`/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(projectResponse.data);

        const tasksResponse = await axiosInstance.get(`/projects/${id}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching project or tasks:', error);
      }
    };

    if (id) {
      fetchProjectAndTasks();
    }
  }, [id]);

  if (!project) return <p>Loading...</p>;

  const handleTaskUpdate = () => {
    const fetchTasks = async () => {
      try {
        const tasksResponse = await axiosInstance.get(`/projects/${id}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  };

  return (
    <Container maxWidth="md" className="mt-10">
      <Box className="p-6 bg-white border rounded-lg shadow-md">
        <Typography variant="h3" component="h1" className="mb-4 text-center text-gray-900">
          {project.name}
        </Typography>
        <Typography variant="body1" component="p" className="mb-6 text-gray-700">
          {project.description}
        </Typography>
        <Divider className="mb-6" />
        <Typography variant="h5" component="h2" className="mb-4 text-gray-800">
          Tasks
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="mb-4"
          onClick={() => router.push(`/create-task?projectId=${id}`)}
        >
          Create New Task
        </Button>
        <Box>
          {tasks.map((task) => (
            <Task key={task.id} task={task} onUpdate={handleTaskUpdate} />
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          className="mb-4"
          onClick={() => router.push(`/projects`)}
        >
          Back to projects
        </Button>
      </Box>
    </Container>
  );
};

export default ProjectDetail;