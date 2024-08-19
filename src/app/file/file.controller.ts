import { Controller, Get, Param, Response } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('files/:filename')
  async getFile(@Param('fileName') filename: string, @Response() res) {
    return this.fileService.getFileByFileName(filename, res);
  }
}
