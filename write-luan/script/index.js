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
        document.execCommand( "insertUnorderedList");
    });
});