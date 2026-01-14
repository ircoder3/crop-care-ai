import { CheckCircle, AlertTriangle, XCircle, Droplets, FlaskConical } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

interface AnalysisResult {
  status: 'healthy' | 'unhealthy' | 'diseased';
  confidence: number;
  disease?: string;
  plantName: string;
  plantType: string;
  leafCondition: string;
  fertilizers: Array<{ name: string; dosage: string; reason: string }>;
  irrigation: Array<{ method: string; waterPercentage: string }>;
}

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const { language, t } = useLanguage();
  const fontClass = language === 'kn' ? 'font-kannada' : '';

  const statusConfig = {
    healthy: {
      icon: CheckCircle,
      label: t.healthy,
      color: 'text-primary',
      bg: 'bg-primary',
    },
    unhealthy: {
      icon: AlertTriangle,
      label: t.unhealthy,
      color: 'text-yellow-600',
      bg: 'bg-yellow-500',
    },
    diseased: {
      icon: XCircle,
      label: t.diseased,
      color: 'text-red-600',
      bg: 'bg-red-500',
    },
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold text-foreground mb-2 ${fontClass}`}>
              {t.resultsTitle}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Plant Details Card */}
          <div className="bg-background border-2 border-primary rounded-lg p-6 mb-6">
            <h3 className={`text-lg font-semibold text-foreground mb-4 ${fontClass}`}>
              {language === 'en' ? 'Plant Details' : 'ಸಸ್ಯದ ವಿವರಗಳು'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className={`text-xs text-muted-foreground mb-1 ${fontClass}`}>
                  {language === 'en' ? 'Plant/Crop Name' : 'ಸಸ್ಯ/ಬೆಳೆ ಹೆಸರು'}
                </p>
                <p className="font-medium text-foreground">{result.plantName}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className={`text-xs text-muted-foreground mb-1 ${fontClass}`}>
                  {language === 'en' ? 'Plant Type' : 'ಸಸ್ಯ ಪ್ರಕಾರ'}
                </p>
                <p className="font-medium text-foreground">{result.plantType}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className={`text-xs text-muted-foreground mb-1 ${fontClass}`}>
                  {language === 'en' ? 'Leaf Condition' : 'ಎಲೆ ಸ್ಥಿತಿ'}
                </p>
                <p className="font-medium text-foreground">{result.leafCondition}</p>
              </div>
            </div>
          </div>

          {/* Health Status Card */}
          <div className="bg-background border-2 border-primary rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${config.bg} rounded-lg flex items-center justify-center`}>
                  <StatusIcon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className={`text-sm text-muted-foreground ${fontClass}`}>
                    {t.healthStatus}
                  </p>
                  <h3 className={`text-xl font-bold ${config.color} ${fontClass}`}>
                    {config.label}
                  </h3>
                  {result.disease && (
                    <p className="text-sm text-muted-foreground">
                      {result.disease}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-sm mb-1">
                  <span className={`text-muted-foreground ${fontClass}`}>{t.confidence}</span>
                  <span className="font-semibold text-foreground">{result.confidence}%</span>
                </div>
                <Progress value={result.confidence} className="h-2" />
              </div>
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Fertilizer Recommendations */}
            <div className="bg-background border-2 border-primary rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <FlaskConical className="w-5 h-5 text-primary" />
                <h3 className={`text-lg font-semibold text-foreground ${fontClass}`}>
                  {t.fertilizerTitle}
                </h3>
              </div>
              <div className="space-y-3">
                {result.fertilizers.map((fertilizer, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-foreground text-sm">{fertilizer.name}</h4>
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">
                        {fertilizer.dosage}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{fertilizer.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Irrigation Suggestions */}
            <div className="bg-background border-2 border-primary rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-5 h-5 text-primary" />
                <h3 className={`text-lg font-semibold text-foreground ${fontClass}`}>
                  {t.irrigationTitle}
                </h3>
              </div>
              <div className="space-y-3">
                {result.irrigation.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted rounded-lg"
                  >
                    <h4 className="font-medium text-foreground text-sm mb-1">{item.method}</h4>
                    <p className="text-sm text-primary font-medium">
                      {language === 'en' ? 'Water Required:' : 'ಅಗತ್ಯವಿರುವ ನೀರು:'} {item.waterPercentage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisResults;
