import { useState } from 'react';
import { CloudRain, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const WeatherSection = () => {
  const { language, t } = useLanguage();
  const fontClass = language === 'kn' ? 'font-kannada' : '';
  const [selectedCity, setSelectedCity] = useState('bengaluru');

  const karnatakaDistricts = [
    { value: 'bengaluru', label: language === 'en' ? 'Bengaluru' : 'ಬೆಂಗಳೂರು' },
    { value: 'mysuru', label: language === 'en' ? 'Mysuru' : 'ಮೈಸೂರು' },
    { value: 'hubli', label: language === 'en' ? 'Hubli-Dharwad' : 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ' },
    { value: 'mangaluru', label: language === 'en' ? 'Mangaluru' : 'ಮಂಗಳೂರು' },
    { value: 'belagavi', label: language === 'en' ? 'Belagavi' : 'ಬೆಳಗಾವಿ' },
    { value: 'kalaburagi', label: language === 'en' ? 'Kalaburagi' : 'ಕಲಬುರಗಿ' },
    { value: 'davanagere', label: language === 'en' ? 'Davanagere' : 'ದಾವಣಗೆರೆ' },
    { value: 'ballari', label: language === 'en' ? 'Ballari' : 'ಬಳ್ಳಾರಿ' },
    { value: 'shivamogga', label: language === 'en' ? 'Shivamogga' : 'ಶಿವಮೊಗ್ಗ' },
    { value: 'tumakuru', label: language === 'en' ? 'Tumakuru' : 'ತುಮಕೂರು' },
    { value: 'raichur', label: language === 'en' ? 'Raichur' : 'ರಾಯಚೂರು' },
    { value: 'bidar', label: language === 'en' ? 'Bidar' : 'ಬೀದರ್' },
    { value: 'hassan', label: language === 'en' ? 'Hassan' : 'ಹಾಸನ' },
    { value: 'udupi', label: language === 'en' ? 'Udupi' : 'ಉಡುಪಿ' },
    { value: 'chitradurga', label: language === 'en' ? 'Chitradurga' : 'ಚಿತ್ರದುರ್ಗ' },
  ];

  // Mock weather data based on selected city
  const getWeatherForCity = (city: string) => {
    const baseTemp: Record<string, number> = {
      bengaluru: 26,
      mysuru: 25,
      hubli: 28,
      mangaluru: 30,
      belagavi: 27,
      kalaburagi: 32,
      davanagere: 29,
      ballari: 31,
      shivamogga: 27,
      tumakuru: 28,
      raichur: 33,
      bidar: 30,
      hassan: 24,
      udupi: 29,
      chitradurga: 28,
    };
    return baseTemp[city] || 27;
  };

  // Get next 3 days
  const getNext3Days = () => {
    const days = [];
    const now = new Date();
    const baseTemp = getWeatherForCity(selectedCity);
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      
      days.push({
        day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
        date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        time: i === 0 ? now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '06:00 AM',
        temp: baseTemp + Math.floor(Math.random() * 4) - 1,
        rain: [20, 60, 30][i],
      });
    }
    return days;
  };

  const forecast = getNext3Days();
  const selectedCityLabel = karnatakaDistricts.find(d => d.value === selectedCity)?.label || '';

  return (
    <section id="weather" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className={`text-2xl font-bold text-foreground mb-2 ${fontClass}`}>
            {t.weatherTitle}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* City Selection */}
        <div className="max-w-md mx-auto mb-8">
          <label className={`block text-sm font-medium text-foreground mb-2 ${fontClass}`}>
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4" />
              {language === 'en' ? 'Select your area in Karnataka' : 'ಕರ್ನಾಟಕದಲ್ಲಿ ನಿಮ್ಮ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
            </div>
          </label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full bg-background border-border">
              <SelectValue placeholder={language === 'en' ? 'Select a city' : 'ನಗರವನ್ನು ಆಯ್ಕೆಮಾಡಿ'} />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              {karnatakaDistricts.map((district) => (
                <SelectItem key={district.value} value={district.value}>
                  {district.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className={`text-center text-muted-foreground mb-4 ${fontClass}`}>
            {language === 'en' ? `Weather forecast for ${selectedCityLabel}` : `${selectedCityLabel} ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ`}
          </p>
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
