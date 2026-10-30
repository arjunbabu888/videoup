import { useRef } from "react";
import "./App.css";

function App() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
  };
  return (
    <>
      <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
        <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 pb-4 flex items-center justify-between">
          <a className="flex gap-2 justify-center items-center">
            {/* Logo Icon */}
            <span className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center "></span>
            <span className="text-xl sm:text-[22px] font-bold tracking-tight text-[#111827] font-serif">
              VideoUp
            </span>
          </a>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pb-20 sm:pb-28">
          <div className="w-full max-w-3xl mx-auto text-center ">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono tracking-tight text-[#141A29] leading-[1.12] ">
              Video Uploading...
            </h1>

            <div
              // onDragOver={handleDragOver}
              // onDragLeave={handleDragLeave}
              // onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              aria-label="Select videos to upload or drag and drop video files"
              className={`absolute bottom-0 left-50 right-50 mt-8 sm:mt-10 w-full max-w-xl mx-auto bg-white rounded-t-2xl p-8 sm:p-12  border `}
            >
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*,.mp4,.mov,.webm,.mkv"
                multiple
                className="hidden"
                onChange={(e) => handleFilesSelected(e.target.files)}
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="bg-[#141A29] cursor-pointer   text-white font-semibold text-base sm:text-lg px-7 py-3.5 rounded-xl shadow-sm transition-all duration-200 inline-flex items-center gap-2.5"
              >
                <span>Select videos to upload</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
