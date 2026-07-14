export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
export const MAX_FILES_PER_REQUEST = 100;
export const MAX_FILES_PER_HOUR = 20;

export const ACCEPTED_UPLOAD_EXTENSIONS = ["pdf", "png", "jpg", "jpeg", "webp", "csv", "xls", "xlsx", "doc", "docx"] as const;
export const ACCEPTED_UPLOAD_INPUT = ACCEPTED_UPLOAD_EXTENSIONS.map((extension) => `.${extension}`).join(",");

export function fileExtension(name: string) {
  return name.toLowerCase().split(".").pop() ?? "";
}

export function validateUploadMetadata(file: File) {
  if (file.size === 0) return "The file is empty.";
  if (file.size > MAX_UPLOAD_BYTES) return "File is too large. Maximum size is 25 MB.";
  if (file.name.length > 255) return "The file name is too long.";
  if (!ACCEPTED_UPLOAD_EXTENSIONS.includes(fileExtension(file.name) as (typeof ACCEPTED_UPLOAD_EXTENSIONS)[number])) {
    return "Unsupported file type. Upload a PDF, image, CSV, Excel, or Word document.";
  }
  return null;
}

function startsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((value, index) => bytes[index] === value);
}

export function validateUploadContent(name: string, buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  const extension = fileExtension(name);

  if (extension === "pdf" && !startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d])) return "The file does not appear to be a valid PDF.";
  if (extension === "png" && !startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "The file does not appear to be a valid PNG image.";
  if (["jpg", "jpeg"].includes(extension) && !startsWith(bytes, [0xff, 0xd8, 0xff])) return "The file does not appear to be a valid JPEG image.";
  if (extension === "webp" && !(startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP")) return "The file does not appear to be a valid WebP image.";
  if (["xlsx", "docx"].includes(extension) && !startsWith(bytes, [0x50, 0x4b])) return "The file does not appear to be a valid Office document.";
  if (["xls", "doc"].includes(extension) && !startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) return "The file does not appear to be a valid Office document.";
  if (extension === "csv" && bytes.slice(0, 4096).includes(0)) return "The file does not appear to be a valid CSV file.";

  return null;
}
