/*function teste1 () {
    console.log (arrNotes);
    console.log (` isso e uma string: ${localStorage.allNotes} `);
}botao pra testar algo novo
*/
var arrNotes = new Array(); // um array para salvar as notas inserido fora do load pois se toda vez que carregar a pagina ira crialo vazio
var transfornNotesString = new String('vazia'); // e necessario definir como string pois js interpreta como objeto na hora da conversao
window.addEventListener("load", function () {
     /* por algum motivo meu script carrega antes da página então não consegue pegar todos os valores a tempo, logo todos são dados como nulos, e não é possível
        adicionar eventos em variáveis nulas, então insiro todo o código depois que a página recarregar, só ai são capturados os valores.
    
        */
    const boldBtn = document.querySelector('#btnBold');
    const underlineBtn = document.querySelector("#btnUnderline");       // selecionando cada "botão" para alterar o texto
    const italicBtn = document.querySelector("#btnItalic");         
    const colorInput = document.querySelector("#inputColor");              // como os valores inseridos serão sempre elementos do HTML, optei por const ao invés de var
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
     /* adiciona a variável (que está com botao) o evento 'click' executando a função seguinte: esse documento executa o comando bold/italic/underline
        ou seja o documento selecionado recebe o estilo citado  */
    colorInput.addEventListener('click', ()=>{
        this.document.execCommand("foreColor",false, inputColor.value);
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
        comparei os valores em um outro editor de texto e deixei aproximadamente no HTML.      
        */
    });
    btnTopic.addEventListener('click' , ()=> {
        document.execCommand( "insertUnorderedList"); // cria uma lista não ordenada, por algum motivo o css padding=0 deixa esse evento impossibilitado
    });
    // depois atualizar essa tabela para que ela possa ser movida

    const exitT = document.createElement("p");
    exitT.innerText = ".";  
     // para poder sair dos elementos criados (gambearra)

    btnTable.addEventListener('click' , () => { // criar um MODAL   para substituir o prompt depois
        let linha = +prompt('Qual número de linhas?'); // obs importante o + na frente serve para transformar o que for inserido em int em vez de string 
        let coluna= +prompt('Qual número de colunas?'); // envia um prompt igual o alert e é inserido o numero de linhas e colunas desejado
        // substituir por um MODAL
        if (isNaN(linha) || isNaN(coluna)) { //validando para que entre apenas numeros
            window.alert("ta procurando o que? digita um numero ai"); 
        }
        else { //se existir linha e coluna

            let t = document.createElement("table"); // cria na variavel t o elemento tabela, não funciona se não especificar onde vai ficar o elemento criado

            t.border = "1";                         
            t.style.borderCollapse = "collapse";
            t.style.border = "1px solid blue";
            t.style.margin = "auto";
                                                    /*verificar se é possível inserir trecho no css*/
            for( let l=0; l<linha; l++) 
            {
                let tr = document.createElement("tr"); 
                tr.style.border = "1px solid blue";
                                                        // em quanto l menor que linha l repete, ou seja cria uma linha a cada loop 
                for( let c=0; c<coluna; c++)
                {
                    let td   = document.createElement("td"); 
                    td.style.border = "1px solid blue";
                    td.innerHTML = "_";
                    tr.appendChild(td);                          //  mesma lógica
                }
                t.appendChild(tr);
            }
            papermain.appendChild(t); // o elemento pai papermain recebe o elemento t como filho. ou seja a tabela.   
            papermain.appendChild(exitT);
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
     } 
   }); 

   if (localStorage.allNotes != null) { // quando a pagina recarregar vai verificar se tem algum elemento em todas as notas salvas
        arrNotesTransformToArray = localStorage.allNotes; // feito a verificacao cria-se um array para receber todas as notas salvas em formato de string separado uma a uma por §--byLuanHenrique--§
            
        result = arrNotesTransformToArray.search(`-byLuanHenrique-`); // isso verifica se existe a separacao, se nao ira excluir notas validas, a funcao search procura elementos citados e retorna o valor da sua posicao, se nao tiver ele retorna -1 se tiver vai mostrar na onde esta na string
        if (result >= 0) { // ou seja, se tiver qualquer §--byLuanHenrique--§  em qualquer lugar sera feito a logica
            arrNotes = arrNotesTransformToArray.split(',§--byLuanHenrique--§'); // basicamente o array volta a receber todas as notas salvas, separando em cada indice cada nota, sendo separadas por §--byLuanHenrique--§
            arrNotes.pop(); // aqui basicamente apaga o ultimo elemento, pois depois de transformando de string para array, fica as ultimas virgulas da string que antes era um array 
        }
        
    }
    if (localStorage.info != null) {
        document.querySelector("#papermain").innerHTML =  localStorage.info;
        
        if (localStorage.liNotes == null) {
            document.querySelector("#notes").innerHTML = "Notas Salvas:"
        } else {
                document.querySelector("#notes").innerHTML = localStorage.liNotes;
                document.getElementById("selectNote0").addEventListener ('click' , () => {
                    document.querySelector("#papermain").innerHTML =  arrNotes[1];;
                })
                /*
                document.querySelector("#nota0").addEventListener ('click' , () => {
                document.querySelector("#papermain").innerHTML =  arrNotes[1];;
                
                })
                */
            }

    }
    // a logica a baixo e para garantir que toda vez que o usuario clicar em salvar, ira salvar uma nota em cada indice de array e criar uma separacao para que posteriormente possa ser 
    // separado novamente, se nao ao recarregar a pagina todos os indices (notas) estarao em uma unica nota e em um unico indice
    n =0
    btnSave.addEventListener('click' , () =>{

            if (arrNotes == 0) { // 1 caso a array ainda estiver vazio salva normalmente
                let nameNote = prompt('qual nome da nota?');  
                notes = document.getElementById('notes'); // pegando a lista (nota)
                let li = document.createElement('li');
                li.innerHTML = nameNote; // fazendo com que a nota tenha o nome inserido no promppt
                li.setAttribute('id' , 'selectNote' +n); // inserindo o atributo para posteriormente selecionar a nota desejada
                n++
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
                li.setAttribute('id' , 'selectNote' +n);
                n++
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
                li.setAttribute('id' , 'selectNote' +n);
                n++
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