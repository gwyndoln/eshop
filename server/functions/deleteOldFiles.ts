import { NoParamCallback, PathLike } from 'fs';

const deleteOldFiles = (
	unlink: (path: PathLike, callback: NoParamCallback) => void,
	filesDir: string,
	oldFiles: string[],
	editedFiles: string[]
) => {
	if (editedFiles.length === 0 && oldFiles.length !== 0) {
		return oldFiles.map((file) => {
			unlink(`${filesDir}/${file}`, (error) => {
				if (error) return error;
			});
		});
	}

	for (let i = 0; i < oldFiles.length; i++) {
		for (let j = 0; j < editedFiles.length; j++) {
			if (oldFiles[i] === editedFiles[j]) {
				break;
			}

			if (j === editedFiles.length - 1) {
				unlink(`${filesDir}/${oldFiles[i]}`, (error) => {
					if (error) return error;
				});
			}
		}
	}
};

export default deleteOldFiles;
