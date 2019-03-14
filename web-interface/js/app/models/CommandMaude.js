class CommandMaude{
    constructor(config){
        this._config = config;
    }

    metaRewParameters(inc){
        return this.config + ' , ' + inc;
    }
    get config(){
        return this._config
    }
    
}