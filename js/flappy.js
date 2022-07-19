let config_nome
let config_cenario;
let config_intervalo;
let config_abertura;
let config_velocidade_jogo;
let config_personagem;
let config_tipo_jogo;
let config_velocidade_personagem;
let subir;
let descer;
let config_pontos;

function lerValores(){
    config_nome = document.getElementById("name_input").value;
    
    config_cenario = document.getElementsByName("group_cenario");
    for(i = 0; i < config_cenario.length; i++){
        if(config_cenario[i].checked){
            config_cenario = config_cenario[i].value;
            i = config_cenario.length;
        }
    }

    config_abertura = document.getElementsByName("group_abertura_canos");
    for(i = 0; i < config_abertura.length; i++){
        if(config_abertura[i].checked){
            config_abertura = config_abertura[i].value;
            i = config_abertura.length;
        }
    }
    
    if(config_abertura == "facil"){
        config_abertura = 260;
    } else if(config_abertura == "medio"){
        config_abertura = 200;
    } else if(config_abertura == "dificil"){
        config_abertura = 182;
    }
    
    config_intervalo = document.getElementsByName("group_distancia_canos");
    for(i = 0; i < config_intervalo.length; i++){
        if(config_intervalo[i].checked){
            config_intervalo = config_intervalo[i].value;
            i = config_intervalo.length;
        }
    }
    if(config_intervalo == "facil"){
        config_intervalo = 550;
    } else if(config_intervalo == "medio"){
        config_intervalo = 400;
    } else if(config_intervalo == "dificil"){
        config_intervalo = 280;
    }
    
    config_velocidade_jogo = document.getElementById("velocidade_input").value;
    
    config_personagem = document.getElementById("personagem");
    config_personagem = config_personagem.options[config_personagem.selectedIndex].value;
    if(config_personagem == "passaro"){
        config_personagem = "img/passaro.png";
    } else if(config_personagem == "vaca"){
        config_personagem = "img/vaca.png";
    } else if(config_personagem == "cachorro"){
        config_personagem = "img/cachorro.png";
    } else if(config_personagem == "sonic"){
        config_personagem = "img/sonic.gif";
    } else if(config_personagem == "cadeira"){
        config_personagem = "img/cadeira.png";
    } else if(config_personagem == "dragao"){
        config_personagem = "img/dragao.gif";
    } else if(config_personagem == "gato"){
        config_personagem = "img/gato.gif";
    } else if(config_personagem == "lapis"){
        config_personagem = "img/lapis.png";
    } 
    
    config_tipo_jogo = document.getElementsByName("group_tipo");
    for(i = 0; i < config_tipo_jogo.length; i++){
        if(config_tipo_jogo[i].checked){
            config_tipo_jogo = config_tipo_jogo[i].value;
            i = config_tipo_jogo.length;
        }
    }

    config_velocidade_personagem = document.getElementsByName("group_velocidade_pass");
    for(i = 0; i < config_velocidade_personagem.length; i++){
        if(config_velocidade_personagem[i].checked){
            config_velocidade_personagem = config_velocidade_personagem[i].value;
            i = config_velocidade_personagem.length;
        }
    }
    if(config_velocidade_personagem == "facil"){
        subir = 5;
        descer = -4;
    } else if(config_velocidade_personagem == "medio"){
        subir = 8;
        descer = -5;
    } else if(config_velocidade_personagem == "dificil"){
        subir = 10;
        descer = -8;
    }

    config_pontos = document.getElementsByName("group_pontos");
    for(i = 0; i < config_pontos.length; i++){
        if(config_pontos[i].checked){
            config_pontos = config_pontos[i].value;
            i = config_pontos.length;
        }
    }

    if(config_pontos == "um"){
        config_pontos = 0;
    } else if(config_pontos == "dez"){
        config_pontos = 9;
    } else if(config_pontos == "cem"){
        config_pontos = 99;
    }
    
}

// COnfigurações escolhidas pelo usuário
function estrela(){
    this.elemento = novoElemento("div", "estrela");
    const borda = novoElemento("div", "estrela-borda");
    const corpo = novoElemento("div", "estrela-corpo");

    this.setAltura = altura => corpo.style.height = '${altura}px'
}

