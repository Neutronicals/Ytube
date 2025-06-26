import os
import yt_dlp
from fastapi import FastAPI, Query
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uuid

ydl_opts = {
    "format": format_id,
    "outtmpl": output_path,
    "quiet": True,
    "cookiefile": "cookies.txt",  # Add this line
}

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DOWNLOAD_DIR = "downloads"
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

@app.get("/api/info")
async def get_video_info(url: str = Query(...)):
    ydl_opts = {
        "quiet": True,
        "skip_download": True,
        "simulate": True,
        "forcejson": True,
        "dump_single_json": True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(url, download=False)
            return info
        except Exception as e:
            return JSONResponse(status_code=400, content={"error": str(e)})

@app.get("/api/download")
async def download_video(url: str = Query(...), format_id: str = Query("best")):
    unique_id = str(uuid.uuid4())
    output_path = os.path.join(DOWNLOAD_DIR, f"{unique_id}.%(ext)s")
    ydl_opts = {
        "format": format_id,
        "outtmpl": output_path,
        "quiet": True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(url, download=True)
            ext = info.get('ext', 'mp4')
            file_path = output_path.replace("%(ext)s", ext)
            return FileResponse(
                file_path,
                filename=f"{info.get('title', 'video')}.{ext}",
                media_type="application/octet-stream",
            )
        except Exception as e:
            return JSONResponse(status_code=400, content={"error": str(e)})
          
@app.get("/")
async def root():
    return {"message": "YTube backend is running!"}
