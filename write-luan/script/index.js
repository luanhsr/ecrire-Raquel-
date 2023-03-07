/*function teste1 () {
    console.log (arrNotes);
    console.log (` isso e uma string: ${localStorage.allNotes} `);
}botao pra testar algo novo
*/
var arrNotes = new Array(); // um array para salvar as notas inserido fora do load pois se toda vez que carregar a pagina ira crialo vazio
var transfornNotesString = new String('vazia'); // essa variavel foi feita apenas para salvar um array convertido em string
window.addEventListener("load", function () {
    
    /* por algum motivo meu script carrega antes da página então não consegue pegar todos os valores a tempo, logo todos são dados como nulos, e não é possível
        adicionar eventos em variáveis nulas, então insiro todo o código depois que a página recarregar, só ai são capturados os valores.
    */
    const boldBtn = document.querySelector('#btnBold');
    const underlineBtn = document.querySelector("#btnUnderline");       // selecionando cada botao de edicao de texto, alguns sao inputs
    const italicBtn = document.querySelector("#btnItalic");             // como os valores inseridos serão sempre elementos do HTML, optei por const ao invés de var, pois os botoes serao sempre os mesmos, nao ira variar
    const colorInput = document.querySelector("#inputColor");             
    const selectFont = document.querySelector("#selectFont");
    const fontTall = document.querySelector("#fontTall");
    const btnTopic = document.querySelector("#btnTopic");
    const btnTable = document.querySelector("#btnTable");
    const btnText = document.querySelector("#btnCreateTextBox");
    const btnFormula = document.querySelector("#btnFormula");
    const imgInput = document.querySelector("#imageInput");
    const audioInput = document.querySelector("#inputAudio");
    const videoInput = document.querySelector("#inputVideo");
    const btnSave = document.querySelector("#save");
    const btnDown = document.querySelector("#downPDF");

    boldBtn.addEventListener('click' , ()=> {                                
        document.execCommand('bold');
    });
    underlineBtn.addEventListener('click' , ()=> {
        document.execCommand('underline');
    });
    italicBtn.addEventListener('click', ()=>{
        document.execCommand('italic');
    });
     // adicionando o evento clicar aos botoes, fazendo executar o comando que transforma o texto em negrito/italico/sublinhado   
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
    btnTopic.addEventListener('click' , ()=> {
        document.execCommand( "insertUnorderedList"); // cria uma lista não ordenada, por algum motivo o css padding=0   deixa esse evento impossibilitado !!!POR ISSO NAO DEVE SER INSERIDO NO css!!!
    });
    // depois atualizar essa tabela para que ela possa ser movida

    const exitT = document.createElement("p");
    exitT.innerText = "...";  
     // para poder sair dos elementos criados (gambearra)

    btnTable.addEventListener('click' , () => { 
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
    btnText.addEventListener('click' , ()=> {
        let t = document.createElement('div');
        t.style.height ="150px";
        t.style.width ="150px";
        t.innerHTML = "digite seu texto aqui!"
        t.style.border = "1px solid black"
        papermain.appendChild(t);
        papermain.appendChild(exitT);
    });
    btnFormula.addEventListener('click' , ()=> {
        let t = document.createElement('div');
        t.style.height ="200px";
        t.style.width ="200px";
        t.innerHTML = "FORMULA QUADRADA"
        t.style.border = "1px solid black"
        papermain.appendChild(t);
        papermain.appendChild(exitT);
        // DEPOIS fazer mais formulas e alterar para um select no HTML*
    });
    imgInput.addEventListener('change', function (){
        if (this.files && this.files[0]) {
            let img = document.createElement('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // 
            }
            img.src = URL.createObjectURL(this.files[0]); 
            papermain.appendChild(img);
            papermain.appendChild(exitT); // o pontinho pra fora apenas para poder clicar para sair
            // a logica foi focada em apenas encaminhar os arquvos nao foi pensado em tamanho ou responsividade
            // verificar responsividade depois *
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

   if (localStorage.allNotes != null) { // quando a pagina recarregar vai verificar se tem algum elemento em todas as notas salvas
        arrNotesTransformToArray = localStorage.allNotes; // feito a verificacao cria-se um array para receber todas as notas salvas em formato de string separado uma a uma por §--byLuanHenrique--§
            
        result = arrNotesTransformToArray.search(`-byLuanHenrique-`); // isso verifica se existe a separacao, se nao ira excluir notas validas, a funcao search procura elementos citados e retorna o valor da sua posicao, se nao tiver ele retorna -1 se tiver vai mostrar na onde esta na string
        if (result >= 0) { // ou seja, se tiver qualquer §--byLuanHenrique--§  em qualquer lugar sera feito a logica
            arrNotes = arrNotesTransformToArray.split(',§--byLuanHenrique--§,'); // basicamente o array volta a receber todas as notas salvas, separando em cada indice cada nota, sendo separadas por §--byLuanHenrique--§
        }
        
    } 
    if (localStorage.info != null) {
            document.querySelector("#papermain").innerHTML =  localStorage.info;
            n = localStorage.n
            parseInt(n);
            document.querySelector("#notes").innerHTML = localStorage.liNotes;
            var enlistment =  document.querySelectorAll("#notes li"); // selecionando todos os elementos dentro das #notas que sejam li, ou seja a lista de notas
            for (var i = 0; i <enlistment.length; i ++) { // percorrendo o alistamento 
                enlistment[i].addEventListener("click" , function(e){ // ao selecionar um indice deste alistamento ira adicionar o evento clicar e ira mostrar o id selecionado.
                let select = this.id
                document.querySelector('#papermain').innerHTML = arrNotes[parseInt(select)]
                })
            }
            

    } else {
        document.querySelector("#notes").innerHTML = "Nem uma nota salva: "
        n = 0;
    }
    // a logica a baixo e para garantir que toda vez que o usuario clicar em salvar, ira salvar uma nota em cada indice de array e criar uma separacao para que posteriormente possa ser 
    // separado novamente, se nao ao recarregar a pagina todos os indices (notas) estarao em uma unica nota e em um unico indice

    btnSave.addEventListener('click' , () =>{

            if (arrNotes == 0) { // 1 caso a array ainda estiver vazio salva normalmente
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
            else if (arrNotes[arrNotes.length-1] == '§--byLuanHenrique--§' && arrNotes.length > 0) { // quando a pagina recarregar e tiver esse array com a separacao continua salvando normalmente, se nao ira ser inserido os elementos do array com a separacao
                let nameNote = prompt('qual nome da nota?'); 
                notes = document.getElementById('notes'); // pegando a lista (nota)
                let li = document.createElement('li');
                li.innerHTML = nameNote; // fazendo com que a nota tenha o nome inserido no promppt
                li.setAttribute('id' ,  n+ 'selectNote');
                n++
                localStorage.n = n
                notes.appendChild(li) // pinserindo li na lista
                localStorage.info = document.getElementById('papermain').innerHTML;
                localStorage.liNotes = document.getElementById('notes').innerHTML; // inserindo as notas laterais salvas tambem no local storage
                arrNotes.push(localStorage.info); // insere o que esta no localstorage dentro do array
                arrNotes.push('§--byLuanHenrique--§'); // isso e uma separacao dos arrays

                var saveArrNotes = arrNotes;
                transfornNotesString = saveArrNotes.toString();
                localStorage.allNotes = transfornNotesString;

            } 
            else { // quando o array identificar que ja foi feito a separacao, ele deve inserir a separacao novamente a cada indice do array
                    

                let element = '§--byLuanHenrique--§';  // cria o elemento que separa os indices 
                let insertInArray = []; // cria um array vazio para receber tudo
                arrNotes.forEach((e, i) => { //percorre o array buscando os elementos e os indices
                    if (i === 0) { // se o indice for indentico a 0 ou seja o primeiro indice
                            return insertInArray = [e, element] // ira retornar o elemento do array com o novo elemento
                    }
                    insertInArray.push(e, element) // depois de feito pela primeira vez, ira a cada elementod do array inserir o novo elemento de separacao
                    })
                    // pronto, agora toda vez que a pagina recarregar e as paginas nao estiverem separadas, ira ser realizado a separacao 
                arrNotes= insertInArray;

                let nameNote = prompt('qual nome da nota?'); 
                notes = document.getElementById('notes'); // pegando a lista (nota)
                let li = document.createElement('li');
                li.innerHTML = nameNote; // fazendo com que a nota tenha o nome inserido no promppt
                li.setAttribute('id' ,  n+ 'selectNote');
                n++
                localStorage.n = n
                notes.appendChild(li) // pinserindo li na lista
                localStorage.info = document.getElementById('papermain').innerHTML;
                localStorage.liNotes = document.getElementById('notes').innerHTML; // inserindo as notas laterais salvas tambem no local storage
                arrNotes.push(localStorage.info); // insere o que esta no localstorage dentro do array
                arrNotes.push('§--byLuanHenrique--§'); // isso e uma separacao dos arrays
    
                var saveArrNotes = arrNotes;
                transfornNotesString = saveArrNotes.toString();
                localStorage.allNotes = transfornNotesString;

            }    
    });
   
   btnDown.addEventListener('click' , () => {
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