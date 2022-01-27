import { NextFunction, Request, Response } from "express";

type Handler<Req, Res> = {
	(req: Req, res: Res): Promise<unknown>
}

export const withHandler = <Req = Request, Res = Response>(handler: Handler<Req, Res>) => {
	return async (req: Req, res: Res, next: NextFunction) => {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}