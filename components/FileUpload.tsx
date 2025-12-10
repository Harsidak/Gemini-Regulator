import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle, Loader2 } from 'lucide-react';
import { ProcessedFile } from '../types';

interface FileUploadProps {
  files: ProcessedFile[];
  setFiles: React.Dispatch<React.SetStateAction<ProcessedFile[]>>;
  isAnalyzing: boolean;
}

interface UploadingFile {
  id: string;
  name: string;
  progress: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles, isAnalyzing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const processFile = (file: File): Promise<ProcessedFile> => {
    return new Promise((resolve, reject) => {
      const fileId = Math.random().toString(36).substring(2, 9);
      setUploadingFiles(prev => [...prev, { id: fileId, name: file.name, progress: 0 }]);

      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadingFiles(prev => prev.map(u => u.id === fileId ? { ...u, progress: percent } : u));
        }
      };

      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        setUploadingFiles(prev => prev.filter(u => u.id !== fileId));
        resolve({
          name: file.name,
          type: file.type || 'application/octet-stream',
          mimeType: file.type || 'application/octet-stream',
          data: base64Data
        });
      };

      reader.onerror = (error) => {
        setUploadingFiles(prev => prev.filter(u => u.id !== fileId));
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFiles = (fileList: File[]) => {
    fileList.forEach(async (file) => {
      try {
        const processed = await processFile(file);
        setFiles(prev => [...prev, processed]);
      } catch (error) {
        console.error("Error processing file", file.name, error);
        alert(`Failed to upload ${file.name}`);
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFiles(Array.from(event.target.files));
    }
    event.target.value = '';
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!isAnalyzing) {
      setIsDragging(true);
    }
  }, [isAnalyzing]);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isAnalyzing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  }, [isAnalyzing]);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Glass styles for container
  let containerClass = "group relative rounded-3xl p-12 text-center transition-all duration-500 border-2 border-dashed ";
  if (isAnalyzing) {
    containerClass += "border-slate-300 bg-slate-50/50 cursor-not-allowed opacity-50";
  } else if (isDragging) {
    containerClass += "border-indigo-500 bg-indigo-50/30 scale-[1.01] shadow-2xl shadow-indigo-500/20";
  } else {
    containerClass += "border-slate-300 hover:border-indigo-400 hover:bg-white/40 bg-white/20";
  }

  return (
    <div className="space-y-6 relative z-10">
      <div 
        className={containerClass}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={isAnalyzing}
          accept=".pdf,.png,.jpg,.jpeg,.csv,.txt"
        />
        <label htmlFor="file-upload" className={`cursor-pointer flex flex-col items-center justify-center w-full h-full relative z-20 ${isAnalyzing ? 'pointer-events-none' : ''}`}>
          <div className={`p-6 rounded-[2rem] mb-6 transition-all duration-300 shadow-xl ${isDragging ? 'bg-indigo-500 text-white scale-110 shadow-indigo-500/40' : 'bg-white text-indigo-600 shadow-indigo-100'}`}>
            <Upload size={40} className={isDragging ? 'animate-bounce' : ''} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">
            {isDragging ? "Drop Evidence Here" : "Upload Documentation"}
          </h3>
          <p className="text-slate-500 mt-3 text-base font-medium max-w-sm mx-auto">
            PDFs, Images, or CSVs. <br/>Drag & drop to fuse multimodal data.
          </p>
        </label>
        
        {/* Glow effect on drag */}
        {isDragging && (
             <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl blur-xl transition-all duration-500" />
        )}
      </div>

      {(files.length > 0 || uploadingFiles.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Active Uploads */}
          {uploadingFiles.map((file) => (
            <div key={file.id} className="relative p-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm overflow-hidden">
               <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-indigo-50 p-2 rounded-xl">
                    <Loader2 size={20} className="text-indigo-600 animate-spin" />
                  </div>
                  <div className="truncate flex-1">
                    <p className="text-sm font-semibold text-slate-700 truncate">{file.name}</p>
                    <p className="text-xs text-indigo-600 font-medium">Uploading... {file.progress}%</p>
                  </div>
               </div>
               <div className="h-1.5 w-full bg-indigo-100/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                    style={{ width: `${file.progress}%` }}
                  />
               </div>
            </div>
          ))}

          {/* Processed Files */}
          {files.map((file, idx) => (
            <div key={idx} className="group flex items-center justify-between p-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-2.5 rounded-xl text-slate-600 shadow-inner">
                  <FileText size={20} />
                </div>
                <div className="truncate">
                  <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {file.type ? file.type.split('/')[1] : 'FILE'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => removeFile(idx)} 
                disabled={isAnalyzing}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && uploadingFiles.length === 0 && !isDragging && (
        <div className="flex items-center justify-center space-x-2 text-indigo-600/70 bg-indigo-50/50 p-3 rounded-2xl text-sm font-medium border border-indigo-100/50 backdrop-blur-sm">
          <AlertCircle size={18} />
          <span>Upload at least one document to unlock intelligence.</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;