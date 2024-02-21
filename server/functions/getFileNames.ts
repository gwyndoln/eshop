import formidable from 'formidable';
import ApiError from '../error/api-error';

const getFileNames = (file: formidable.File | formidable.File[]) => {
  if (!file) {
    throw ApiError.BadRequest('Нет файлов');
  }

  if (Array.isArray(file)) {
    return file.map((item) => item.newFilename);
  }

  return [file.newFilename];
};

export default getFileNames;
