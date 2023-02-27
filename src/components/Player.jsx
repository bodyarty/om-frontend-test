import React, { useRef, useState } from 'react';
import { useAudio } from '../hooks/useAudio';

const Player = ({ goBack, sourceLink }) => {
    const audio = useRef();
    const trackRange = useRef();
    const {
        playerStateStyles,
        trackTimeFormatted,
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
        isBuffering,
    } = useAudio(audio, trackRange);

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
                onTimeUpdate={trackPlayingHandler}
                onCanPlay={onCanPlayHandler}
                onWaiting={onWaitingHandler}
            />
            <div className="player-wrapper-body">
                <div
                    className="player"
                    style={playerStateStyles}
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
                    <p className="timer text-small">{trackTimeFormatted}</p>
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
