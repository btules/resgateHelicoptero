//inicio do jogo 
function start() {
  $("#inicio").hide();

  $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
  $("#fundoGame").append("<div id='inimigo2' class='anima3'></div>");
  $("#fundoGame").append("<div id='amigo' class='anima4'></div>");


  // movimento do jogo

  let jogo = {};
  let podeAtirar = true;
  let fimdejogo = false;
  let tecla = {
    W: 38,
    S: 40,
    D: 68
  }

  jogo.pressionou = [];

  //Game loop

  jogo.timer = setInterval(loop, 30);
  function loop() {
    movefundo();
    moveJogador();
    moveInimigo1();
    moveInimigo2();
    moveAmigo();
    colisao();
  }

  function movefundo() {
    let esquerda = parseInt($("#fundoGame").css("background-position"));
    $("#fundoGame").css("background-position", esquerda - 1);
  }

  //Verifica se o usuário pressionou alguma tecla

  $(document).keydown(function (e) {
    jogo.pressionou[e.which] = true;
  });

  $(document).keyup(function (e) {
    jogo.pressionou[e.which] = false;
  });

  //movimentando o jogador

  function moveJogador() {
    let topo = parseInt($("#jogador").css("top"));

    if (jogo.pressionou[tecla.W]) {
      $("#jogador").css("top", topo - 10);

      if (topo <= 0) {
        $("#jogador").css("top", topo + 10);
      }
    }

    if (jogo.pressionou[tecla.S]) {
      $("#jogador").css("top", topo + 10);

      if (topo >= 434) {
        $("#jogador").css("top", topo - 10);
      }
    }

    if (jogo.pressionou[tecla.D]) {
      // disparo do helicóptero
      Disparo();
    }
  }

  //movimentar o inimigo 1

  let velocidade = 5;
  let posicaoY = parseInt(Math.random() * 334);

  function moveInimigo1() {

    let posicaoX = parseInt($("#inimigo1").css("left"));
    $("#inimigo1").css("left", posicaoX - velocidade);
    $("#inimigo1").css("top", posicaoY);


    if (posicaoX <= 0) {
      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }
  }

  //movimentar o inimigo

  function moveInimigo2() {

    let posicaoX = parseInt($("#inimigo2").css("left"));
    $("#inimigo2").css("left", posicaoX - 3);

    if (posicaoX <= 0) {
      $("#inimigo2").css("left", 775);
    }
  }

  //movimentar o amigo
  function moveAmigo() {
    let posicaoX = parseInt($("#amigo").css("left"));
    $("#amigo").css("left", posicaoX + 1);

    if (posicaoX > 906) {
      $("#amigo").css("left", 0);
    }
  }

  function Disparo() {

    if (podeAtirar == true) {

      podeAtirar = false;

      topo = parseInt($("#jogador").css("top"));
      let posicaoX = parseInt($("#jogador").css("left"));
      let tiroX = posicaoX + 190;
      let topoTiro = topo + 37;

      $("#fundoGame").append("<div id='disparo'></div>");
      $("#disparo").css("top", topoTiro);
      $("#disparo").css("left", tiroX);

      tempoDisparo = window.setInterval(executaDisparo, 30);

    }

    function executaDisparo() {
      let posicaoX = parseInt($("#disparo").css("left"));
      $("#disparo").css("left", posicaoX + 15);

      if (posicaoX > 900) {
        window.clearInterval(tempoDisparo);
        tempoDisparo = null;
        $("#disparo").remove();
        podeAtirar = true;
      }
    }
  }

  function colisao() {
    let colisao1 = ($("#jogador").collision($("#inimigo1")));
    let colisao2 = ($("#jogador").collision($("#inimigo2")));
    let colisao3 = ($("#jogador").collision($("#amigo")));
    let colisao4 = ($("#disparo").collision($("#inimigo1")));
    let colisao5 = ($("#disparo").collision($("#inimigo2")));
    let colisao6 = ($("#inimigo2").collision($("#amigo")));

    if (colisao1.length > 0) {
      let inimigo1X = parseInt($("#inimigo1").css("left"));
      let inimigo1Y = parseInt($("#inimigo1").css("top"));
      explosao1(inimigo1X, inimigo1Y);

      let posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }

    //colisao outro inimigo

    if (colisao2.length > 0){
      let inimigo2X = parseInt($("#inimigo2").css("left"));
      let inimigo2Y = parseInt($("#inimigo2").css("top"));
      // explosao1(inimigo2X, inimigo2Y);

      $("#inimigo2").remove();
      reposicionaInimigo2();
    }

  }

  function explosao1(inimigo1X, inimigo1Y) {

    $("#fundoGame").append("<div id='explosao1'></div>");
    $("#explosao1").css("background-image", "url(./imgs/explosao.png)");
    let div = $("#explosao1");
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    div.animate({ width: 200, opacity: 0 }, "slow");

    tempoExplosao = window.setInterval(removeExplosao, 5000);

    function removeExplosao() {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;
    }
  }

  function reposicionaInimigo2(){

    let tempoColisao4 = window.setInterval(reposiciona4, 5000);

    function reposiciona4(){
      window.clearInterval(tempoColisao4);
      tempoColisao4 = null;

      if(fimdejogo == false){
        $("#fundoGame").append("<div id='inimigo2'></div>");
      }
    }
  }
}


