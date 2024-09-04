import React, { useState, useRef, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';

const audioFiles = [
  {
    name: 'Song 1',
    src: `${process.env.PUBLIC_URL}/music/Absolute_Buffoonery_Loop_G_Minor_130_BPM.wav`,
  },
  {
    name: 'Song 2',
    src: `${process.env.PUBLIC_URL}/music/Learn_to_Turn_Solo_Guitar_E_Minor_120_BPM.wav`,
  },
  {
    name: 'Song 3',
    src: `${process.env.PUBLIC_URL}/music/Solo_Drumset_Groove_1_135_BPM.wav`,
  },
];

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const playerRef = useRef(null);
  const preloadAudioRef = useRef(new Audio()); // Hidden audio element for preloading
  const preloadedIndex = useRef(-1); // Track which song is preloaded
  const [isMobileView, setIsMobileView] = useState(false);

  // Handle listen event
  const handleListen = (e) => {
    const currentTime = e.target.currentTime;
    const duration = playerRef.current.audio.current.duration;
    // Check if currentTime reaches 80% of the duration
    if (currentTime / duration > 0.8) {
      preloadNextSong(); // Preload the next song
    }
  };

  // Calculate the next index for looping
  const getNextIndex = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= audioFiles.length) {
      nextIndex = 0; // Loop back to the first song
    }
    return nextIndex;
  };

  // Preload the next song using a hidden audio element
  const preloadNextSong = () => {
    const nextIndex = getNextIndex();

    // Only preload if not already preloaded
    if (preloadedIndex.current !== nextIndex) {
      preloadAudioRef.current.src = audioFiles[nextIndex].src;
      preloadAudioRef.current.load(); // Preload the next song
      preloadedIndex.current = nextIndex; // Update preloaded index
    }
  };

  // Handle playing the preloaded song when the current one ends
  const handleSongEnd = () => {
    setCurrentIndex(getNextIndex()); // Update the main player to the preloaded song
    preloadedIndex.current = -1; // Reset preloaded index
  };

  useEffect(() => {
    preloadAudioRef.current.preload = 'auto'; // Set preload attribute

    // Media query to detect screen size change
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    // Function to update the layout based on the screen size
    const handleResize = () => {
      setIsMobileView(mediaQuery.matches);
    };

    // Set initial layout state
    handleResize();

    // Add event listener for screen size changes
    mediaQuery.addEventListener('change', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);
  return (
    <AudioPlayer
      ref={playerRef}
      src={audioFiles[currentIndex].src}
      layout={isMobileView ? 'stacked' : 'horizontal-reverse'}
      autoPlay
      listenInterval={1000} // Interval to call onListen (in ms)
      onListen={handleListen}
      onEnded={handleSongEnd} // Play the preloaded song when the current song ends
      loop={false}
      autoPlayAfterSrcChange={true}
      onError={(e) => console.error('Error playing audio:', e)}
      showVolumeControl={!isMobileView}
    />
  );
};

export default MusicPlayer;
