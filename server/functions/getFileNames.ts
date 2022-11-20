import formidable from 'formidable';

const getFileNames = (file: formidable.File | formidable.File[]) => {
	if (Array.isArray(file)) {
		return file.map((item) => item.newFilename);
	}

	return [file.newFilename];
};

export default getFileNames;
