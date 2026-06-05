export interface AnalysisResult {
  status: "healthy" | "unhealthy" | "diseased";
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

export async function analyzeImage(
  file: File
): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas not supported");
      }

      canvas.width = 300;
      canvas.height = 300;

      ctx.drawImage(img, 0, 0, 300, 300);

      const imageData = ctx.getImageData(
        0,
        0,
        300,
        300
      ).data;

      let greenPixels = 0;
      let yellowPixels = 0;
      let brownPixels = 0;

      const totalPixels = imageData.length / 4;

      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];

        // Green leaf detection
        if (
          g > r + 20 &&
          g > b + 20 &&
          g > 80
        ) {
          greenPixels++;
        }

        // Yellow leaf detection
        if (
          r > 150 &&
          g > 150 &&
          b < 120
        ) {
          yellowPixels++;
        }

        // Brown spot detection
        if (
          r > 80 &&
          r < 180 &&
          g > 40 &&
          g < 140 &&
          b < 100
        ) {
          brownPixels++;
        }
      }

      const greenPercent =
        (greenPixels / totalPixels) * 100;

      const yellowPercent =
        (yellowPixels / totalPixels) * 100;

      const brownPercent =
        (brownPixels / totalPixels) * 100;

      let result: AnalysisResult;

      if (
        greenPercent > 35 &&
        yellowPercent < 8 &&
        brownPercent < 8
      ) {
        result = {
          status: "healthy",
          confidence: 92,
          plantName: "Detected Crop",
          plantType: "Agricultural Plant",
          leafCondition:
            "Green healthy foliage detected.",
          fertilizers: [
            {
              name: "NPK 20-20-20",
              dosage: "2kg per acre",
              reason:
                "Maintain healthy growth."
            }
          ],
          irrigation: [
            {
              method: "Drip Irrigation",
              waterPercentage: "60-70%"
            }
          ]
        };
      } else if (
        yellowPercent > brownPercent
      ) {
        result = {
          status: "unhealthy",
          confidence: 84,
          disease:
            "Possible Nitrogen Deficiency",
          plantName: "Detected Crop",
          plantType: "Agricultural Plant",
          leafCondition:
            "Yellowing regions detected.",
          fertilizers: [
            {
              name: "Urea",
              dosage: "3kg per acre",
              reason:
                "Correct nitrogen deficiency."
            }
          ],
          irrigation: [
            {
              method: "Drip Irrigation",
              waterPercentage: "70-80%"
            }
          ]
        };
      } else {
        result = {
          status: "diseased",
          confidence: 88,
          disease:
            "Leaf Spot / Blight Symptoms",
          plantName: "Detected Crop",
          plantType: "Agricultural Plant",
          leafCondition:
            "Brown damaged regions detected.",
          fertilizers: [
            {
              name: "Potassium Fertilizer",
              dosage: "2.5kg per acre",
              reason:
                "Improves resistance."
            }
          ],
          irrigation: [
            {
              method:
                "Controlled Drip Irrigation",
              waterPercentage: "50-60%"
            }
          ]
        };
      }

      resolve(result);
    };

    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

