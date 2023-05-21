import { Request, Response } from 'express';
import { MulterFile } from 'multer';

export interface ICustomRequest extends Request {
  file: MulterFile;
}