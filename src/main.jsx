import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './api/reactQueryClient';
import UserContext from './Components/Context/UserContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
     <UserContext>
    <App />
    </UserContext>
    </QueryClientProvider>
  </StrictMode>,
)
