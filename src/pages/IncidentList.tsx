import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { incidents } from '../incidents';
import React, { useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function IncidentList() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const idToAdd = location.length > 10 ? Number(location.slice(17)) : 0;
  const selectedIncident: any = incidents.find((incident) => incident.id === idToAdd);

  const [selectedIndexFirst, setSelectedIndexFirst] = useState<number>(0);
  const [selectedIndexSecond, setSelectedIndexSecond] = useState<number>(-1);

  const firstPriority = ['Низкий', 'Средний', 'Высокий', 'Критический', 'Широкомасштабный'];
  const secondPriority = ['Связанный', 'Корневой'];

  const handleListItemClickFirst = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndexFirst(index);
  };

  const handleListItemClickSecond = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndexSecond(selectedIndexSecond === index ? -1 : index);
  };

  const selectedList = useMemo(() => {
    return incidents.filter(
      (incident) =>
        incident.firstPriority === firstPriority[selectedIndexFirst] &&
        (selectedIndexSecond !== -1
          ? incident.secondPriority === secondPriority[selectedIndexSecond]
          : true) &&
        (idToAdd ? (incident.id !== idToAdd) && !selectedIncident.connectedIncidents.includes(incident.name) : true),
    );
  }, [selectedIndexFirst, selectedIndexSecond]);

  return (
    <Box p={5}>
      <Button startIcon={<ArrowBackIcon />} variant="outlined" onClick={() => navigate('/')}>
        Назад
      </Button>
      <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: 6 }}>
        Список инцидентов
      </Typography>
      <Box
        gap={3}
        sx={{
          display: 'flex',
        }}>
        <Box
          sx={{
            border: '1px solid gray',
            borderRadius: 2,
            width: '300px',
          }}>
          <List>
            <ListItem>
              <ListItemText>1-я классификация приоритетов</ListItemText>
            </ListItem>
            {firstPriority.map((category, ind) => (
              <ListItem>
                <ListItemButton
                  selected={selectedIndexFirst === ind}
                  onClick={(event) => handleListItemClickFirst(event, ind)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(25, 118, 210, 0.18)',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.22)',
                      },
                    },
                  }}>
                  <ListItemText>{category}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemText>2-я классификация приоритетов</ListItemText>
            </ListItem>
            {secondPriority.map((category, ind) => (
              <ListItem>
                <ListItemButton
                  selected={selectedIndexSecond === ind}
                  onClick={(event) => handleListItemClickSecond(event, ind)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(25, 118, 210, 0.18)',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.24)',
                      },
                    },
                  }}>
                  <ListItemText>{category}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <Button variant="contained" endIcon={<AddIcon />}>
                Создать инцидент
              </Button>
            </ListItem>
          </List>
        </Box>

        {selectedList.map((incident) => (
          <Card
            key={incident.id}
            sx={{
              marginTop: 1,
              width: '230px',
              height: '190px',
            }}>
            <CardContent>
              <Typography variant="h4">{incident.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Кол-во ошибок: {incident.errors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Параметр: {incident.param}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={'/incidents/incident_card/' + (idToAdd ? idToAdd : incident.id)}>
                {idToAdd ? (
                  <Button onClick={() => selectedIncident.connectedIncidents.push(incident.name)}>
                    Добавить
                  </Button>
                ) : (
                  <Button>Открыть</Button>
                )}
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
