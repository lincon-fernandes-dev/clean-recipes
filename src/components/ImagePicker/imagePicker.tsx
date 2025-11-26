'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import Button from '../templates/base/Button/Button';

interface ImagePickerProps {
  label: string;
  name: string;
  onImageSelect: (file: File | null) => void;
  selectedImage?: string | null;
}

export default function ImagePicker({
  label,
  name,
  onImageSelect,
  selectedImage,
}: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(
    selectedImage || null
  );
  const imageInput = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    imageInput.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      onImageSelect(null);
      return;
    }

    // Criar preview
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        setPickedImage(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);

    // Notificar o formulário sobre o arquivo selecionado
    onImageSelect(file);
  }

  return (
    <div className="space-y-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <div className="flex items-start gap-6">
        {/* Preview da Imagem */}
        <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg overflow-hidden bg-gray-50 relative">
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt="Preview da imagem selecionada"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Sem imagem
            </div>
          )}
        </div>

        {/* Controles */}
        <div className="space-y-3">
          <input
            type="file"
            id={name}
            accept="image/png, image/jpeg, image/webp"
            name={name}
            ref={imageInput}
            onChange={handleImageChange}
            className="hidden"
          />

          <Button
            variant="primary"
            size="small"
            onClick={handlePickClick}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <p className="text-card text-lg">Escolher Imagem</p>
          </Button>

          <p className="text-sm text-muted-foreground">
            PNG, JPG, WebP até 10MB
          </p>
        </div>
      </div>
    </div>
  );
}
