import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { useMediaUpload } from '../../hooks/useMediaUpload';

interface MediaUploaderProps {
  onFilesChange?: (files: string[]) => void;
  className?: string;
}

export function MediaUploader({ onFilesChange, className = '' }: MediaUploaderProps) {
  const {
    files,
    addFiles,
    removeFile,
    triggerFileInput,
    handleFileInputChange,
    fileInputRef,
  } = useMediaUpload();

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    onFilesChange?.(files.map(f => f.preview));
  }, [files, onFilesChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileClick = (type: 'image' | 'audio') => {
    triggerFileInput(type === 'image' ? 'image/*' : 'audio/*');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full flex flex-col items-center justify-center p-space-2xl rounded-lg bg-surface-container-low/50 backdrop-blur-2xl relative overflow-hidden ${className}`}
    >
      <div className="w-full flex items-center justify-between mb-space-lg">
        <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span>Step 03 // Celestial Infusion</span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">PORTAL CONDENSER</span>
      </div>

      <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-space-md">
        <motion.div
          className="absolute inset-0 rounded-full blur-[50px]"
          style={{ backgroundColor: 'var(--color-primary-container)33' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-6 rounded-full blur-[40px]"
          style={{ backgroundColor: 'var(--color-secondary)26' }}
        />

        <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" fill="none" r="92" stroke="#7bd0ff" strokeDasharray="6 8" strokeOpacity="0.6" strokeWidth="2.5" />
          <circle cx="100" cy="100" fill="none" r="92" stroke="#ffb2b9" strokeDasharray="4 22" strokeDashoffset="10" strokeOpacity="0.8" strokeWidth="2.5" />
        </svg>

        <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-br from-primary-fixed via-primary-container/40 to-surface-container-lowest p-[3px] shadow-[0_0_30px_rgba(56,189,248,0.35)]">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-container/30 via-primary-fixed-dim/20 to-surface-container-lowest backdrop-blur-3xl flex items-center justify-center" />
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center shadow-inner cursor-pointer"
        >
          <svg className="w-20 h-20 sm:w-24 sm:h-24 text-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4.5" />
            <line stroke="currentColor" strokeWidth="4" x1="50" x2="50" y1="8" y2="92" />
            <line stroke="currentColor" strokeWidth="4" x1="8" x2="92" y1="50" y2="50" />
            <circle cx="50" cy="50" fill="currentColor" r="13" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute inset-0 animate-[spin_8s_linear_infinite] pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#ffffff] -translate-x-1.5 translate-y-10" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-space-sm mb-space-lg"
      >
        <p className="font-headline-sm text-headline-sm uppercase tracking-wide text-on-surface">
          Drop a piece of this moment here
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto mt-1">
          Drag luminous files or inject immediate resonance channels below.
        </p>
      </motion.div>

      <div
        className={`w-full flex flex-col items-center p-space-lg rounded-lg border-2 border-dashed transition-all cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary-container/10'
            : 'border-primary/30 bg-surface-container-lowest/80'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => handleFileClick('image')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFileClick('image');
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Upload media files"
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,audio/*"
          onChange={handleFileInputChange}
          multiple
        />
        <motion.div
          className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-space-xs shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          animate={{ scale: isDragging ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="material-symbols-outlined text-primary text-[28px]">cloud_upload</span>
        </motion.div>
        <span className="font-label-md text-label-md text-primary font-medium">
          {isDragging ? 'Release to upload' : 'Drag & drop files here'}
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">or click to browse</span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap items-center justify-center gap-space-sm mt-space-md"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleFileClick('image')}
          className="group px-space-lg py-space-sm rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center gap-space-xs transition-all shadow-md"
          type="button"
        >
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">add_photo_alternate</span>
          <span className="font-label-md text-label-md uppercase tracking-wider">Photo / Visual</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleFileClick('audio')}
          className="group px-space-lg py-space-sm rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center gap-space-xs transition-all shadow-md"
          type="button"
        >
          <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">mic</span>
          <span className="font-label-md text-label-md uppercase tracking-wider">15s Voice Fragment</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleFileClick('audio')}
          className="group px-space-lg py-space-sm rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface flex items-center gap-space-xs transition-all shadow-md"
          type="button"
        >
          <span className="material-symbols-outlined text-tertiary group-hover:scale-110 transition-transform">file_download_done</span>
          <span className="font-label-md text-label-md uppercase tracking-wider">Audio Frequency</span>
        </motion.button>
      </motion.div>

      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mt-space-lg flex flex-wrap gap-space-sm"
        >
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-20 h-20 rounded-lg overflow-hidden"
            >
              {file.type === 'image' && <img src={file.preview} alt="" className="w-full h-full object-cover" />}
              {file.type === 'audio' && (
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">audiotrack</span>
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFile(file.id)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-surface-container-lowest/80 flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </motion.button>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}