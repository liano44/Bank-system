import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Registration() {
  const navigate = useNavigate();

  return (
    <Stack p={12} alignItems={'center'} spacing={4}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ position: 'absolute', top: 36, left: 36 }}>
        Назад
      </Button>

      <Typography variant="h3" mb={3}>
        Регистрация
      </Typography>

      <TextField label="Ваш логин во внутренней сети банка" sx={{ width: '400px' }} />
      <TextField
        label="Ваш пароль во внутренней сети банка"
        type="password"
        sx={{ width: '400px' }}
      />
      <TextField label="Ваша должность" sx={{ width: '400px' }} />
      <TextField label="Наименование сервиса банка" sx={{ width: '400px' }} />
      <TextField label="Рабочий телефон сотрудника" sx={{ width: '400px' }} />
      <TextField label="Ответственный руководитель сервиса" sx={{ width: '400px' }} />

      <Link to="/login">
        <Button variant="contained">зарегистрироваться</Button>
      </Link>
    </Stack>
  );
}
