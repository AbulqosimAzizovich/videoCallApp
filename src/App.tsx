import {
  CallingState,
  CancelCallButton,
  LoadingIndicator,
  ParticipantView,
  SpeakerLayout,
  SpeakingWhileMutedNotification,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  StreamVideoParticipant,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCall,
  useCallStateHooks,
  User,
} from "@stream-io/video-react-sdk";

import type { CallControlsProps } from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useState } from "react";

export const CallControls = ({ onLeave }: CallControlsProps) => (
  <div className="str-video__call-controls">
    <CustomRecordCallButton />
    <CustomScreenShareButton />
    <CustomToggleVideoPublishingButton />
    <CustomToggleAudioPublishingButton />
    <CustomCancelCallButton />
  </div>
);

const urlParams = new URLSearchParams(window.location.search);
const apiKey = "mmhfdzb5evj2"; // the API key can be found in the "Credentials" section
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiS2l0X0Zpc3RvIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9LaXRfRmlzdG8iLCJpYXQiOjE3MTIwNTc1NDgsImV4cCI6MTcxMjY2MjM1M30.92Wlx4KDLxUoee3kakwKuB9e_6QYS61qmxOUwKgZMxg"; // the token can be found in the "Credentials" section
const userId = "Kit_Fisto"; // the user id can be found in the "Credentials" section
const callId = "6yqufTBvWXfv"; // the call id can be found in the "Credentials" section
const callType = urlParams.get("call_type") || "default";
// set up the user object
const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call(callType, callId);
call.join({ create: true });

export const MyUILayout = () => {
  const call = useCall();

  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <SpeakerLayout participantsBarPosition="bottom" />
        <CallControls />
      </StreamCall>
    </StreamVideo>
  );
};

type CustomCancelCallButtonProps = {
  reject?: boolean;
};

export const CustomCancelCallButton = ({
  reject,
}: CustomCancelCallButtonProps) => {
  const call = useCall();
  return (
    <button onClick={() => call?.leave({ reject })}>
      <span className="my-icon">
        <svg
          height="24px"
          width="24px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 208.014 208.014"
          fill="#000000"
          transform="rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
            stroke-width="0.416028"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path
                fill="#ff0000"
                d="M61.644,139.278C15.13,92.463,7.632,65.096,10.835,38.53c0.419-3.654,1.324-7.294,2.766-11.112 c2.613-6.667,6.159-11.17,8.672-13.771l5.458-5.536c1.689-1.686,4.069-2.656,6.535-2.656c2.233,0,4.255,0.784,5.672,2.215 l31.326,31.315c3.239,3.242,3.053,8.722-0.422,12.207L51.276,70.74l-0.394,0.401l1.084,1.836c1.095,1.843,2.248,3.915,3.493,6.177 c5.615,10.117,13.31,23.892,27.718,38.609l3.887-3.901C73.179,99.685,65.72,86.311,60.27,76.469l-2.502-4.445l16.96-16.953 c5.608-5.626,5.801-14.58,0.422-19.974L43.825,3.779C41.384,1.342,37.991,0,34.266,0c-3.933,0-7.716,1.535-10.393,4.219 l-7.695,7.734l-0.723,1.181c-2.856,3.672-5.204,7.802-6.961,12.301c-1.628,4.287-2.645,8.36-3.106,12.447 c-4.015,33.273,11.198,63.865,52.369,105.29L61.644,139.278z"
              ></path>{" "}
              <path
                fill="#ff0000"
                d="M199.333,159.305l-31.326-31.344c-2.441-2.434-5.841-3.776-9.57-3.776 c-3.933,0-7.712,1.539-10.397,4.216l-16.924,16.924l-4.574-2.53c-7.287-4.048-16.534-9.205-26.605-17.264l-3.915,3.922 c10.608,8.568,20.288,13.95,27.894,18.166c2.355,1.299,4.398,2.448,6.22,3.525l1.84,1.102l19.956-19.956 c1.671-1.671,4.041-2.63,6.503-2.63c2.248,0,4.266,0.78,5.694,2.215l31.311,31.297c3.228,3.25,3.046,8.725-0.408,12.19 l-5.544,5.476c-2.62,2.52-7.129,6.066-13.728,8.643c-3.718,1.435-7.365,2.351-11.127,2.802c-0.211,0.025-1.056,0.075-2.434,0.075 c-10.239,0-44.94-3.264-87.922-41.171l-3.89,3.887c44.546,39.435,80.703,42.814,91.357,42.814c1.979,0,3.174-0.115,3.511-0.147 c4.273-0.523,8.364-1.553,12.487-3.146c4.452-1.736,8.564-4.069,12.225-6.929l1.746-1.378l7.201-7.068 C204.526,173.635,204.709,164.684,199.333,159.305z"
              ></path>{" "}
              <path
                fill="#ff0000"
                d="M5.538,203.923L169.103,40.362l4.091,4.091L9.629,208.014L5.538,203.923z"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </span>
    </button>
  );
};

