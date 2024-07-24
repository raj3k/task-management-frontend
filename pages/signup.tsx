import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axiosInstance from "../lib/axios";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log('API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/signup/', { name, email, password });
      if (response.status === 201) {
        await router.push('/login');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  return (
    <Container maxWidth="xs" className="flex flex-col items-center justify-center h-screen">
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full p-6 bg-white border rounded-lg shadow-md"
        sx={{ mt: 1 }}
      >
        <Typography component="h1" variant="h5" className="mb-4" color="black">
          Signup
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-4"
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;