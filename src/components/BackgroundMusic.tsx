import React, { useEffect, useRef, useState } from 'react';
import { Volume2Icon, VolumeXIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackgroundMusicProps {
    isPlaying: boolean;
    onToggle: () => void;
    isDarkMode?: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
    isPlaying,
    onToggle,
    isDarkMode = false
}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [volume, setVolume] = useState(0.3);
    const [showVolumeControl, setShowVolumeControl] = useState(false);

    useEffect(() => {
        // Create a simple, soothing tone using Web Audio API
        if (!audioRef.current) {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

            // Create oscillators for a calming ambient sound
            const oscillator1 = audioContext.createOscillator();
            const oscillator2 = audioContext.createOscillator();
            const oscillator3 = audioContext.createOscillator();

            const gainNode = audioContext.createGain();
            const masterGain = audioContext.createGain();

            // Set frequencies for a calming chord (C major with overtones)
            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(261.63, audioContext.currentTime); // C4

            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(329.63, audioContext.currentTime); // E4

            oscillator3.type = 'sine';
            oscillator3.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4

            // Set very low volume for ambient background
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            masterGain.gain.setValueAtTime(volume, audioContext.currentTime);

            // Connect nodes
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            oscillator3.connect(gainNode);
            gainNode.connect(masterGain);
            masterGain.connect(audioContext.destination);

            // Store references
            (audioRef as any).current = {
                context: audioContext,
                oscillators: [oscillator1, oscillator2, oscillator3],
                gainNode: masterGain,
                start: () => {
                    oscillator1.start();
                    oscillator2.start();
                    oscillator3.start();
                },
                stop: () => {
                    oscillator1.stop();
                    oscillator2.stop();
                    oscillator3.stop();
                }
            };
        }

        return () => {
            if (audioRef.current) {
                try {
                    (audioRef.current as any).stop();
                } catch (e) {
                    // Already stopped
                }
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current && (audioRef.current as any).gainNode) {
            (audioRef.current as any).gainNode.gain.setValueAtTime(volume, (audioRef.current as any).context.currentTime);
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                try {
                    if ((audioRef.current as any).context.state === 'suspended') {
                        (audioRef.current as any).context.resume();
                    }
                    if ((audioRef.current as any).oscillators[0].context.state !== 'running') {
                        (audioRef.current as any).start();
                    }
                } catch (e) {
                    console.log('Audio already playing');
                }
            } else {
                try {
                    (audioRef.current as any).context.suspend();
                } catch (e) {
                    console.log('Audio already paused');
                }
            }
        }
    }, [isPlaying]);

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggle}
                onMouseEnter={() => setShowVolumeControl(true)}
                onMouseLeave={() => setShowVolumeControl(false)}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-dark-calm-200/50' : 'hover:bg-calm-50'} theme-transition relative`}
                aria-label={isPlaying ? 'Désactiver le son' : 'Activer le son'}
            >
                {isPlaying ? (
                    <Volume2Icon size={20} className={`${isDarkMode ? 'text-dark-comfort-500' : 'text-comfort-500'} animate-pulse`} />
                ) : (
                    <VolumeXIcon size={20} className={isDarkMode ? 'text-dark-text' : 'text-text'} />
                )}

                {isPlaying && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-dark-comfort-500' : 'bg-comfort-500'}`}
                        style={{ zIndex: -1 }}
                    />
                )}
            </motion.button>

            {showVolumeControl && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full mt-2 right-0 ${isDarkMode ? 'bg-dark-calm-200' : 'bg-white'} p-3 rounded-lg shadow-lg`}
                    onMouseEnter={() => setShowVolumeControl(true)}
                    onMouseLeave={() => setShowVolumeControl(false)}
                >
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume * 100}
                        onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
                        className="w-24 accent-comfort-500"
                    />
                </motion.div>
            )}
        </div>
    );
};
