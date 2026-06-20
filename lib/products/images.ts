export function readImageFile(file: File, onLoad: (dataUrl: string) => void) {
  const reader = new FileReader();
  reader.onloadend = () => onLoad(reader.result as string);
  reader.readAsDataURL(file);
}
