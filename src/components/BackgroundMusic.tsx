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

            // Create multiple oscillators for richer, less repetitive sound
            const oscillators: OscillatorNode[] = [];
            const gains: GainNode[] = [];

            // Soothing chord progression notes (C major pentatonic scale)
            const frequencies = [
                261.63, // C4
                293.66, // D4
                329.63, // E4
                392.00, // G4
                440.00, // A4
            ];

            const masterGain = audioContext.createGain();
            masterGain.gain.setValueAtTime(volume, audioContext.currentTime);

            // Create a filter for gentle sweeping effect
            const filter = audioContext.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, audioContext.currentTime);
            filter.Q.setValueAtTime(1, audioContext.currentTime);

            // Create oscillators with varying frequencies for ambient sound
            frequencies.forEach((freq, index) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioContext.currentTime);

                // Vary the volume of each oscillator for depth
                const baseVolume = 0.015 / (index + 1); // Quieter for higher notes
                gain.gain.setValueAtTime(baseVolume, audioContext.currentTime);

                // Add gentle LFO (Low Frequency Oscillator) for subtle variation
                const lfo = audioContext.createOscillator();
                const lfoGain = audioContext.createGain();
                lfo.frequency.setValueAtTime(0.1 + index * 0.05, audioContext.currentTime);
                lfoGain.gain.setValueAtTime(baseVolume * 0.3, audioContext.currentTime);

                lfo.connect(lfoGain);
                lfoGain.connect(gain.gain);

                osc.connect(gain);
                gain.connect(filter);

                oscillators.push(osc);
                gains.push(gain);
                oscillators.push(lfo);
            });

            filter.connect(masterGain);
            masterGain.connect(audioContext.destination);

            // Store references
            (audioRef as any).current = {
                context: audioContext,
                oscillators,
                gains,
                masterGain,
                filter,
                start: () => {
                    oscillators.forEach(osc => osc.start());
                },
                stop: () => {
                    oscillators.forEach(osc => {
                        try {
                            osc.stop();
                        } catch (e) {
                            // Already stopped
                        }
                    });
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
        if (audioRef.current && (audioRef.current as any).masterGain) {
            (audioRef.current as any).masterGain.gain.setValueAtTime(volume, (audioRef.current as any).context.currentTime);
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
