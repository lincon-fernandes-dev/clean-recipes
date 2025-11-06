// lib/cloudinaryService.ts
export async function uploadImage(file: File): Promise<string> {
  try {
    console.log('📤 Iniciando upload via API...');

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('📡 Resposta da API:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha no upload');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Upload falhou');
    }

    console.log('✅ Upload via API bem-sucedido:', data.url);
    return data.url;
  } catch (error) {
    console.error('❌ Erro no upload via API:', error);
    throw error;
  }
}
