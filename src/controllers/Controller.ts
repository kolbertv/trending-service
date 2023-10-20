import { Service } from '../services';

class Controller {

    public ping(req, res) {
        const result = Service.ping()
        res.send(JSON.stringify({ status: true, ...result }))
    }

    public async auth(req, res, next) {
        try {
            const body = req.body as { PHPSESSID: string };

            if (!body.PHPSESSID) {
                throw ({ status: 400, message: 'Validation error. Missing PHPSESSID' })
            }

            const result = await Service.auth(body.PHPSESSID);

            res.send(JSON.stringify({ status: true, ...result }))
        } catch (error) {
            next(error)
        }
    }

    public async getBalance(req, res, next) {
        try {

            const result = await Service.getBalance();

            res.send(JSON.stringify({ status: true, ...result }))

        } catch (error) {
            next(error)
        }

    }
}

export default new Controller();