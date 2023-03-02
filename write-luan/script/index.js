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

   if (localStorage.allNotes != null) {
        arrNotesTransformToArray = localStorage.allNotes;
        arrNotes = arrNotesTransformToArray.split(',§--byLuanHenrique--§');
        arrNotes.pop();
      
    }
    if (localStorage.info != null) {
        document.querySelector("#papermain").innerHTML =  localStorage.info;
        
        if (localStorage.liNotes == null) {
            document.querySelector("#notes").innerHTML = "Notas Salvas:"
        } else {
                document.querySelector("#notes").innerHTML = localStorage.liNotes;
                
                document.getElementById("SelectLi0").addEventListener ('click' , () => {
                    console.log('busque conhecimento');
                    document.querySelector("#papermain").innerHTML =  arrNotes[1];;
                })
                /*
                document.querySelector("#nota0").addEventListener ('click' , () => {
                document.querySelector("#papermain").innerHTML =  arrNotes[1];;
                
                })
                */
            }

    }
    n =0
    btnSave.addEventListener('click' , () =>{

            if (arrNotes == 0) {
                let nameNote = prompt('qual nome da nota?'); 
                notes = document.getElementById('notes'); // pegando a lista (nota)
                let li = document.createElement('li');
                li.innerHTML = nameNote; // fazendo com que a nota tenha o nome inserido no promppt
                li.setAttribute('id' , 'SelectLi' +n);
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
            else if (arrNotes[arrNotes.length-1] == '§--byLuanHenrique--§' && arrNotes.length > 0) {
                let nameNote = prompt('qual nome da nota?'); 
                notes = document.getElementById('notes'); // pegando a lista (nota)
                let li = document.createElement('li');
                li.innerHTML = nameNote; // fazendo com que a nota tenha o nome inserido no promppt
                li.setAttribute('id' , 'SelectLi' +n);
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
            else {
                    

                let element = '§--byLuanHenrique--§';
                let insertInArray = [];
                arrNotes.forEach((e, i) => {
                    if (i === 0) {
                            return insertInArray = [element, e, element]
                    }
                    insertInArray.push(e, element)
                    })

                arrNotes= insertInArray;

                let nameNote = prompt('qual nome da nota?'); 
                notes = document.getElementById('notes'); // pegando a lista (nota)
                let li = document.createElement('li');
                li.innerHTML = nameNote; // fazendo com que a nota tenha o nome inserido no promppt
                li.setAttribute('id' , 'SelectLi' +n);
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