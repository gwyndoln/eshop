import { Request } from 'express';
import { Fields, Files } from 'formidable';
import IncomingForm from 'formidable/Formidable';

const parseFormPromise: (
  req: Request,
  form: IncomingForm
) => Promise<{ fields: Fields; files: Files }> = (req, form) => {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);

      resolve({ fields, files });
    });
  });
};

export default parseFormPromise;
