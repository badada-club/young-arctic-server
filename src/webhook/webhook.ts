import axios from 'axios';
import { Express, Request, Response } from 'express';

export interface WebHookTargets {
    get(): Promise<string[]>,
    add(url: string): Promise<number>
    remove(id: number): Promise<void>
}

export class WebHook {
    private readonly _targets: WebHookTargets;

    constructor(targets: WebHookTargets) {
        this._targets = targets;
    }

    use(app: Express, addMethod: string, removeMethod: string): void {
        app.post(`/'${addMethod}`, async (req: Request, res: Response) => {
            try{
                if(!req.body || !Object.prototype.hasOwnProperty.call(req.body, 'url'))
                    return res.sendStatus(400);
                const webHookId = await this._targets.add(req.body.url);
                return res.status(201).send(webHookId);
            } catch {
                return res.sendStatus(500);
            }
        });
        app.post(`/'${removeMethod}`, async (req: Request, res: Response) => {
            try{
                if(!req.body || !Object.prototype.hasOwnProperty.call(req.body, 'id'))
                    return res.sendStatus(400);
                await this._targets.remove(req.body.id);
                return res.sendStatus(200);
            } catch {
                return res.sendStatus(500);
            }
        });
    }

    async trigger(response: any): Promise<void> {
        const targetUrls = await this._targets.get() ;
        for(const url of targetUrls) {
            await axios.post(url, response);
        }
    }
}