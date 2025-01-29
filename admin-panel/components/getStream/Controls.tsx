"use client"

import React from "react";
import {
    SpeakingWhileMutedNotification,
    ToggleAudioPublishingButton,
    ToggleVideoPublishingButton,
    ScreenShareButton,
    RecordCallButton,
    ReactionsButton,
    CancelCallButton,
} from "@stream-io/video-react-sdk";
import { NoiseCancellationButton } from "./NoiseCancellationButton";

interface ControlsProps {
    onLeave: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onLeave }) => (
    <div className="str-video__call-controls">
        <SpeakingWhileMutedNotification>
            <ToggleAudioPublishingButton />
        </SpeakingWhileMutedNotification>
        <ToggleVideoPublishingButton />
        <ScreenShareButton />
        <RecordCallButton />
        <NoiseCancellationButton />
        <ReactionsButton />
        <CancelCallButton onLeave={onLeave} />
    </div>
);
