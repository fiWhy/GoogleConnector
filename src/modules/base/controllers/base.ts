export interface IBaseController {
 sendError(res, status: number, message: string): void;
}

export class BaseController implements IBaseController {
    sendError(res, status, error): void {
        res.status(status);
        res.json({
            status,
            error
        })
    }
}