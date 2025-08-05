import Home from './pages/Home';
import { LanguageProvider } from './contexts/LanguageContext';
import './i18n';

function App() {
  return (
    <LanguageProvider>
        <Home />
    </LanguageProvider>
  )
}

export default App
