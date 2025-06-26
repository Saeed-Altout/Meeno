/**
 * Creates a URL object for a file that can be used for preview or download
 *
 * @param {File} file - The file to create a URL for
 * @returns {string} A URL representing the file
 * @example
 * // Create a URL for an image file
 * const imageUrl = createFileUrl(imageFile);
 * // Use in an img element
 * <img src={imageUrl} alt="Preview" />
 *
 * @remarks
 * Remember to revoke the URL when no longer needed to free up memory:
 * URL.revokeObjectURL(url)
 */
export const createFileUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Downloads a file by creating a temporary URL and clicking a link to trigger the download
 *
 * @param {File} file - The file to download
 * @example
 * // Download an image file
 * downloadFile(imageFile);
 */
export const downloadFile = (file: File) => {
  const url = createFileUrl(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
};
