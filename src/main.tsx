import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import type { Lang, Page } from './site'

const lang = ((window as unknown as { __APP_LANG__?: string }).__APP_LANG__ === 'en' ? 'en' : 'ru') as Lang;
const pageValue = (window as unknown as { __APP_PAGE__?: string }).__APP_PAGE__;
const page = (pageValue === 'approach' ? 'approach' : pageValue === 'parks' ? 'parks' : 'home') as Page;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App lang={lang} page={page} />
  </StrictMode>,
)
