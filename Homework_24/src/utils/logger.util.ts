export class Logger {
    constructor(){

    }
    notify(...messages: unknown[]):void{
        console.log('>>>', `[${new Date().toISOString()}]:`, ...messages)
    }    
    warn(err: Error):void{
        this.notify(err.message)
    }
}