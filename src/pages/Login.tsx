import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext, authContextProps } from '../context/authContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const { authorize } = useContext(AuthContext) as authContextProps;

  return (
    <Stack p={16} alignItems={'center'} spacing={4}>
      <Typography variant="h3" mb={3}>
        Войти в систему
      </Typography>

      <TextField label="Ваш логин во внутренней сети банка" sx={{ width: '400px' }} />
      <TextField
        label="Ваш пароль во внутренней сети банка"
        type="password"
        sx={{ width: '400px' }}
      />
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Typography color="text.secondary">Не зарегистрированы?</Typography>
        <Link to="/registration">
          <Button size="small">Регистрация в системе</Button>
        </Link>
      </Stack>

      <Link to="/">
        <Button onClick={authorize} variant="contained">
          Войти
        </Button>
      </Link>
    </Stack>
  );
}