function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function Barreira(reversa = false) {
    this.elemento = novoElemento('div', 'barreira')
    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
    
    if(config_cenario == "noturno"){
        corpo.style.backgroundImage = "linear-gradient(90deg, rgb(19, 19, 19), #354711)";
        borda.style.backgroundImage = "linear-gradient(90deg, rgb(44, 44, 44), #283a05)";
    }
}



function ParDeBarreiras(altura, abertura, popsicaoNaTela) {
    this.elemento = novoElemento('div', 'par-de-barreiras')
    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura) 
        
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX =  popsicaoNaTela => this.elemento.style.left = `${popsicaoNaTela}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(popsicaoNaTela)
} 

function NovasEstrelas(altura, largura, espaco, ponto){
    
}

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),
        new ParDeBarreiras(altura, abertura, largura + espaco * 3)
        
    ]
    //deslocamente eh a velocidade do passaro, ou seja, a velocidade de deslocamento horizontamente
    const deslocamento = parseInt(config_velocidade_jogo);
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            const meio = largura / 2
            const cruzouMeio = par.getX() + deslocamento >= meio
                && par.getX() < meio
            if (cruzouMeio) {
                notificarPonto()
            }
        })
    }
}

function Passaro(alturaJogo) {
    let voando = false

    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = config_personagem;

    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        //8 eh a velocidade com que o passaro sobe e -5 eh a velocidade com que o passaro desce
        const novoY = this.getY() + (voando ? subir : descer)
        const alturaMaxima = alturaJogo - this.elemento.clientWidth

        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }
    this.setY(alturaJogo / 2)
}

 function Progresso() {

    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML = pontos
    }
    this.atualizarPontos(0)
}

 function estaoSobrepostos(elementoA, elementoB) {

    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()
    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function colidiu(passaro, barreiras) {
    let colidiu = false

    barreiras.pares.forEach(parDeBarreiras => {
        if (!colidiu) {
            const superior = parDeBarreiras.superior.elemento
            const inferior = parDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior)
                || estaoSobrepostos(passaro.elemento, inferior)
        }
    })

    //Parar o jogo pois o passaro colidiu
    if(config_tipo_jogo == "treino"){
        return null
    } else if(config_tipo_jogo == "real"){
        return colidiu
    }
}

 function FlappyBird() {
    let pontos = config_pontos;
    const areaDoJogo = document.querySelector('[wm-flappy]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth
    

    const progresso = new Progresso()
    // 200 ou config_abertura eh a distancia verticalmente dos canos e 400 a distancia horizontalmente
    const barreiras = new Barreiras(altura, largura, config_abertura, config_intervalo,
        () => progresso.atualizarPontos(++pontos))

    const passaro = new Passaro(altura)

    areaDoJogo.appendChild(progresso.elemento)
    areaDoJogo.appendChild(passaro.elemento)
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

    this.start = () => {
        const temporizador = setInterval(() => {
            barreiras.animar()
            passaro.animar()

                //chamar a função para pausar o temporizador e pausar o jogo
                if(colidiu(passaro,barreiras)){ 
                    clearInterval(temporizador)
                    fimDeJogo();
             } 
        }, 20)
    }

}

//Função para mostrar janela de fim de jogo class = container
function fimDeJogo(){
    document.getElementById("fim_de_jogo").style.display = "flex";
    document.getElementById("fim_dados").innerHTML = config_nome;
    //mostrar o resultado da pontuação
    
}

////////////////////////////////////////////////////////////////
function config(){
    //Função para pegar os dados do formulario
    lerValores();
    
    document.getElementById("jogo").style.display = "inline";
    document.getElementById("configuracoes").style.display = "none";
    
    new FlappyBird().start();

    if(config_cenario == "noturno"){
        document.getElementById("jogo").style.backgroundImage = "linear-gradient(0, #120c56, #000000)";
    } else if (config_cenario == "diurno"){
        document.getElementById("jogo").style.backgroundColor = "deepskyblue";
    }

    
}

