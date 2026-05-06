import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthRoutes from './routes/AuthRoutes';
const root = createRoot(document.getElementById('auth-root')!);

root.render(<AuthRoutes />);
