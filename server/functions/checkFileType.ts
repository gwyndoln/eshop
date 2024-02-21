import formidable from 'formidable';

const checkFileType = (
  file: formidable.Part,
  regexp: RegExp,
  allowedTypes: string[]
) => {
  if (
    file.mimetype &&
    allowedTypes.includes(file.mimetype) &&
    file.originalFilename &&
    file.originalFilename.match(regexp)
  ) {
    return true;
  }

  return false;
};

export default checkFileType;
