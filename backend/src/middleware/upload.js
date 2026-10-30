const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../upload"));
    },
    filename: function (req, file, cb) {
        
        const nombreUnico = `${Date.now()}-${file.originalname}`;
        cb(null, nombreUnico);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Solo se permiten archivos PDF"));
        }
        cb(null, true);
    },
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB máximo
});

module.exports = upload;
