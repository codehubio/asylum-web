import React, { useState, useEffect } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
const TextToSpeech = ({ text, gender }: { text: string; gender: number }) => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  async function init() {
    const cnCode = "zh-CN";
    const u = new SpeechSynthesisUtterance(text);
    const voices = await window.speechSynthesis.getVoices();
    const cnVoices = voices.filter((v) => v.lang === cnCode);
    setVoices(cnVoices);
    u.voice = gender === 0 ? cnVoices[2] : cnVoices[0];
    u.volume = 1;
    u.lang = cnCode;
    setUtterance(u);
  }
  useEffect(() => {
    init();
    const synth = window.speechSynthesis;

    return () => {
      synth.cancel();
    };
  }, [text]);
  useEffect(() => {
    if (voices.length === 0) {
      init();
    }
  });

  const handlePlay = async () => {
    const synth = window.speechSynthesis;
    synth.speak(utterance as any);
  };

  return (
    <>
      <VolumeUpIcon
        fontSize="small"
        color={gender === 0 ? "error" : "secondary"}
        onClick={handlePlay}
      />
    </>
  );
};

export default TextToSpeech;
