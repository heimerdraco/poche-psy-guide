
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Volume2, CheckCircle } from "lucide-react";

interface AudioActivityProps {
  activity: {
    title: string;
    description?: string;
    audioUrl?: string;
    audioText?: string;
    visualUrl?: string;
    duration?: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

const AudioActivity = ({ activity, onComplete, onBack }: AudioActivityProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setIsCompleted(true);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {activity.title}
              </h1>
              {activity.description && (
                <p className="text-gray-600">
                  {activity.description}
                </p>
              )}
            </div>

            {/* Visual/Illustration */}
            {activity.visualUrl ? (
              <div className="mb-8 text-center">
                <img 
                  src={activity.visualUrl} 
                  alt="Illustration inspirante"
                  className="max-w-full h-48 object-cover rounded-lg mx-auto"
                />
              </div>
            ) : (
              <div className="mb-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                  <Volume2 className="w-12 h-12 text-purple-500" />
                </div>
              </div>
            )}

            {/* Audio Text (if no audio file) */}
            {activity.audioText && !activity.audioUrl && (
              <div className="mb-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-gray-700 leading-relaxed text-lg italic text-center">
                  "{activity.audioText}"
                </p>
              </div>
            )}

            {/* Audio Player */}
            {activity.audioUrl && (
              <div className="mb-8">
                <audio ref={audioRef} src={activity.audioUrl} preload="metadata" />
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </Button>
                  <Button
                    onClick={handleStop}
                    variant="outline"
                    className="w-16 h-16 rounded-full"
                  >
                    <Square className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-gray-700 text-center">
                🎧 Installez-vous confortablement et prenez ce moment pour vous.
              </p>
            </div>

            {/* Completion Status */}
            {isCompleted && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Activité terminée !</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={onBack}
                variant="outline"
                className="flex-1"
              >
                ← Retour
              </Button>
              <Button
                onClick={handleComplete}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                ✓ Terminer l'activité
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudioActivity;
