import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const AudioUploader = () => {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/transcribe`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTranscription(response.data);
        } catch (error) {
            console.error('Error transcribing audio:', error);
        }
    };

  return (
    <div className='container'>
        <h1>Audio to Text Transcriber </h1>
    <div className='file-input'>
        <input type='file' accept='audio/*' onChange={handleFileChange} />
        </div>
        <button className='upload-button' onClick={handleUpload}>Upload Audio</button>
        <div className='transcription-result'>
            <h2>Transcription Result</h2>
            <p>{transcription}</p>
        </div>
        </div>
  );
}

export default AudioUploader;