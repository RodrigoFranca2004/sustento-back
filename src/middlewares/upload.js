import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Helper para obter __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define o diretório de destino relativo à raiz do projeto
const profilePicsDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'profile-pictures');

// Garante que o diretório de destino exista
fs.mkdirSync(profilePicsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, profilePicsDir);
    },
    filename: function (req, file, cb) {
        // Usa req.user que deve ser setado pelo authMiddleware
        const userId = req.user?.userId || 'anonymous';
        const fileExtension = path.extname(file.originalname);
        const uniqueSuffix = crypto.randomBytes(16).toString('hex');
        const filename = `${userId}-${uniqueSuffix}${fileExtension}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});

export default upload;

