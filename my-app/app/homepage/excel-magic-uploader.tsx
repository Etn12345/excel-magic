import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  file: File;
}

const ExcelMagic: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    // Sample files for demonstration
    {
      id: '1',
      name: 'Q4_Sales_Report.png',
      size: 245760,
      type: 'image/png',
      uploadDate: new Date('2024-05-20'),
      file: {} as File
    },
    {
      id: '2',
      name: 'Inventory_Screenshot.jpg',
      size: 512000,
      type: 'image/jpeg',
      uploadDate: new Date('2024-05-19'),
      file: {} as File
    },
    {
      id: '3',
      name: 'Budget_Analysis.png',
      size: 180000,
      type: 'image/png',
      uploadDate: new Date('2024-05-18'),
      file: {} as File
    }
  ]);
  
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        file: file
      };
      
      setUploadedFiles(prev => [newFile, ...prev]);
      
      // Here you would typically save the file
      console.log('File uploaded:', file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-black text-center mb-12">
          Excel Magic
        </h1>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 mb-8 ${
            isDragOver
              ? 'border-green-400 bg-green-100 scale-105'
              : 'border-green-300 bg-green-50 hover:border-green-400 hover:bg-green-100'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            accept="image/*"
            className="hidden"
          />
          
          <Upload 
            className={`mx-auto mb-4 transition-colors duration-200 ${
              isDragOver ? 'text-green-600' : 'text-green-500'
            }`} 
            size={64} 
          />
          
          <h3 className="text-xl font-semibold text-black mb-2">
            Drop your screenshot here
          </h3>
          <p className="text-gray-600 mb-4">
            or click to browse files
          </p>
          <p className="text-sm text-gray-500">
            Supports PNG, JPG, JPEG files
          </p>
        </div>

        {/* Previous Files */}
        <div className="bg-white rounded-xl p-6 border border-green-200 shadow-xs">
          <h2 className="text-2xl font-semibold text-black mb-6">
            Previous Files
          </h2>
          
          {uploadedFiles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No files uploaded yet
            </p>
          ) : (
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 hover:border-green-300 hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <File className="text-green-500" size={24} />
                    <div>
                      <p className="font-medium text-black">{file.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatFileSize(file.size)} • {formatDate(file.uploadDate)}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove file"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelMagic;