import { Leaf } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className={`text-sm md:text-base font-semibold text-foreground ${language === 'kn' ? 'font-kannada' : ''}`}>
            {t.tagline}
          </h1>
        </div>

        <Select value={language} onValueChange={(value: 'en' | 'kn') => setLanguage(value)}>
          <SelectTrigger className="w-[100px] h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="kn" className="font-kannada">ಕನ್ನಡ</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default Header;
