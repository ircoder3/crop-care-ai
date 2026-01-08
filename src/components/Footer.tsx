import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();
  const fontClass = language === 'kn' ? 'font-kannada' : '';

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-wheat flex items-center justify-center">
                <Leaf className="w-6 h-6 text-earth" />
              </div>
              <h3 className={`text-xl font-bold ${fontClass}`}>{t.appName}</h3>
            </div>
            <p className={`text-primary-foreground/80 leading-relaxed ${fontClass}`}>
              {t.footerText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${fontClass}`}>Quick Links</h4>
            <nav className="space-y-3">
              <a href="#home" className={`block text-primary-foreground/80 hover:text-wheat transition-colors ${fontClass}`}>
                {t.home}
              </a>
              <a href="#analyze" className={`block text-primary-foreground/80 hover:text-wheat transition-colors ${fontClass}`}>
                {t.analyze}
              </a>
              <a href="#weather" className={`block text-primary-foreground/80 hover:text-wheat transition-colors ${fontClass}`}>
                {t.weather}
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${fontClass}`}>{t.contactUs}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-wheat" />
                <span className="text-primary-foreground/80">support@krishimitra.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-wheat" />
                <span className="text-primary-foreground/80">+91 1800 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-wheat" />
                <span className="text-primary-foreground/80">Bangalore, Karnataka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 KrishiMitra. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className={`text-primary-foreground/60 hover:text-wheat transition-colors ${fontClass}`}>
              {t.privacy}
            </a>
            <a href="#" className={`text-primary-foreground/60 hover:text-wheat transition-colors ${fontClass}`}>
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
