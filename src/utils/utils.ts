import multer from 'fastify-multer';

export const fileName = (
  _req: any,
  file: { originalname: string },
  callback: (arg0: null, arg1: string) => void,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = file.originalname.split('.')[1];
  const id_video = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${id_video}__${name.replace(' ', '-')}.${fileExtName}`);
};
export const fileFilter = (
  _req: any,
  file: { originalname: string },
  callback: (arg0: Error, arg1: boolean) => void,
) => {
  if (!file.originalname.match(/\.(mov|mp4)$/)) {
    return callback(new Error('Only mov and mp4 movie are allowed!'), false);
  }
  callback(null, true);
};

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.DIRECTORY_VIDEO);
  },
  filename: (
    _req: any,
    file: { originalname: string },
    cb: (arg0: null, arg1: string) => void,
  ) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = file.originalname.split('.')[1];
    const id_video = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${id_video}__${name.replace(' ', '-')}.${fileExtName}`);
  },
});
