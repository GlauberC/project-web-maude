class CommandMaude{
    constructor(config, inc){
        this.config = config;
        this.inc = inc;
        
    }

    get metaSParameters(){
        return this.config + ' , ' + this.inc;
    }
}