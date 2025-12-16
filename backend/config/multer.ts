// config/multer.ts
import multer from 'multer';
import path from 'path';


// Option A: Memory Storage (recommended for API calls)
export const memoryStorage = multer.memoryStorage();

// Option B: Disk Storage (saves to server filesystem)
export const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'quickGPT/remove_background');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// File filter to validate image types
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase())
        && allowedTypes.test(file.mimetype);

    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (JPEG, PNG, WEBP)'), false);
    }
};

// Export configured upload middleware
export const upload = multer({
    storage: memoryStorage, // Use memoryStorage for Clipdrop API
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 10MB limit (Clipdrop's max)
    }
});



export const uploadPdf = multer({
    storage: memoryStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed!"));
        }
    },
}).single("resume"); // Field name: "resume" (change if your frontend uses different)