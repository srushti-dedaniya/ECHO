import { useState, useCallback, useRef } from 'react';

export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'audio' | 'video';
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

export function useMediaUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generatePreview = useCallback((file: File): string => {
    return URL.createObjectURL(file);
  }, []);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const uploadedFiles: UploadedFile[] = Array.from(newFiles).map(file => {
      const type = file.type.startsWith('image/') ? 'image' : 
                   file.type.startsWith('audio/') ? 'audio' : 'video';
      return {
        id: Math.random().toString(36).substring(2, 11),
        file,
        preview: generatePreview(file),
        type,
        progress: 0,
        status: 'pending' as const,
      };
    });
    setFiles(prev => [...prev, ...uploadedFiles]);
  }, [generatePreview]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const clearFiles = useCallback(() => {
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
  }, [files]);

  const triggerFileInput = useCallback((accept: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
    }
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
    e.target.value = '';
  }, [addFiles]);

  const simulateUpload = useCallback(async (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'uploading' as const } : f));
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 50));
      setFiles(prev => prev.map(f => f.id === id ? { ...f, progress: i } : f));
    }
    
    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'complete' as const, progress: 100 } : f));
  }, []);

  return {
    files,
    isDragging,
    setIsDragging,
    fileInputRef,
    addFiles,
    removeFile,
    clearFiles,
    triggerFileInput,
    handleFileInputChange,
    simulateUpload,
  };
}