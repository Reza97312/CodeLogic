import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App/App'
import './utils/i18n/i18n'
import './assets/styles/global.css'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
