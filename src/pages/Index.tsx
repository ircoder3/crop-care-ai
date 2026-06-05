
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ImageUpload from '@/components/ImageUpload';
import AnalysisResults from '@/components/AnalysisResults';
import WeatherSection from '@/components/WeatherSection';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { analyzeImage } from '@/lib/imageAnalysis';

interface AnalysisResult {
  status: 'healthy' | 'unhealthy' | 'diseased';
  confidence: number;
  disease?: string;
  plantName: string;
  plantType: string;
  leafCondition: string;
  fertilizers: Array<{
    name: string;
    dosage: string;
    reason: string;
  }>;
  irrigation: Array<{
    method: string;
    waterPercentage: string;
  }>;
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);

  const uploadRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    document
      .getElementById('analyze')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsAnalyzing(true);
      setAnalysisResult(null);

      // Small delay for loading animation
      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      const result = await analyzeImage(file);

      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />

        <HeroSection
          onUploadClick={scrollToUpload}
        />

        <FeaturesSection />

        <div ref={uploadRef}>
          <ImageUpload
            onImageUpload={handleImageUpload}
            isAnalyzing={isAnalyzing}
          />
        </div>

        {analysisResult && (
          <AnalysisResults
            result={analysisResult}
          />
        )}

        <WeatherSection />

        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
