import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import {useAuth} from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";

const CreateProject = () => {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/projects/', { name, description }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Box className="p-6 bg-white border rounded-lg shadow-md">
        <Typography variant="h4" component="h1" className="mb-4 text-center" sx={{ color: 'black' }}>
          Create a New Project
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            Create Project
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProject;