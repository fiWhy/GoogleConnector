export interface IBaseController {
 sendError(res, status: number, message: string): void;
}

export class BaseController implements IBaseController {
    sendError(res, status, error): void {
        if(!error.code) {
            res.status(status);
            res.json({
                code: status,
                error
            })
        } else {
            res.status(error.code); 
            res.json(error);
        }
        
    }
}