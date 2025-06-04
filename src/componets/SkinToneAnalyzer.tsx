import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';

interface SkinToneAnalyzerProps {
  onSkinToneDetected: (tone: string) => void;
}

const SkinToneAnalyzer: React.FC<SkinToneAnalyzerProps> = ({ onSkinToneDetected }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const analyzeSkinTone = async (imageData: ImageData) => {
    try {
      // Convert ImageData to tensor
      const tensor = tf.browser.fromPixels(imageData);
      
      // Resize to a manageable size
      const resized = tf.image.resizeBilinear(tensor, [224, 224]);
      
      // Convert to float32 and normalize
      const normalized = resized.toFloat().div(tf.scalar(255));
      
      // Get average color values
      const meanRgb = normalized.mean([0, 1]);
      const [r, g, b] = await meanRgb.array();
      
      // Clean up tensors
      tensor.dispose();
      resized.dispose();
      normalized.dispose();
      meanRgb.dispose();

      // Simple skin tone classification based on RGB values
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      
      let skinTone;
      if (luminance > 0.85) skinTone = 'fair';
      else if (luminance > 0.7) skinTone = 'light';
      else if (luminance > 0.55) skinTone = 'medium';
      else if (luminance > 0.4) skinTone = 'olive';
      else if (luminance > 0.25) skinTone = 'tan';
      else if (luminance > 0.15) skinTone = 'deep';
      else skinTone = 'dark';

      return skinTone;
    } catch (error) {
      console.error('Error analyzing skin tone:', error);
      return null;
    }
  };

  const captureImage = useCallback(async () => {
    if (!webcamRef.current) return;

    setIsAnalyzing(true);
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      // Create an image element to get ImageData
      const img = new Image();
      img.src = imageSrc;
      await new Promise(resolve => img.onload = resolve);

      // Create canvas to get ImageData
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const detectedTone = await analyzeSkinTone(imageData);
      if (detectedTone) {
        onSkinToneDetected(detectedTone);
        setShowCamera(false);
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [onSkinToneDetected]);

  return (
    <div className="mt-4">
      {!showCamera ? (
        <button
          onClick={() => setShowCamera(true)}
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
        >
          <Camera size={20} className="mr-2" />
          Analyze Skin Tone
        </button>
      ) : (
        <div className="relative">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: "user"
              }}
            />
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={captureImage}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 disabled:bg-purple-400"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={20} className="inline mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Capture & Analyze'
              )}
            </button>
            <button
              onClick={() => setShowCamera(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkinToneAnalyzer;