export const mimeTypeToExt = (mimeType: string): string => {
    switch (mimeType) {
        case "image/apng":
            return ".apng";
        case "image/bmp":
            return ".bmp";
        case "image/gif":
            return ".gif";
        case "image/jpeg":
            return ".jpg";
        case "image/png":
            return ".png";
        case "image/svg+xml":
            return ".svg";
        case "image/webp":
            return ".webp";
        case "application/pdf":
            return ".pdf";
    }

    return "";
};
