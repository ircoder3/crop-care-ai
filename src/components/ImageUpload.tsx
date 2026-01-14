import { useState, useCallback, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

const ImageUpload = ({ onImageUpload, isAnalyzing }: ImageUploadProps) => {
  const { language, t } = useLanguage();
  const fontClass = language === 'kn' ? 'font-kannada' : '';
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <section id="analyze" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${fontClass}`}>
              {t.uploadTitle}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div
            className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
              dragActive
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
            } ${preview ? 'p-4' : 'p-12'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="text-center py-6">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
                    <p className={`text-foreground font-medium ${fontClass}`}>
                      {t.analyzing}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <ImageIcon className="w-6 h-6 text-primary" />
                    </div>
                    <p className={`text-foreground font-medium mb-2 ${fontClass}`}>
                      {language === 'en' ? 'Image uploaded successfully!' : 'ಚಿತ್ರ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಲೋಡ್ ಆಗಿದೆ!'}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearPreview}
                      className="gap-2"
                    >
                      <X className="w-4 h-4" />
                      <span className={fontClass}>{language === 'en' ? 'Upload different image' : 'ಬೇರೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ'}</span>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-primary" />
                </div>
                <p className={`text-lg text-foreground mb-2 ${fontClass}`}>
                  {t.uploadDesc}
                </p>
                <p className={`text-sm text-muted-foreground mb-6 ${fontClass}`}>
                  {t.uploadSupport}
                </p>
                <Button
                  onClick={() => inputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span className={fontClass}>{t.uploadButton}</span>
                </Button>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;
