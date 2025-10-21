import { Camera, Video, Image, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const CameraWindow = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setIsCameraActive(true);
      setCapturedImage(null);
      toast({
        title: "Camera Started",
        description: "Camera is now active",
      });
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please grant permission.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        
        // Save to localStorage
        const photos = JSON.parse(localStorage.getItem('mrunos-photos') || '[]');
        photos.unshift({ id: Date.now(), data: imageData, timestamp: Date.now() });
        localStorage.setItem('mrunos-photos', JSON.stringify(photos));
        
        stopCamera();
        toast({
          title: "Photo Captured!",
          description: "Your photo has been captured successfully",
        });
      }
    }
  };

  const downloadPhoto = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `mrunos-photo-${Date.now()}.png`;
      link.href = capturedImage;
      link.click();
      toast({
        title: "Photo Downloaded",
        description: "Photo saved to your downloads",
      });
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 gap-4">
      <div className="w-full max-w-md aspect-video rounded-lg bg-muted/20 border border-primary/20 overflow-hidden relative">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        {!isCameraActive && !capturedImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera className="w-16 h-16 text-primary/40" />
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="flex gap-3">
        {!isCameraActive && !capturedImage && (
          <Button variant="outline" size="sm" className="gap-2" onClick={startCamera}>
            <Camera className="w-4 h-4" />
            Start Camera
          </Button>
        )}
        {isCameraActive && (
          <>
            <Button variant="outline" size="sm" className="gap-2" onClick={capturePhoto}>
              <Camera className="w-4 h-4" />
              Capture Photo
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={stopCamera}>
              <Video className="w-4 h-4" />
              Stop
            </Button>
          </>
        )}
        {capturedImage && (
          <>
            <Button variant="outline" size="sm" className="gap-2" onClick={downloadPhoto}>
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={startCamera}>
              <Camera className="w-4 h-4" />
              Retake
            </Button>
          </>
        )}
      </div>
      <p className="text-xs text-muted-foreground terminal-text">Camera interface - MrunOS v1.0</p>
    </div>
  );
};
