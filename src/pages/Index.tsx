import { useState, useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ImageUpload from '@/components/ImageUpload';
import AnalysisResults from '@/components/AnalysisResults';
import WeatherSection from '@/components/WeatherSection';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

interface AnalysisResult {
  status: 'healthy' | 'unhealthy' | 'diseased';
  confidence: number;
  disease?: string;
  fertilizers: Array<{ name: string; dosage: string; reason: string }>;
  irrigation: Array<{ method: string; waterPercentage: string }>;
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate AI analysis with mock data
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock analysis results based on random selection
    const statuses: Array<'healthy' | 'unhealthy' | 'diseased'> = ['healthy', 'unhealthy', 'diseased'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const mockResults: Record<string, AnalysisResult> = {
      healthy: {
        status: 'healthy',
        confidence: 94,
        fertilizers: [
          { name: 'NPK 20-20-20', dosage: '2kg per acre', reason: 'Maintains balanced nutrient levels' },
          { name: 'Vermicompost', dosage: 'Suggested', reason: 'Improves soil organic matter' },
        ],
        irrigation: [
          { method: 'Drip Irrigation', waterPercentage: '60-70%' },
        ],
      },
      unhealthy: {
        status: 'unhealthy',
        confidence: 87,
        disease: 'Nitrogen Deficiency',
        fertilizers: [
          { name: 'Urea (46-0-0)', dosage: '3kg per acre', reason: 'Quickly addresses nitrogen deficiency' },
          { name: 'Vermicompost', dosage: 'Suggested', reason: 'Long-term soil health improvement' },
        ],
        irrigation: [
          { method: 'Drip Irrigation', waterPercentage: '70-80%' },
        ],
      },
      diseased: {
        status: 'diseased',
        confidence: 91,
        disease: 'Leaf Blight (Bacterial)',
        fertilizers: [
          { name: 'Potassium-rich fertilizer', dosage: '2.5kg per acre', reason: 'Strengthens plant immunity' },
          { name: 'Vermicompost', dosage: 'Suggested', reason: 'Natural disease suppressant' },
        ],
        irrigation: [
          { method: 'Drip Irrigation', waterPercentage: '50-60%' },
        ],
      },
    };

    setAnalysisResult(mockResults[randomStatus]);
    setIsAnalyzing(false);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection onUploadClick={scrollToUpload} />
        <FeaturesSection />
        <div ref={uploadRef}>
          <ImageUpload onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
        </div>
        {analysisResult && <AnalysisResults result={analysisResult} />}
        <WeatherSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
