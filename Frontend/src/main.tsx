import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import {
  RecoilRoot,

} from 'recoil';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <RecoilRoot>
    <Toaster richColors position="top-right" />
    <App />
  </RecoilRoot>
  // </StrictMode>,
)
