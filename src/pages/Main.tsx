import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Popover, Stack, Typography } from '@mui/material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import '../index.css';
import { Link } from 'react-router-dom';
import { incidents } from '../incidents';

export default function Main() {
  const { enqueueSnackbar } = useSnackbar();
  const notificationText =
    `Здравствуйте! По функциональной подсистеме Авторизация зарегистрирован инцидент «${incidents[5].name}» с приоритетом «Высокий»`;
  const [notifications, setNotifications] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  let borderStyle =
    notifications < 1 ? {} : { border: '3px solid blue', '&:hover': { border: '3px solid blue' } };

  const notify = () => {
    enqueueSnackbar(notificationText, {
      autoHideDuration: 7000,
      style: { backgroundColor: '#b22a00' },
    });
    setNotifications(1);
  };

  useEffect(() => {
    setTimeout(notify, 2000);
    console.log('useEffect');
  }, []);

  return (
    <Box p={6}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <Typography variant="h4">Добро пожаловать в банковскую систему bank system!</Typography>
        <Button
          variant="outlined"
          size="large"
          startIcon={<CircleNotificationsIcon />}
          sx={borderStyle}
          onClick={openPopover}>
          Уведомления{' '}
          {notifications >= 1 && <span className="notifications-counter">{notifications}</span>}
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={closePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>
          {notifications > 0 ? (
            <Stack direction={'row'} spacing={3} sx={{ p: 2, maxWidth: '330px' }}>
              <Typography>{notificationText}</Typography>
              <IconButton sx={{ height: '40px' }} onClick={() => setNotifications(0)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          ) : (
            <Typography sx={{ p: 2 }}>Нет уведомлений</Typography>
          )}
        </Popover>
      </Box>
      <Stack direction={'column'} gap={3} pt={1}>
        <Link to="/incidents">
          <Button variant="contained" size="large">
            Просмотреть список инцидентов
          </Button>
        </Link>
        <Link to="/admins">
          <Button variant="contained" size="large">
            Просмотреть список администраторов
          </Button>
        </Link>

        <Link to="/">
          <Button variant="contained" size="large">
            Просмотреть список ТКС
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
