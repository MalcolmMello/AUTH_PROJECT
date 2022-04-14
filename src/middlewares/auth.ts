import { Request, Response, NextFunction} from 'express'
import { User } from '../models/User'

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let sucess = false;
        
        if(req.headers.authorization) {
            let hash = req.headers.authorization.substring(6);
            
            let decoded = Buffer.from(hash, 'base64').toString();

            let [email, password] = decoded.split(':')

            if(email && password) {
                let hasUser = await User.findOne({ where: { email, password } });
                if(hasUser) {
                    sucess = true;
                }
            }
        }

        if(sucess) {
            next();
        } else {
            res.status(403); // Not authorized;
            res.json({ error: 'Não autorizado' });
        }
    } 
}