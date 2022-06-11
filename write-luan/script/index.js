window.addEventListener("load", function () {
     /* por algum motivo meu script carrega antes da página então não consegue pegar todos os valores a tempo, logo todos são dados como nulos, e não é possível
        adicionar eventos em variáveis nulas, então insiro todo o código depois que a página recarregar, só ai são capturados os valores.
                                              */
   
    const boldBtn = document.querySelector('#btnBold');
    const underlineBtn = document.querySelector("#btnUnderline");       // selecionando cada "botão" para alterar o texto
    const italicBtn = document.querySelector("#btnItalic");         
    const btnColor = document.querySelector("#btnColor");               // como os valores inseridos serão sempre elementos do HTML, optei por const ao invés de var
    const selectFont = document.querySelector("#selectFont");
    const fontTall = document.querySelector("#fontTall");
    const btnTopic = document.querySelector("#btnTopic");
    const btnTable = document.querySelector("#btnTable");
    
    boldBtn.addEventListener('click' , ()=> {                                    
        this.document.execCommand('bold');
    });

    underlineBtn.addEventListener('click' , ()=> {
        this.document.execCommand('underline');
    });
    italicBtn.addEventListener('click', ()=>{
        this.document.execCommand('italic');
    });
     /* adiciona a variável (que está com botao) o evento 'click' executando a função seguinte: esse documento executa o comando bold/italic/underline
        ou seja o documento selecionado recebe o estilo citado  */
    btnColor.addEventListener('click', ()=>{
        this.document.execCommand("foreColor",false, btnColor.value);
    });
    selectFont.addEventListener('click' , ()=>{
        this.document.execCommand("fontName", false, selectFont.value);
    });
     /* usando o mesmo recurso nativo, execCommand, fore color é deixado como falso (padrão) até ser selecionado o valor que esta no input color, assim alterando
     a fonte, a mesma lógica se aplica ao fontName que altera a font do texto selecionado a partir da opção selecionada no html, algumas fontes são buscadas na api
     do google fonts por URL então não irá funcionar a menos que esteja conectado a internet  */

    fontTall.addEventListener('click' , ()=> {
        this.document.execCommand("fontSize" , false , fontTall.value);
        /* o tamanho é limitado a 7 opções mas para versão inicial é suficiente, limitação do recurso fontSize tendo os tamanhos já padrão 1 a 7
        comparei os valores em um outro editor de texto e deixei aproximadamente no HTML.      
        */
    });
    btnTopic.addEventListener('click' , ()=> {
        document.execCommand( "insertUnorderedList"); // cria uma lista não ordenada, por algum motivo o css padding=0 deixa esse evento impossibilitado
    });
    // depois atualizar essa tabela para que ela possa ser movida
    btnTable.addEventListener('click' , () => {
        let linha = +prompt('Qual número de linhas?'); // depois inserir no html
        let coluna= +prompt('Qual número de colunas?'); // envia um console igual o alert e é inserido o numero de linhas e colunas desejado

        if (linha && coluna) { //se existir linha e coluna

            let t    = document.createElement("table"); // cria na variavel t o elemento tabela, não funciona se não especificar onde vai ficar o elemento criado

            t.border = "1";                         
            t.style.borderCollapse = "collapse";
            t.style.border = "1px solid blue";
            t.style.margin = "auto";
                                                    /*verificar se é possível inserir trecho no css*/
            for( let l=0; l<linha; l++) 
            {
                let tr   = document.createElement("tr"); 
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
            
        }
        
    });
    

});