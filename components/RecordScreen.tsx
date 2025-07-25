"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ICONS } from "@/constants";
import { useRouter } from "next/navigation";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";

function RecordScreen() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording();

  function closeModal() {
    resetRecording();
    setIsOpen(false);
  }

  async function handleStart() {
    await startRecording();
  }

  async function recordAgain() {
    resetRecording();
    await startRecording();

    if (recordedVideoUrl && videoRef.current) {
      videoRef.current.src = recordedVideoUrl;
    }
  }

  function goToUpload() {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);

    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0,
      })
    );

    router.push("/upload");
    closeModal();
  }

  return (
    <div className="record">
      <button className="primary-btn" onClick={() => setIsOpen(true)}>
        <Image src={ICONS.record} width={16} height={16} alt="record" />
        <span>Record a video</span>
      </button>

      {isOpen && (
        <section className="dialog">
          <div className="overlay-record" onClick={closeModal} />
          <div className="dialog-content">
            <figure>
              <h3>Screen Recording</h3>
              <button onClick={closeModal}>
                <Image src={ICONS.close} alt="close" width={20} height={20} />
              </button>
            </figure>

            <section>
              {isRecording ? (
                <article>
                  <div /> <span>Recording in progress</span>
                </article>
              ) : recordedVideoUrl ? (
                <video ref={videoRef} src={recordedVideoUrl} controls />
              ) : (
                <p>Click record to start capturing your screen</p>
              )}
            </section>

            <div className="record-box">
              {!isRecording && !recordedVideoUrl && (
                <button onClick={handleStart} className="record-start">
                  <Image
                    src={ICONS.record}
                    width={16}
                    height={16}
                    alt="record"
                  />
                  Record
                </button>
              )}

              {isRecording && (
                <button onClick={stopRecording} className="record-stop">
                  <Image
                    src={ICONS.record}
                    width={16}
                    height={16}
                    alt="stop recording"
                  />
                  Stop Recording
                </button>
              )}

              {recordedVideoUrl && (
                <>
                  <button className="record-again" onClick={recordAgain}>
                    Record Again
                  </button>

                  <button onClick={goToUpload} className="record-upload">
                    <Image
                      src={ICONS.upload}
                      alt="upload"
                      width={16}
                      height={16}
                    />
                    Continue to Upload
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default RecordScreen;
