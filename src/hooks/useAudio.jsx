import { useState } from 'react';

export function useAudio(audio, trackRange) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(100);
    const [trackLengthInSeconds, setTrackLengthInSeconds] = useState(null);
    const [isBuffering, setIsBuffering] = useState(true);
    const [isEndlessTrack, setIsEndlessTrack] = useState(null);

	// TO SHOW PROGRESS AND VOLUME VALUE
    const playerStateStyles = {
        '--seek-before-width': `${
            (trackRange.current?.value / trackRange.current?.max) * 100
        }%`,
        '--volume-before-width': `${currentVolume}%`,
    };

	// GETTING VALUE FOR TIMER
    function getTrackTimeFormatted(seconds) {
        return `${
            Math.floor(seconds / 60) < 60
                ? '0' + Math.floor(seconds / 60)
                : Math.floor(seconds / 60)
        } :
                        ${
                            seconds % 60 < 10
                                ? '0' + Math.floor(seconds % 60)
                                : Math.floor(seconds % 60)
                        }`;
    }

	// SETTING PLAYER AFTER IT'S LOADING
    function onMetaLoadedHandler() {
        let duration;
        if (audio.current.duration === Infinity) {
            setIsEndlessTrack(true);
            duration = 5;
        } else {
            duration = audio.current.duration;
        }
        setTrackLengthInSeconds(duration);
        trackRange.current.max = duration;
    }

	// PLAYING STATE 
    function changePlayHandler() {
        isPlaying ? audio.current.pause() : audio.current.play();
        setIsPlaying((prev) => !prev);
    }

	// RANGE UPDATING TIMER TIMER FUNCTIONS
    function changeTimeHandler(e) {
        audio.current.currentTime = Number(e.target.value);
    }

    function inputTimeHandler(e) {
        setCurrentSeconds(Number(e.target.value));
    }

    // TRACK PLAYING
    function trackPlayingHandler() {
        if (!isEndlessTrack) {
            let updatedTime = Math.floor(audio.current.currentTime);
            trackRange.current.value = updatedTime;
            setCurrentSeconds(updatedTime);
        }
        if (isEndlessTrack) {
            if (trackLengthInSeconds >= Math.floor(audio.current.currentTime)) {
                trackRange.current.value = Math.floor(
                    audio.current.currentTime
                );
                setCurrentSeconds((prev) => {
                    return prev < Math.floor(audio.current.currentTime)
                        ? Math.floor(audio.current.currentTime)
                        : prev;
                });
            }
            if (trackLengthInSeconds < Math.floor(audio.current.currentTime)) {
                setTrackLengthInSeconds(() => {
                    return Math.floor(audio.current.currentTime);
                });
                trackRange.current.value = currentSeconds;
                trackRange.current.max = trackLengthInSeconds;
            }
        }
    }

    // VOLUME CHANGE
    function onChangeVolume(e) {
        setCurrentVolume(e.target.value);
        audio.current.volume = e.target.value / 100;
    }

    // BUFFERING SWITCHING
    function onCanPlayHandler() {
        setIsBuffering(false);
    }

    function onWaitingHandler() {
        setIsBuffering(true);
    }

    return {
        playerStateStyles,
        trackTimeFormatted: getTrackTimeFormatted(currentSeconds),
        onMetaLoadedHandler,
        changePlayHandler,
        changeTimeHandler,
        inputTimeHandler,
        trackPlayingHandler,
        onCanPlayHandler,
        onChangeVolume,
        onWaitingHandler,
        isPlaying,
        currentSeconds,
        currentVolume,
        trackLengthInSeconds,
        isBuffering,
    };
}

