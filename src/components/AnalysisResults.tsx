import { CheckCircle, AlertTriangle, XCircle, Droplets, FlaskConical } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

interface AnalysisResult {
  status: 'healthy' | 'unhealthy' | 'diseased';
  confidence: number;
  disease?: string;
  fertilizers: Array<{ name: string; dosage: string; reason: string }>;
  irrigation: Array<{ method: string; frequency: string; tips: string }>;
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
      color: 'text-healthy',
      bg: 'status-healthy',
    },
    unhealthy: {
      icon: AlertTriangle,
      label: t.unhealthy,
      color: 'text-warning',
      bg: 'status-warning',
    },
    diseased: {
      icon: XCircle,
      label: t.diseased,
      color: 'text-disease',
      bg: 'status-disease',
    },
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${fontClass}`}>
              {t.resultsTitle}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Health Status Card */}
          <div className="bg-card rounded-2xl shadow-card p-8 mb-8 animate-scale-in">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${config.bg} rounded-xl flex items-center justify-center`}>
                  <StatusIcon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <p className={`text-sm text-muted-foreground mb-1 ${fontClass}`}>
                    {t.healthStatus}
                  </p>
                  <h3 className={`text-2xl font-bold ${config.color} ${fontClass}`}>
                    {config.label}
                  </h3>
                  {result.disease && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.disease}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-sm mb-2">
                  <span className={`text-muted-foreground ${fontClass}`}>{t.confidence}</span>
                  <span className="font-semibold text-foreground">{result.confidence}%</span>
                </div>
                <Progress value={result.confidence} className="h-3" />
              </div>
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Fertilizer Recommendations */}
            <div className="bg-card rounded-2xl shadow-card p-6 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className={`text-xl font-semibold text-foreground ${fontClass}`}>
                  {t.fertilizerTitle}
                </h3>
              </div>
              <div className="space-y-4">
                {result.fertilizers.map((fertilizer, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/50 rounded-xl border border-border/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground">{fertilizer.name}</h4>
                      <span className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded-md">
                        {fertilizer.dosage}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{fertilizer.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Irrigation Suggestions */}
            <div className="bg-card rounded-2xl shadow-card p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-sky rounded-xl flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className={`text-xl font-semibold text-foreground ${fontClass}`}>
                  {t.irrigationTitle}
                </h3>
              </div>
              <div className="space-y-4">
                {result.irrigation.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/50 rounded-xl border border-border/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground">{item.method}</h4>
                      <span className="text-sm text-sky font-medium bg-sky/10 px-2 py-1 rounded-md">
                        {item.frequency}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.tips}</p>
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
