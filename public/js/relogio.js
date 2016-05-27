
var agora;
var timerRegressivo;
//var sec = Math.floor((new Date().getTime() - agora) /1000 ) ;


  $(document).ready(function(){
      localStorage.countSlides = 0;
      localStorage.runningCount = 0;

      $("#marcador1Txt").keyup(function(e){
        if(e.which==16 || e.which==186 || (e.which>=48 && e.which<=57) ){

        } else {
          var texto = $(this).val();
          $(this).val(texto.substring(0,texto.length-1));
        }
      });

      $("#button1").click(function(){
        iniciaRegressivo($("#marcadorRegressivo"), 1000, $("#marcador1Txt"));
      });

      $("#button2").click(function(){
          if(localStorage.runningCount==1){
            zeraContador();
          } else {
            localStorage.runningCount = 1;
            $("#button2").text("reiniciar");
            contador($("#marcadorTotal"), 1000);
          }
      });

      $("#buttonPlus").click(function(){
        $("#contaSlidesDiv").text(++localStorage.countSlides);
      });

      $("#buttonMinus").click(function(){
        $("#contaSlidesDiv").text(--localStorage.countSlides);
      });
      $("#fontPlus").click(function(){
        $('.visor').each(
          function(){
            var size = parseInt($(this).css("font-size").replace("px","")) ;
            $(this).css("font-size", (++size) + "px");
          }
        );
      });

      $("#fontMinus").click(function(){
        $('.visor').each(
          function(){
            var size = parseInt($(this).css("font-size").replace("px","")) ;
            $(this).css("font-size", (--size) + "px");
          }
        );
      });
  });

function zeraContador(){
  agora = moment().startOf('year');
  agora.month(0).date(1).hours(0).minutes(0).seconds(0).milliseconds(0);
}

function contador(comp, millisecondsToWait ){
  if(agora == undefined){
      zeraContador();
  }
  pintaComponente(comp);
  setTimeout(function() {
    agora.add('seconds', 1);
    $(comp).text(agora.format('HH:mm:ss'));
    contador(comp, millisecondsToWait);
  }, millisecondsToWait);
}

function pintaComponente (comp){
  if(agora.get('hour')==0 &&
      agora.get('minute')==0 &&
      agora.get('second')==0){
          $(comp).css( "background-color", "#ffffff");
  } else if(agora.get('hour')==1 &&
      agora.get('minute')>=38 ){
          $(comp).css( "background-color", "#ff0000");
  } else if(agora.get('hour')==1 &&
      agora.get('minute')>=35 ){
          $(comp).css( "background-color", "#ffff00");
  }
}

function regressivo(comp, millisecondsToWait){
  setTimeout(function() {
    timerRegressivo.subtract('seconds', 1);
    console.log(timerRegressivo.get('minute'));
    if(timerRegressivo.get('minute')<=2){
      if (timerRegressivo.get('minute')<1) {
        $(comp).css( "background-color", "#ff0000");
      } else {
        $(comp).css( "background-color", "#ffff00");
      }
    }
    console.log(timerRegressivo.format('h:mm:ss'));
    if(timerRegressivo.get('hour')==0 ){
      $(comp).text(timerRegressivo.format('mm:ss'));
    } else {
      var total = 3600;
      negativo = timerRegressivo.get('minute') * 60 + timerRegressivo.get('second');
      total -= negativo;
      var minutos = parseInt(total/60);
      var segundos = parseInt(total-(minutos*60));
      var time = moment().startOf('year');
      time.month(0).date(1).hours(0).minutes(minutos).seconds(segundos).milliseconds(0);
      $(comp).css( "background-color", "#000000");
      $(comp).css( "color", "#ff0000");
      $(comp).text("-"+ time.format('mm:ss'));
    }
    regressivo(comp, millisecondsToWait);
  }, millisecondsToWait);
}

function iniciaRegressivo(comp, millisecondsToWait, compTime ){
  var text = $(compTime).val().split(':');
  var time = moment().startOf('year');
  $(comp).css( "background-color", "#ffffff");
  $(comp).css( "color", "#000000");
  time.month(0).date(1).hours(0).minutes(text[0]).seconds(text[1]).milliseconds(0);
  if(timerRegressivo == undefined){
    timerRegressivo = time;
    regressivo(comp, millisecondsToWait);
  }
  timerRegressivo = time;
}
