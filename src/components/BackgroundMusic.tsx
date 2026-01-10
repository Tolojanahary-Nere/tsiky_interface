import React, { useEffect, useRef, useState } from 'react';
import { Volume2Icon, VolumeXIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        // Initialize audio element
        const audio = new Audio('/song/Demon_Slayer_Tanjiro_no_Uta.mp3');
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        // Cleanup on unmount
        return () => {
            audio.pause();
            audio.src = '';
            audioRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Autoplay prevented by browser policy:", error);
                        // Optional: You could update specific state here to show UI indicating interaction is needed
                    });
                }
            } else {
                audioRef.current.pause();
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

            <AnimatePresence>
                {showVolumeControl && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute top-full mt-2 right-0 ${isDarkMode ? 'bg-dark-calm-200' : 'bg-white'} p-3 rounded-lg shadow-lg z-50`}
                        onMouseEnter={() => setShowVolumeControl(true)}
                        onMouseLeave={() => setShowVolumeControl(false)}
                    >
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume * 100}
                            onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
                            className="w-24 accent-comfort-500 cursor-pointer"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
