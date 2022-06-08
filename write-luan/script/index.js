window.addEventListener("load", function () {
    const boldBtn = document.querySelector('#btnBold');
    const underlineBtn = document.querySelector("#btnUnderline");
    const italicBtn = document.querySelector("#btnItalic");
    const btnColor = document.querySelector("#btnColor");
    const selectFont = document.querySelector("#selectFont");

    boldBtn.addEventListener('click' , ()=> {
        this.document.execCommand('bold');
    });

    underlineBtn.addEventListener('click' , ()=> {
        this.document.execCommand('underline');
    });

    italicBtn.addEventListener('click', ()=>{
        this.document.execCommand('italic');
    });
    btnColor.addEventListener('click', ()=>{
        document.execCommand("foreColor",false, btnColor.value);
    });
    // ainda não funcionando.

    selectFont.addEventListener('click' , ()=>{
        document.execCommand("fontName", false, selectFont.value);
    });
});