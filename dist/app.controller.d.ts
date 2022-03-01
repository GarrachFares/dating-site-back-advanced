import { Response } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private appService;
    constructor(appService: AppService);
    root(res: Response): void;
}
