import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { incidents } from '../incidents';

export default function IncidentCard() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const id = Number(location.slice(25));
  const selectedIncident: any = incidents.find((incident) => incident.id === id);

  const [secondPriority, setSecondPriority] = useState<string>(selectedIncident.secondPriority);

  const assignSecondPriority = (priority: string) => {
    setSecondPriority(priority);
    selectedIncident.secondPriority = priority;
  };

  const [description, setDescription] = useState(selectedIncident.description);
  const [openDescription, setOpenDescription] = useState(!Boolean(selectedIncident.description));
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const setNewDescription = () => {
    if (description) {
      setOpenDescription(false);
      selectedIncident.description = description;
    }
  };

  return (
    <Box p={5}>
      <Button startIcon={<ArrowBackIcon />} variant="outlined" onClick={() => navigate('/incidents')}>
        Назад
      </Button>
      <Typography variant="h3" align="center" mb={5}>
        Инцидент {selectedIncident.name}
      </Typography>

      <Stack spacing={1} divider={<Divider />}>
        <Typography variant="h5">Первый приоритет: {selectedIncident.firstPriority}</Typography>
        <Typography variant="h5">
          Параметр, по которому создан инцидент: {selectedIncident.param}
        </Typography>
        <Typography variant="h5">
          Функциональная подсистема: {selectedIncident.subSystem}
        </Typography>
        <Typography variant="h5">
          Количество ошибок по инциденту: {selectedIncident.errors}
        </Typography>
        <Typography variant="h5">Дата создания: {selectedIncident.creationDate}</Typography>
        <Typography variant="h5">
          Контрольная дата решения: {selectedIncident.decisionTargetDate}
        </Typography>
        <Typography variant="h5">Администратор: {selectedIncident.admin}</Typography>
        <Typography variant="h5">Сервис: {selectedIncident.service}</Typography>
        <Stack direction={'row'} spacing={3}>
          <Typography variant="h5">
            Связанные инциденты: {selectedIncident.connectedIncidents.join(', ')}
          </Typography>
          <Link to={'/incidents/addTo/' + selectedIncident.id }>
          <Button variant="contained" endIcon={<AddIcon />}>
            Привязать инциденты
          </Button>
          </Link>
          
        </Stack>

        <Typography variant="h5">
          Второй приоритет: {secondPriority ? secondPriority : 'не определен'}
        </Typography>
        {!secondPriority && (
          <Card sx={{ width: '300px' }}>
            <CardContent>
              <Typography variant="h5">Решение:</Typography>
              <Typography>Инцидент связанный/корневой?</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={() => assignSecondPriority('Связанный')}>
                Связанный
              </Button>
              <Button variant="contained" onClick={() => assignSecondPriority('Корневой')}>
                Корневой
              </Button>
            </CardActions>
          </Card>
        )}
        <Stack direction={'row'} spacing={3}>
          <Typography variant="h5">Описание: </Typography>
          {openDescription ? (
            <TextField
              value={description}
              onChange={handleDescriptionChange}
              size="small"
              label="Описание инцидента"
              sx={{ width: '400px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={setNewDescription}>
                      <CheckIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <Stack direction={'row'} spacing={3}>
              <Typography variant="h5">{description}</Typography>
              <IconButton onClick={() => setOpenDescription(true)} size="small">
                <EditIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
