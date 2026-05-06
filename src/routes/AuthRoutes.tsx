import { useRoutes } from 'react-router-dom';
import { routes } from './routes-config';

export default function AuthRoutes() {
  return useRoutes(routes);
}
