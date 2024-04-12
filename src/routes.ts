import Admins from './pages/Admins';
import IncidentCard from './pages/IncidentCard';
import IncidentList from './pages/IncidentList';
import Login from './pages/Login';
import Main from './pages/Main';
import Registration from './pages/Registration';

export const privateRoutes = [
  {
    path: '/',
    element: Main,
  },
  {
    path: '/incidents',
    element: IncidentList,
  },
  {
    path: '/incidents/incident_card/:id',
    element: IncidentCard,
  },
  {
    path: '/incidents/addTo/:id',
    element: IncidentList,
  },
  {
    path: '/admins',
    element: Admins,
  },
  {
    path: '/*',
    element: Main,
  },
];

export const publicRoutes = [
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/registration',
    element: Registration,
  },
  {
    path: '/*',
    element: Login,
  },
];
