import os
import io
from openai import OpenAI
from gtts import gTTS
from dotenv import load_dotenv

load_dotenv()

class SpeechHandler:
    def __init__(self):
        # For Transcription (STT), we ideally use OpenAI's Whisper
        # Note: OpenRouter might not support audio uploads fully yet, so we use direct OpenAI client if key is available,
        # or you can assume OpenRouter works if they support the 'whisper-1' endpoint.
        # Fallback: You can use 'SpeechRecognition' library for free/offline STT.
        
        # Using OpenAI Client (Compatible with OpenRouter if base_url is set, but standard OpenAI is safer for Audio)
        self.client = OpenAI(
            api_key=os.getenv("OPENROUTER_API_KEY"),
            base_url="https://openrouter.ai/api/v1"
        )
        
    async def transcribe(self, audio_bytes: bytes) -> str:
        """
        Converts Audio (bytes) to Text using Whisper.
        """
        try:
            # Create a file-like object with a name (required by API)
            audio_file = io.BytesIO(audio_bytes)
            audio_file.name = "audio.mp3" 

            # Transcribe
            # Note: Ensure your OpenRouter model list includes 'openai/whisper' or similar
            transcript = self.client.audio.transcriptions.create(
                model="openai/whisper", 
                file=audio_file
            )
            return transcript.text
            
        except Exception as e:
            print(f"❌ Transcription Error: {e}")
            return ""

    async def text_to_speech(self, text: str, output_path: str = "output.mp3"):
        """
        Converts Text to Audio using gTTS (Google Text-to-Speech) - Free & Simple.
        """
        try:
            tts = gTTS(text=text, lang='en', slow=False)
            tts.save(output_path)
            return output_path
        except Exception as e:
            print(f"❌ TTS Error: {e}")
            return None