import React, { useRef, useState } from 'react';

const InputLink = ({ uploadLink }) => {
    const [isError, setIsError] = useState(false);
    const input = useRef();

    function onClickHandler() {
        const linkValue = input.current.value.trim().toLowerCase();
        if (linkValue.startsWith('https://')) {
            uploadLink(linkValue);
            setIsError(false);
        } else {
            setIsError(true);
        }
        return;
    }

    return (
        <div className="input-form error">
            <label>Insert the link</label>
            <div
                className={
                    isError ? 'control-accessory error' : 'control-accessory'
                }
            >
                <input
                    type="text"
                    id="source-link"
                    placeholder="https://"
                    ref={input}
                    onChange={() => {
                        setIsError(false);
                    }}
                />
                <button
                    className="btn-control"
                    onClick={onClickHandler}
                >
                    <svg
                        width="40"
                        height="36"
                        viewBox="0 0 40 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M39.7197 18.6943C40.0934 18.3068 40.0934 17.693 39.7197 17.3056L23.7197 0.721618L23.0253 0.00195312L21.586 1.3906L22.2803 2.11026L36.6457 16.9999H1H0V18.9999H1H36.6457L22.2803 33.8896L21.586 34.6093L23.0253 35.9979L23.7197 35.2782L39.7197 18.6943Z"
                            fill="#1B191C"
                        />
                    </svg>
                </button>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="control-icon-warning"
                >
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#C6A827"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12 8V12"
                        stroke="#C6A827"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <circle
                        cx="12"
                        cy="16"
                        r="0.5"
                        fill="black"
                        stroke="#C6A827"
                    />
                </svg>
                <p className="message-error text-small">Error message here</p>
            </div>
        </div>
    );
};

export default InputLink;
