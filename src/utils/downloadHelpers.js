export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const buildPdfFileName = (prefix, filters = {}) => {
  const stamp = filters.month || filters.date || new Date().toISOString().slice(0, 10);
  return `${prefix}-${stamp}.pdf`;
};

export const parseBlobError = async (error) => {
  const data = error?.response?.data;
  if (data instanceof Blob) {
    try {
      const text = await data.text();
      const parsed = JSON.parse(text);
      return parsed.message || 'No se pudo descargar el archivo.';
    } catch {
      return 'No se pudo descargar el archivo.';
    }
  }
  return error?.userMessage || 'No se pudo descargar el archivo.';
};
