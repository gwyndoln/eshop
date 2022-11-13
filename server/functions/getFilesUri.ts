import formidable from 'formidable';

const getFilesUri = (file: formidable.File | formidable.File[]) => {
	if (!file) {
		return;
	}

	if (Array.isArray(file)) {
		return file.map((item) => item.filepath);
	}

	return [file.filepath];
};

export default getFilesUri;
