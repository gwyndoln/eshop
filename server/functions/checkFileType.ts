import formidable from 'formidable';

const checkFileType = (
	file: formidable.Part,
	regexp: RegExp,
	allowedTypes: String[]
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
