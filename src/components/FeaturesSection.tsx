import { Leaf, Droplets, Cloud, FlaskConical } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesSection = () => {
  const { language, t } = useLanguage();
  const fontClass = language === 'kn' ? 'font-kannada' : '';

  const features = [
    {
      icon: Leaf,
      title: t.feature1Title,
      description: t.feature1Desc,
      color: 'bg-healthy',
    },
    {
      icon: FlaskConical,
      title: t.feature2Title,
      description: t.feature2Desc,
      color: 'bg-secondary',
    },
    {
      icon: Cloud,
      title: t.feature3Title,
      description: t.feature3Desc,
      color: 'bg-sky',
    },
    {
      icon: Droplets,
      title: t.feature4Title,
      description: t.feature4Desc,
      color: 'bg-primary',
    },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${fontClass}`}>
            {t.featuresTitle}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl card-gradient shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className={`text-lg font-semibold text-foreground mb-3 ${fontClass}`}>
                {feature.title}
              </h3>
              <p className={`text-muted-foreground leading-relaxed ${fontClass}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
