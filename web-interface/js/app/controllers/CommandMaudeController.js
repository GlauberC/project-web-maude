class CommandMaudeController{
    constructor(){
        this._commandInput = document.querySelector(".command");

        this._cardProcess = document.querySelector(".card-process")
        this._cardProcessHeader = document.querySelector(".card-process-header")
        this._cardProcessBody = document.querySelector(".card-process-body")
        this._cardProcessFooter = document.querySelector(".card-process-footer")
        this._cardProcess.classList.add('invisible');
    }

    submit(event){
        event.preventDefault();
        let commandMaude = this._commandFactory()
        $.ajax({
            type: "GET",
            data: {commandInput: commandMaude.command},
            url: 'php/commandRequest.php',
            success: (res)=>{
                this._cardProcess.classList.remove('invisible');
                this._cardProcessHeader.textContent = commandMaude.command;
                this._cardProcessBody.textContent = this._getResult(res);
                console.log(this._getResult(res))
                this._cardProcessFooter.textContent = res;
            },
            error: (er)=>{
                throw new Error(er);
            }
        })
        
    }

    _commandFactory(){
        return new CommandMaude(this._commandInput.value)
    }
    _getResult(res){
        let pos = res.indexOf("result");
        return res.substr(pos, res.lenght).replace("Maude> Bye", "");
        
    }
}
