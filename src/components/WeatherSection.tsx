import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WeatherSection = () => {
  const { language, t } = useLanguage();
  const fontClass = language === 'kn' ? 'font-kannada' : '';

  // Mock weather data
  const currentWeather = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    precipitation: 20,
  };

  const forecast = [
    { day: 'Mon', temp: 29, icon: Sun, condition: 'Sunny' },
    { day: 'Tue', temp: 27, icon: Cloud, condition: 'Cloudy' },
    { day: 'Wed', temp: 25, icon: CloudRain, condition: 'Rainy' },
    { day: 'Thu', temp: 26, icon: CloudRain, condition: 'Rainy' },
    { day: 'Fri', temp: 28, icon: Cloud, condition: 'Cloudy' },
    { day: 'Sat', temp: 30, icon: Sun, condition: 'Sunny' },
    { day: 'Sun', temp: 31, icon: Sun, condition: 'Sunny' },
  ];

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section id="weather" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${fontClass}`}>
            {t.weatherTitle}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Current Weather Card */}
          <div className="bg-gradient-to-br from-sky to-primary rounded-3xl p-8 text-primary-foreground shadow-lg mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-primary-foreground/80 mb-1">{dateStr}</p>
                <p className="text-primary-foreground/80 mb-4">{timeStr}</p>
                <div className="flex items-center gap-4">
                  <Thermometer className="w-12 h-12" />
                  <div>
                    <p className="text-5xl font-bold">{currentWeather.temp}°C</p>
                    <p className="text-lg text-primary-foreground/90">{currentWeather.condition}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <p className={`text-sm text-primary-foreground/80 ${fontClass}`}>{t.humidity}</p>
                  <p className="text-lg font-semibold">{currentWeather.humidity}%</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <Wind className="w-6 h-6" />
                  </div>
                  <p className={`text-sm text-primary-foreground/80 ${fontClass}`}>{t.wind}</p>
                  <p className="text-lg font-semibold">{currentWeather.wind} km/h</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <CloudRain className="w-6 h-6" />
                  </div>
                  <p className={`text-sm text-primary-foreground/80 ${fontClass}`}>{t.precipitation}</p>
                  <p className="text-lg font-semibold">{currentWeather.precipitation}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-4 text-center shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <p className="text-sm font-medium text-muted-foreground mb-2">{day.day}</p>
                <day.icon className="w-8 h-8 mx-auto mb-2 text-sky" />
                <p className="text-xl font-bold text-foreground">{day.temp}°</p>
                <p className="text-xs text-muted-foreground mt-1">{day.condition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
