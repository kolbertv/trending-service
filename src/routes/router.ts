import { Router } from 'express';

import { Controller } from '../controllers';

const router = Router();

router.get('/ping', Controller.ping);

router.post('/auth', Controller.auth);

router.get('/balance', Controller.getBalance);

router.all('*', (req, res)=> {
    res.status(404).send('error')
})

export { router };