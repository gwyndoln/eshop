import { unlink } from 'node:fs/promises';

const deleteOldFiles = async (
  filesDir: string,
  oldFiles: string[],
  editedFiles?: string[]
) => {
  if ((!editedFiles || editedFiles.length === 0) && oldFiles.length !== 0) {
    const test = await Promise.all(
      oldFiles.map((file) => {
        unlink(`${filesDir}/${file}`);
      })
    );
    console.log(test);
    return;
  }

  if (!editedFiles) {
    const test = await Promise.all(
      oldFiles.map((file) => {
        unlink(`${filesDir}/${file}`);
      })
    );
    console.log(test);
    return;
  }

  await Promise.all(
    oldFiles
      .filter((oldFile) => !editedFiles.includes(oldFile))
      .map((oldFile) => unlink(`${filesDir}/${oldFile}`))
  );

  // for (let i = 0; i < oldFiles.length; i++) {
  //   for (let j = 0; j < editedFiles.length; j++) {
  //     if (oldFiles[i] === editedFiles[j]) {
  //       break;
  //     }

  //     if (j === editedFiles.length - 1) {
  //       await unlink(`${filesDir}/${oldFiles[i]}`);
  //     }
  //   }
  // }

  //   oldFiles.map(async (oldFile) => {
  //     await Promise.all(
  //       editedFiles.map(async (editedFile, index) => {
  //         if (oldFile === editedFile) {
  //           return;
  //         }
  //         //delete file if it the last editedFile that has no overlap with oldFile
  //         if (index === editedFiles.length - 1) {
  //           await unlink(`${filesDir}/${oldFile}`);
  //         }
  //       })
  //     );
  //   });
};

export default deleteOldFiles;
