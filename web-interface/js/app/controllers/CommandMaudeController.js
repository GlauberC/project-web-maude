class CommandMaudeController{
    constructor(){
        this._configInput = document.querySelector(".config");
        this._incInput = document.querySelector(".inc");

        this._cardProcess = document.querySelector(".card-process")
        this._cardProcessHeader = document.querySelector(".card-process-header")
        this._cardProcessBody = document.querySelector(".card-process-body")
        this._cardProcess.classList.add('invisible');
    }

    submit(event){
        event.preventDefault();
        let parameters = this._commandFactory()
        $.ajax({
            type: "GET",
            data: {param: parameters},
            url: 'php/commandRequest.php',
            success: (res)=>{
                this._cardProcess.classList.remove('invisible');
                this._cardProcessHeader.textContent = parameters;
                this._cardProcessBody.textContent = this._getResult(res);
            },
            error: (er)=>{
                throw new Error(er);
            }
        })
        
    }

    _commandFactory(){
        return (new CommandMaude(this._configInput.value, this._incInput.value)).metaSParameters;
    }
    _getResult(res){
        let pos = res.indexOf("result");
        return res.substr(pos, res.lenght).replace("Maude> Bye", "");
        
    }
}
