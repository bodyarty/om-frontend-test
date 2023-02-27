import React, { useRef, useState } from 'react';

const Player = ({ goBack, sourceLink }) => {
    // Audio Logics
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(100);
    const audio = useRef();
    const trackRange = useRef();
    const [trackLengthInSeconds, setTrackLengthInSeconds] = useState(null);

    const inputStyles = {
        '--seek-before-width': `${
            (trackRange.current?.value / trackRange.current?.max) * 100
        }%`,
        '--volume-before-width': `${currentVolume}%`,
    };

    // Getting Track Time in Correct Format
    function getTrackTimeFormatted(seconds) {
        return `${Math.floor(seconds / 60)} :
                        ${
                            seconds % 60 < 10
                                ? '0' + Math.floor(seconds % 60)
                                : Math.floor(seconds % 60)
                        }`;
    }

    function onMetaLoadedHandler() {
        const duration =
            audio.current.duration !== Infinity ? audio.current.duration : 5;
        setTrackLengthInSeconds(duration);
        trackRange.current.max = duration;
    }

    function inputTimeHandler(e) {
        setCurrentSeconds(Number(e.target.value));
    }

    function changePlayHandler() {
        isPlaying ? audio.current.pause() : audio.current.play();
        setIsPlaying((prev) => !prev);
    }

    function changeTimeHandler(e) {
        audio.current.currentTime = Number(e.target.value);
    }

    function onTimeUpdateHandler() {
        if (audio.current.duration !== Infinity) {
            let updatedTime = Math.floor(audio.current.currentTime);
            trackRange.current.value = updatedTime;
            setCurrentSeconds(updatedTime);
        }
        if (audio.current.duration === Infinity) {
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

    function onChangeVolume(e) {
        setCurrentVolume(e.target.value);
        audio.current.volume = e.target.value / 100;
    }

    ////////////////////Buffering issue/////////////////
    const [isBuffering, setIsBuffering] = useState(true);
    function onCanPlayHandler() {
        setIsBuffering(false);
    }

    function onWaitingHandler() {
        setIsBuffering(true);
    }

    return (
        <div className="player-container">
            <div className="player-container-header">
                <button
                    className="btn-link"
                    onClick={goBack}
                >
                    ← Back
                </button>
            </div>
            <audio
                onLoadedMetadata={onMetaLoadedHandler}
                ref={audio}
                src={sourceLink}
                preload="metadata"
                loop
                onTimeUpdate={onTimeUpdateHandler}
                onCanPlay={onCanPlayHandler}
                onWaiting={onWaitingHandler}
            />
            <div className="player-wrapper-body">
                <div
                    className="player"
                    style={inputStyles}
                >
                    {isBuffering ? <div className="loader-line"></div> : null}
                    <div
                        className="control-play"
                        onClick={changePlayHandler}
                    >
                        {isPlaying ? (
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="4"
                                    width="4"
                                    height="40"
                                    fill="white"
                                />
                                <rect
                                    x="32"
                                    width="4"
                                    height="40"
                                    fill="white"
                                />
                            </svg>
                        ) : (
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 40V0H4.34286L40 18.7952V20.9639L4.34286 40H0Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                    </div>
                    <input
                        ref={trackRange}
                        type="range"
                        max="100"
                        id="track"
                        className="control-track"
                        onChange={changeTimeHandler}
                        defaultValue={currentSeconds}
                        onInput={inputTimeHandler}
                    />
                    <p className="timer text-small">
                        {getTrackTimeFormatted(currentSeconds)}
                    </p>
                    <input
                        type="range"
                        max="100"
                        className="control-volume"
                        id="volume"
                        defaultValue={currentVolume}
                        onInput={onChangeVolume}
                    />
                </div>
            </div>
        </div>
    );
};

export default Player;
