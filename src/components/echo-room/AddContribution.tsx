import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaUpload } from '../../hooks/useMediaUpload';

interface AddContributionProps {
  onSubmit: (data: { content: string; media: string[]; type: 'photo' | 'thought' | 'voice' | 'music' }) => void;
  onCancel: () => void;
  className?: string;
}

export function AddContribution({ onSubmit, onCancel, className = '' }: AddContributionProps) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<'photo' | 'thought' | 'voice' | 'music'>('thought');
  const { files, addFiles, removeFile, triggerFileInput, handleFileInputChange, fileInputRef } = useMediaUpload();
  const [isDragging, setIsDragging] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && files.length === 0) return;
    
    onSubmit({
      content,
      media: files.map(f => f.preview),
      type,
    });
    
    setContent('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl bg-surface-container-low/70 backdrop-blur-2xl p-space-md shadow-xl flex flex-col gap-space-md ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-space-xs">
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">TRANSMIT PERCEPTION</span>
        <span className="material-symbols-outlined text-secondary text-[18px]">camera</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface">Show Us What You See</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Drop a live frame of your rain, your window, or your street corner into this continuum.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-space-sm">
        {['thought', 'photo', 'voice', 'music'].map((t) => (
          <motion.button
            key={t}
            type="button"
            onClick={() => setType(t as typeof type)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-space-md py-space-xs rounded-full font-label-sm text-label-sm transition-all ${
              type === t
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </motion.button>
        ))}
      </div>

      {type !== 'thought' && (
        <div
          className={`my-space-md flex flex-col items-center justify-center p-space-lg rounded-lg border-2 border-dashed transition-all ${
            isDragging
              ? 'border-primary bg-primary-container/10'
              : 'border-primary/30 bg-surface-container-lowest/80'
          } cursor-pointer`}
          onClick={() => triggerFileInput(type === 'photo' ? 'image/*' : type === 'voice' ? 'audio/*' : 'audio/*')}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={type === 'photo' ? 'image/*' : 'audio/*'}
            onChange={handleFileInputChange}
            multiple
          />
          <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center group-hover:scale-110 transition-transform mb-space-xs shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <span className="material-symbols-outlined text-primary text-[28px]">
              {type === 'photo' ? 'filter_drama' : 'mic'}
            </span>
          </div>
          <span className="font-label-md text-label-md text-primary font-medium">
            Drop a piece of your {type === 'photo' ? 'sky' : 'sound'} here
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
            Captures dissolve with the moment
          </span>
        </div>
      )}

      {files.length > 0 && (
        <div className="flex flex-wrap gap-space-sm">
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
            </motion.div>
          ))}
        </div>
      )}

      {type === 'thought' && (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-transparent border-0 outline-none text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/40 placeholder:font-light resize-none min-h-[100px]"
          placeholder="What does this moment feel like?"
          rows={3}
        />
      )}

      <div className="flex items-center justify-between pt-space-md">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          type="button"
          className="px-space-lg py-space-sm rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-all"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!content.trim() && files.length === 0}
          className="px-space-lg py-space-sm rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_28px_rgba(56,189,248,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[18px] mr-1">send</span>
          <span>Transmit</span>
        </motion.button>
      </div>
    </motion.form>
  );
}