import { Leaf, HelpCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();
  const fontClass = language === 'kn' ? 'font-kannada' : '';

  const faqs = [
    {
      question: language === 'en' ? 'How do I upload crop images?' : 'ನಾನು ಬೆಳೆ ಚಿತ್ರಗಳನ್ನು ಹೇಗೆ ಅಪ್‌ಲೋಡ್ ಮಾಡುವುದು?',
      answer: language === 'en' ? 'Click on "Upload Crop Image" and select a clear photo of your leaf or crop.' : '"ಬೆಳೆ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" ಕ್ಲಿಕ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಎಲೆ ಅಥವಾ ಬೆಳೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ.',
    },
    {
      question: language === 'en' ? 'What image formats are supported?' : 'ಯಾವ ಚಿತ್ರ ಸ್ವರೂಪಗಳನ್ನು ಬೆಂಬಲಿಸಲಾಗುತ್ತದೆ?',
      answer: language === 'en' ? 'JPG and PNG images up to 10MB.' : '10MB ವರೆಗೆ JPG ಮತ್ತು PNG ಚಿತ್ರಗಳು.',
    },
    {
      question: language === 'en' ? 'Is this service free?' : 'ಈ ಸೇವೆ ಉಚಿತವೇ?',
      answer: language === 'en' ? 'Yes, the crop health analysis is completely free.' : 'ಹೌದು, ಬೆಳೆ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ ಸಂಪೂರ್ಣವಾಗಿ ಉಚಿತ.',
    },
  ];

  const schemes = [
    {
      name: language === 'en' ? 'PM-KISAN Scheme' : 'ಪಿಎಂ-ಕಿಸಾನ್ ಯೋಜನೆ',
      url: 'https://pmkisan.gov.in/',
    },
    {
      name: language === 'en' ? 'Soil Health Card' : 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್',
      url: 'https://soilhealth.dac.gov.in/',
    },
    {
      name: language === 'en' ? 'Kisan Credit Card' : 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್',
      url: 'https://www.nabard.org/content.aspx?id=586',
    },
    {
      name: language === 'en' ? 'Crop Insurance (PMFBY)' : 'ಬೆಳೆ ವಿಮೆ (ಪಿಎಂಎಫ್‌ಬಿವೈ)',
      url: 'https://pmfby.gov.in/',
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 mb-8">
          {/* FAQs */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5" />
              <h4 className={`text-lg font-semibold ${fontClass}`}>
                {language === 'en' ? 'Frequently Asked Questions' : 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು'}
              </h4>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <p className={`font-medium text-primary-foreground ${fontClass}`}>{faq.question}</p>
                  <p className={`text-sm text-primary-foreground/80 ${fontClass}`}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Government Schemes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5" />
              <h4 className={`text-lg font-semibold ${fontClass}`}>
                {language === 'en' ? 'Government Schemes for Farmers' : 'ರೈತರಿಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು'}
              </h4>
            </div>
            <div className="space-y-2">
              {schemes.map((scheme, index) => (
                <a
                  key={index}
                  href={scheme.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors ${fontClass}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{scheme.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
