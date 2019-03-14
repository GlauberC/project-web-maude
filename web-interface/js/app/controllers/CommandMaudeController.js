class CommandMaudeController{
    constructor(){
        this._configInput = document.querySelector(".config");
        this._configTable = document.querySelector(".config-table");
        this._configDataTable = document.querySelector(".config-data-table");

        this._cardProcess = document.querySelector(".card-process");
        this._cardProcessHeader = document.querySelector(".card-process-header");
        this._cardProcessBody = document.querySelector(".card-process-body");
        this._cardProcess.classList.add('invisible');
        this._configNumber = 0;
    }

    submit(event){
        event.preventDefault();
        let parameters = this._commandFactory();
        $.ajax({
            type: "GET",
            data: {param: parameters, type: 'metaRed'},
            url: 'php/maudeRequest.php',
            success: (res)=>{
                console.log(parameters)
                this._cardProcess.classList.remove('invisible');
                this._cardProcessHeader.textContent = parameters;
                this._cardProcessBody.innerHTML = this._getLinkConfig(this._getConfig(res))
            },
            error: (er)=>{
                throw new Error(er);
            }
        })  
    }

    _commandFactory(){
        return (new CommandMaude(this._configInput.value).config);
    }
    _getConfig(res){
        res = res.replace(/\n/ig , '')
        let pos = res.indexOf("result");
        res = res.substr(pos, res.lenght).replace(">Maude> Bye.", "");
        return res.replace("result Config: <", "");
    }
    _getLinkConfig(res){
        let list = res.trim().split(';');
        let procs = list[0].split(',');
        let procsLink = "";

        for(let i = 0; i<procs.length; i++){
            procsLink += `<a class = 'text-info' href = '#' onClick = 'commandMaudeController._acessProcess(this)'">${procs[i]}</a>`
            if(i<procs.length-1){
                procsLink += ','
            }else{
                procsLink += ';'
            }
        };
        procsLink = `<p> < ${procsLink + list[1]} > </p>`;
        
        return procsLink
    }
    _acessProcess(e){
        let parameters = e.parentNode.textContent + '///' + e.textContent;
        this._configTable.classList.remove('invisible');
        $.ajax({
            type: "GET",
            data: {param: parameters, type: 'metaApp'},
            url: 'php/maudeRequest.php',
            success: (res)=>{
                console.log(res)
                this._cardProcessBody.innerHTML = this._getLinkConfig(this._getConfig(res))
                let tr = document.createElement("tr")

                let tdNumber = document.createElement("td");
                tdNumber.textContent = this._configNumber;
                let tdConfig = document.createElement("td");
                tdConfig.textContent = e.parentNode.textContent
                tr.appendChild(tdNumber);
                tr.appendChild(tdConfig);

                this._configDataTable.appendChild(tr);
                this._configNumber++
            },
            error: (er)=>{
                throw new Error(er);
            }
        })
        
    }

}
