

var arrNotes = new Array(); // um array para salvar as notas inserido fora do load pois se toda vez que carregar a pagina ira crialo vazio
var transfornNotesString = new String('vazia'); // essa variavel foi feita apenas para salvar um array convertido em string
window.addEventListener("load", function () {

    /* por algum motivo meu script carrega antes da página então não consegue pegar todos os valores a tempo, logo todos são dados como nulos, e não é possível
        adicionar eventos em variáveis nulas, então insiro todo o código depois que a página recarregar, só ai são capturados os valores.
    */             
    const selectFont = document.querySelector("#selectFont");
    const fontTall = document.querySelector("#fontTall");
    const tableBtn = document.querySelector("#btnTable");
    const textbtn = document.querySelector("#btnCreateTextBox");
    const formulaBtn = document.querySelector("#btnFormula");
    const imgInput = document.querySelector("#imageInput");
    const audioInput = document.querySelector("#inputAudio");
    const videoInput = document.querySelector("#inputVideo");
    const saveAsBtn = document.querySelector("#save");
    const downBtn = document.querySelector("#downPDF");

    // --- INICIO negrito/italico/sublinhado ---- 
    const boldBtn = document.querySelector("#btnBold"); // cada const e atribuida a um botao do html
    boldBtn.addEventListener('click' , ()=> { // depois e adicionado o evento clicar                  
        document.execCommand('bold'); // executa no documento o efeito negrito no texto selecionado
    });

    const underlineBtn = document.querySelector("#btnUnderline");
    underlineBtn.addEventListener('click' , ()=> {
        document.execCommand('underline');
    });

    const italicBtn = document.querySelector("#btnItalic");
    italicBtn.addEventListener('click', ()=>{
        document.execCommand('italic');
    });
    // mesma logica que o primeiro.
    // --- FIM negrito/italico/sublinhado ---- 

    // --- INICIO marcar texto ---
    function selectColorH (val){ // uma funcao para selecionar a cor, recebe como parametro um valor.
        document.execCommand('hilitecolor', true, val); // executa a funcao que muda a cor do fundo do texto, ativando o css, a cor sera atribuida em val.
        hiliteCBtn.value = "null"; // depois deixa o valor selecionado nulo, para que nao aja dupla selecao, ou algum erro.
    }

    const hiliteCBtn = document.querySelector("#btnCH"); // uma const e atribuida o seletor das cores.

    hiliteCBtn.addEventListener('click' , ()=> { // adiciona o evento clicar
        
        switch (hiliteCBtn.value) {  // verifica a expressao que esta no valor da query selecionada ou seja o value da option do HTML
            case 'transparent': // caso transparente 
                selectColorH(hiliteCBtn.value); // chama a funcao, o parametro val recebe o valor que esta na const, de acordo com a option selecionada
                // esse seria para remover qualquer marcador, deixando o fundo transparente
            break;
            case 'yellow': // caso a expressao selecionada seja amarelo
                selectColorH(hiliteCBtn.value); // a funcao recebe o val amarelo, funcao essa acima que pinta a cor de fundo.
            break;
            case 'red':
                selectColorH(hiliteCBtn.value);
            break;
            case 'green':
                selectColorH(hiliteCBtn.value);
            break;
            case 'white':
                selectColorH(hiliteCBtn.value);
            break;      
            case 'blue':
                selectColorH(hiliteCBtn.value);
            break;      
            case 'gray':
                selectColorH(hiliteCBtn.value);
            break;
            case 'black':
                selectColorH(hiliteCBtn.value);
            break;                 
        } 
        return true;
        // o restante insere sua respectiva cor, o return true evita erros.
    });
    // --- FIM marcar texto --- 

    const colorInput = document.querySelector("#inputColor"); 
    colorInput.addEventListener('click', ()=>{
        document.execCommand("foreColor",false, inputColor.value); // desta vez e um input, pois tem dados inseridos, que seriam as cores, insere a cor selecionada no input
    });
    selectFont.addEventListener('click' , ()=>{
        document.execCommand("fontName", false, selectFont.value);
    });
     /* usando o mesmo recurso nativo, execCommand, fore color é deixado como falso (padrão) até ser selecionado o valor que esta no input color, assim alterando
     a fonte, a mesma lógica se aplica ao fontName que altera a font do texto selecionado a partir da opção selecionada no html, algumas fontes são buscadas na api
     do google fonts por URL então não irá funcionar a menos que esteja conectado a internet  */
    fontTall.addEventListener('click' , ()=> {
        document.execCommand("fontSize" , false , fontTall.value);
        /* o tamanho é limitado a 7 opções mas para versão inicial é suficiente, limitação do recurso fontSize tendo os tamanhos já padrão 1 a 7
        comparei os valores em um outro editor de texto e deixei aproximadamente no HTML.      limitacao do execcomand
        */
    });
    const selectJBtn = document.querySelector("#selectJustify"); // a constante pega o select 
    selectJBtn.addEventListener('click' , ()=> { // ao clicar em um deles e inserido o evento...
        switch (selectJBtn.value) { // caso o valor selecionado seja centro, ira executar o comando justifyCenter 
            case 'justifyCenter':
                document.execCommand(selectJBtn.value, false, "");
                selectJBtn.value = "null";
            break;
            case 'justifyLeft':
                document.execCommand(selectJBtn.value, false, "");
                selectJBtn.value = "null";
            break;
            case 'justifyRight':
                document.execCommand(selectJBtn.value, false, "");
                selectJBtn.value = "null";
            break;
            // lembrando que so funciona pois cada value no HTML esta exatamente como deve ser no execComand
        }
        return true;

    });

    const topicInput = document.querySelector("#inputTopic");
    topicInput.addEventListener('click' , ()=> {
      //  document.execCommand( "insertUnorderedList"); // cria uma lista não ordenada, por algum motivo o css padding=0   deixa esse evento impossibilitado !!!POR ISSO NAO DEVE SER INSERIDO NO css!!!
    
        
        switch (topicInput.value) {
            case '123':
                document.execCommand("insertOrderedList");
                topicInput.value = "null"

            break;
            case 'underline':
                document.execCommand("insertUnorderedList");
                topicInput.value = "null"
            break;
            case 'roman':
                document.execCommand("insertOrderedList");
                topicInput.value="null"
                let nodeListR = document.querySelectorAll('li');
                for (let i = 0; i < nodeListR.length; i++) {
                    nodeListR[i].style.listStyleType = "upper-roman";
                }
            break;
            case 'alpha':
                document.execCommand('insertOrderedList');
                let nodeListA = document.querySelectorAll('li');
                for (let i = 0; i < nodeListA.length; i++) {
                    nodeListA[i].style.listStyleType = " lower-alpha";
                }
                topicInput.value="null"
                
            break;
        }

        return true;

    });
    // depois atualizar essa tabela para que ela possa ser movida

    const exitT = document.createElement("p");
    exitT.innerText = "...";  
     // para poder sair dos elementos criados (gambearra)

    tableBtn.addEventListener('click' , () => { 
        let linha = +prompt('Qual número de linhas?'); // Cria mensagem no pronpt (tipo um alert mas com um imput para inserir dados) do usuario perguntando quantas linhas serao inseridas, salvando na variavel linha 
        let coluna= +prompt('Qual número de colunas?'); // - obs importante o + na frente serve para transformar o que for inserido em int em vez de string 
        // substituir por um MODAL **
        if (isNaN(linha) || isNaN(coluna)) { //validando para que entre apenas numeros
            window.alert("ta procurando o que? digita um numero ai");  // caso alguem tente injetar um script ou inserir um texto aleatorio.
        }
        else { //se as variaveis forem preenchidas corretamente, ou seja um numero definindo a quantidade de linhas e colunas

            let t = document.createElement("table"); // cria na variavel t o elemento tabela, NAO ESQUECER DE INSERIR O ELEMENTO DEPOIS.
            t.border = "1";  // Colocando uma borda no elemento t ou seja na tabela                        
            t.style.borderCollapse = "collapse";
            t.style.border = "1px solid black";
            t.style.margin = "auto";
            // verificar possibilidade de inserir trecho no css
            for( let l=0; l<linha; l++)  // aqui ira criar as linhas... em quanto `l` menor que a quantidade diigitado pelo usuario (em linha), l adiciona mais um, ate ficar na quantidade que o usuario digitou  
            {
                let tr = document.createElement("tr");  // cria o elemento tr que e a linha da tabela
                tr.style.border = "1px solid blue"; // adiciona a borda para ficar visivel
                for( let c=0; c<coluna; c++) // mesma logica para as colunas
                {
                    let td   = document.createElement("td"); 
                    td.style.border = "1px solid blue";
                    td.innerHTML = "------"; // apenas para as linhas n ficarem mt pequenas e grudadas
                    tr.appendChild(td); // aqui adiciona as linhas nas colunas
                }
                t.appendChild(tr); // aqui insere a tabela nas linhas
            }
            papermain.appendChild(t); // agora insere a tabela no papel principal
            papermain.appendChild(exitT); // o pontinho pra fora apenas para poder clicar para sair
        }
    });
    textbtn.addEventListener('click' , ()=> {
        let t = document.createElement('div');
        t.setAttribute("class" , "Quadrado");
        papermain.appendChild(t);
        papermain.appendChild(exitT);
    });
    formulaBtn.addEventListener ('click', ()=> {
        switch (formulaBtn.value) {
            case 'quadrado':
                let q = document.createElement('div');
                q.setAttribute("class" , "quadrado");
                papermain.appendChild(q);
                papermain.appendChild(exitT);
                formulaBtn.value = "null"
            break;
            case 'circulo':
                let c = document.createElement('div');
                c.setAttribute("class" , "circulo");
                papermain.appendChild(c);
                papermain.appendChild(exitT);
                formulaBtn.value = "null"
            break;
            case 'estrela':
                console.log('estrela') 
                formulaBtn.value = "null"
            break;
            case 'triangulo':
                let t = document.createElement('div');
                t.setAttribute("class" , "triangulo");
                papermain.appendChild(t);
                papermain.appendChild(exitT);
                formulaBtn.value = "null"
            break;         
        } 
        return true;
    });
    imgInput.addEventListener('change', function (){ // adiciona ao input o evento change que ao selecionar o imput ira executar a funcao 
        if (this.files && this.files[0]) { // aqui verifica se existe um arquivo selecionado no input e na change
            let loadImg = this.files[0]; // atribuo esse arquivo a uma variavel
            let readFile = new FileReader(); // para o navegador poder ler/interpretar o arquivo
            readFile.onload = (loadFile) => {
                let img64 = loadFile.target.result; // converte a imagem para base 64
                let newImg = document.createElement('img'); // cria a imagem no documento html
                newImg.src = img64; // recebe a imagem em formato 64
                papermain.appendChild(newImg);
                papermain.appendChild(exitT);
                alert(img64);

            }
            readFile.readAsDataURL(loadImg);
            alert(img64);

        } else {
            alert('selecione um arquivo de imagem')
        }
        
    });
   audioInput.addEventListener('change', function(){
        if (this.files && this.files[0]) {
            let  audio = document.createElement('audio');
            audio.setAttribute('controls','controls');
            audio.setAttribute('accept','audio/*');
            let freader = new FileReader();
            freader.readAsDataURL(audioInput.files[0]);
            freader.onload = function () {
                audio.src=freader.result;
            }
            papermain.appendChild(audio);
            papermain.appendChild(exitT); // o pontinho pra fora apenas para poder clicar para sair
        }
   });
   videoInput.addEventListener('change' , function(){
     if (this.files && this.files[0]) {
        let video = document.createElement('video');
        video.setAttribute('controls' , 'controls');
        video.setAttribute('accept' , 'video/*');
        let freader = new FileReader();
        freader.readAsDataURL(videoInput.files[0]);
        freader.onload = function () {
            video.src=freader.result;
        }
        papermain.appendChild(video);
        papermain.appendChild(exitT); // o pontinho pra fora apenas para poder clicar para sair

     } 
   }); 
    
    if (localStorage.currentNot != null) {
            document.querySelector("#papermain").innerHTML =  localStorage.currentNot;
    }
    /*
    function fSave () {
        let nameNote = prompt('qual nome da nota?');  
        notes = document.getElementById('notes'); // pegando a lista (nota)
        let li = document.createElement('li');
        li.innerHTML = nameNote; // fazendo com que a nota tenha o nome inserido no promppt
        li.setAttribute('id' ,  n+ 'selectNote' ); // inserindo o atributo para posteriormente selecionar a nota desejada
        n++
        localStorage.n = n
        notes.appendChild(li) // inserindo li na lista de mptas
        localStorage.info = document.getElementById('papermain').innerHTML; // salvando a informacao que o usuario digitou no cache .info
        localStorage.liNotes = document.getElementById('notes').innerHTML; // inserindo as notas laterais salvas tambem no local storage
        arrNotes.push(localStorage.info); // insere a nota salva no cache tambem dentro de um array, onde estarao todas as notas, pois o localstorage nao salva arrays apenas string
        arrNotes.push('§--byLuanHenrique--§'); // isso e uma separa cada nota de um array, durante a conversao sera excluido

        var saveArrNotes = arrNotes; // um array recebendo todas as notas salvas
        transfornNotesString = saveArrNotes.toString();  // transformando todas as notas salvas ou seja todo o array em uma string, para que possa ser salvo no localStorage, visto que so salva string
        localStorage.allNotes = transfornNotesString; // agora sim salvo no cache todas as notas salvas separadas por §--byLuanHenrique--§
    }
    */
    function saveCurrentNot () {
        localStorage.currentNot = document.getElementById('papermain').innerHTML;
    }

    document.addEventListener ('keypress', (event) => {
        saveCurrentNot();
    });
      
    saveAsBtn.addEventListener('click' , () =>{
 
        saveCurrentNot();
    
    });
   downBtn.addEventListener('click' , () => {
        var doc = new jsPDF();
        doc.fromHTML(document.getElementById("papermain"), // page element which you want to print as PDF
        15,
        15, 
        {
            'width': 170  //set width
        },
        function(a) {
            doc.save("documento basico"); // save file name as HTML2PDF.pdf
        });
   });


});