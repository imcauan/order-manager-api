import { Injectable, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Injectable()
export class FileService {
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
        destination: './storage/photos',
        filename(req, file, callback) {
          callback(null, `${Date.now()}-${file.originalname}`);
        },
    })
  }))
  async uploadPhoto(@UploadedFile() image: Express.Multer.File) {
    return { success: true, image: image.filename };
  }
}