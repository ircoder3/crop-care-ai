import { CloudRain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WeatherSection = () => {
  const { language, t } = useLanguage();
  const fontClass = language === 'kn' ? 'font-kannada' : '';

  // Get next 3 days
  const getNext3Days = () => {
    const days = [];
    const now = new Date();
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      
      days.push({
        day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
        date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        time: i === 0 ? now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '06:00 AM',
        temp: 26 + Math.floor(Math.random() * 6),
        rain: [20, 60, 30][i],
      });
    }
    return days;
  };

  const forecast = getNext3Days();

  return (
    <section id="weather" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className={`text-2xl font-bold text-foreground mb-2 ${fontClass}`}>
            {t.weatherTitle}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-background border-2 border-primary rounded-lg p-4"
              >
                <div className="text-center">
                  <p className="font-semibold text-foreground">{day.day}</p>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                  <p className="text-xs text-muted-foreground mb-3">{day.time}</p>
                  
                  <p className="text-3xl font-bold text-primary mb-3">{day.temp}°C</p>
                  
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <CloudRain className="w-4 h-4" />
                    <span className="text-sm">{day.rain}% {t.precipitation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