export const CustomRecordCallButton = () => {
  const call = useCall();
  const { useIsCallRecordingInProgress } = useCallStateHooks();

  const isCallRecordingInProgress = useIsCallRecordingInProgress();
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);

  useEffect(() => {
    // we wait until call.recording_started/stopped event to flips the
    // `isCallRecordingInProgress` state variable.
    // Once the flip happens, we remove the loading indicator
    setIsAwaitingResponse((isAwaiting) => {
      if (isAwaiting) return false;
      return isAwaiting;
    });
  }, [isCallRecordingInProgress]);

  const toggleRecording = useCallback(async () => {
    try {
      setIsAwaitingResponse(true);
      if (isCallRecordingInProgress) {
        await call?.stopRecording();
      } else {
        await call?.startRecording();
      }
    } catch (e) {
      console.error(`Failed start recording`, e);
    }
  }, [call, isCallRecordingInProgress]);

  return (
    <>
      {isAwaitingResponse ? (
        <LoadingIndicator
          tooltip={
            isCallRecordingInProgress
              ? "Waiting for recording to stop... "
              : "Waiting for recording to start..."
          }
        />
      ) : (
        <button disabled={!call} title="Record call" onClick={toggleRecording}>
          {isCallRecordingInProgress ? (
            <span className="my-icon-enabled">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="rgba(255,255,255,1)"
                id="record"
              >
                <path
                  fill="#fff"
                  d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                ></path>
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-2 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          ) : (
            <span className="my-icon-disabled">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="rgba(255,255,255,1)"
                id="record"
              >
                <path
                  fill="#fff"
                  d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
                ></path>
                <path
                  fill="#fff"
                  fill-rule="evenodd"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-2 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          )}
        </button>
      )}
    </>
  );
};

export const CustomToggleAudioPublishingButton = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();
  return (
    <button onClick={() => microphone.toggle()}>
      {isMute ? (
        <span className="my-icon-disabled">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="rgba(255,255,255,1)"
            viewBox="0 0 24 24"
          >
            <path d="m21.707 20.293-3.4-3.4A7.93 7.93 0 0 0 20 12h-2a5.945 5.945 0 0 1-1.119 3.467l-1.449-1.45A3.926 3.926 0 0 0 16 12V6c0-2.217-1.785-4.021-3.979-4.021-.07 0-.14.009-.209.025A4.006 4.006 0 0 0 8 6v.586L3.707 2.293 2.293 3.707l18 18 1.414-1.414zM6 12H4c0 4.072 3.06 7.436 7 7.931V22h2v-2.069a7.935 7.935 0 0 0 2.241-.63l-1.549-1.548A5.983 5.983 0 0 1 12 18c-3.309 0-6-2.691-6-6z"></path>
            <path d="M8.007 12.067a3.996 3.996 0 0 0 3.926 3.926l-3.926-3.926z"></path>
          </svg>
        </span>
      ) : (
        <span className="my-icon-enabled">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="rgba(255,255,255,1)"
            viewBox="0 0 24 24"
          >
            <path d="M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z"></path>
            <path d="M11 19.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H4c0 4.072 3.061 7.436 7 7.931z"></path>
          </svg>
        </span>
      )}
    </button>
  );
};

export const CustomToggleVideoPublishingButton = () => {
  const { useCameraState } = useCallStateHooks();
  const { camera, isMute } = useCameraState();
  return (
    <button onClick={() => camera.toggle()}>
      {isMute ? (
        <span className="my-icon-disabled">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="rgba(255,255,255,1)"
            viewBox="0 0 24 24"
          >
            <path d="M4 19h10.879L2.145 6.265A1.977 1.977 0 0 0 2 7v10c0 1.103.897 2 2 2zM18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7z"></path>
          </svg>
        </span>
      ) : (
        <span className="my-icon-enabled">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="rgba(255,255,255,1)"
            viewBox="0 0 24 24"
          >
            <path d="M18 7c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-3.333L22 17V7l-4 3.333V7z"></path>
          </svg>
        </span>
      )}
    </button>
  );
};

export const CustomScreenShareButton = () => {
  const { useScreenShareState, useHasOngoingScreenShare } = useCallStateHooks();
  const { screenShare, isMute: isScreenSharing } = useScreenShareState();

  // determine, whether somebody else is sharing their screen
  const isSomeoneScreenSharing = useHasOngoingScreenShare();
  return (
    <button
      // disable the button in case I'm not the one sharing the screen
      disabled={!isScreenSharing && isSomeoneScreenSharing}
      onClick={() => screenShare.toggle()}
    >
      {isScreenSharing ? (
        <span className="my-icon-enabled">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgba(255,255,255,1)"
          >
            <path d="M11 6.914V2.586L6.293 7.293l-3.774 3.774 3.841 3.201L11 18.135V13.9c8.146-.614 11 4.1 11 4.1 0-2.937-.242-5.985-2.551-8.293C16.765 7.022 12.878 6.832 11 6.914z"></path>
          </svg>
        </span>
      ) : (
        <span className="my-icon-disabled">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="rgba(255,255,255,1)"
          >
            <path d="M11 6.914V2.586L6.293 7.293l-3.774 3.774 3.841 3.201L11 18.135V13.9c8.146-.614 11 4.1 11 4.1 0-2.937-.242-5.985-2.551-8.293C16.765 7.022 12.878 6.832 11 6.914z"></path>
          </svg>
        </span>
      )}
    </button>
  );
};

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}
export const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        width: "100vw",
      }}
    >
      {participants.map((participant) => (
        <div style={{ width: "100%", aspectRatio: "3 / 2" }}>
          <ParticipantView
            muteAudio
            participant={participant}
            key={participant.sessionId}
          />
        </div>
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      {participant && <ParticipantView participant={participant} />}
    </div>
  );
};
