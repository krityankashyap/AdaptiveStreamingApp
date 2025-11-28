import multer from "multer"

const upload= multer({
  dest: 'uploads/'
}); // multer middleware

export default upload;