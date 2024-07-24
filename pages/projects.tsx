import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { useAuth } from '../contexts/AuthContext';
import {useRouter} from "next/router";
import axiosInstance from '../lib/axios';

const Projects = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }

    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/projects/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    if (token) {
      fetchProjects();
    }
  }, [token, router]);

  return (
    <Container maxWidth="md" className="flex flex-col items-center justify-center mt-10">
      <Box className="w-full p-6 bg-white border rounded-lg shadow-md">
        <Typography component="h1" variant="h4" className="mb-4 text-center" sx={{ color: 'black' }}>
          Projects
        </Typography>
        <List>
          {projects.map((project) => (
            <div key={project.id}>
              <ListItem disablePadding>
                <ListItemButton component={Link} href={`/projects/${project.id}`} className="text-black">
                  <ListItemText primary={project.name} sx={{ color: 'black' }} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Projects;