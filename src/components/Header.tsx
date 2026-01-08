import { Leaf, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className={`text-xl font-bold text-foreground ${language === 'kn' ? 'font-kannada' : ''}`}>
              {t.appName}
            </h1>
            <p className={`text-xs text-muted-foreground ${language === 'kn' ? 'font-kannada' : ''}`}>
              {t.tagline}
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className={`text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${language === 'kn' ? 'font-kannada' : ''}`}>
            {t.home}
          </a>
          <a href="#analyze" className={`text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${language === 'kn' ? 'font-kannada' : ''}`}>
            {t.analyze}
          </a>
          <a href="#weather" className={`text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${language === 'kn' ? 'font-kannada' : ''}`}>
            {t.weather}
          </a>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className={language === 'kn' ? 'font-kannada' : ''}>
                {language === 'en' ? 'EN' : 'ಕನ್ನಡ'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              {t.english}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('kn')} className="font-kannada">
              {t.kannada}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
