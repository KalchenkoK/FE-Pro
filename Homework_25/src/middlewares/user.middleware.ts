import type {Request, Response, NextFunction} from 'express';

export const userMiddleware = (req: Request , _res: Response, next: NextFunction) => {
	const auth = req.headers.authorization; // 'Bearer asdaskndasbdb21jsd12j3hj1bhdbh1';

	if (auth) {
		const [, userId] = auth.split(' ');

		req.user = userId;
	}
  
	next();
}