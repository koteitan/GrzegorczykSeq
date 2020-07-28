window.onload=function(){ //entry point
  targetin.value = 5;
  basein.value   = 3;
  getfrep();
}
var getfrep=function(){ //button
  var f=Frep.parseInt(targetin.value, basein.value);
  outtext.value = f.toStringf() + " = " + f.toString();
};

var inctarget=function(){ //button
  targetin.value=parseInt(targetin.value)+1;
  getfrep();
}

var dectarget=function(){ //button
  targetin.value=parseInt(targetin.value)-1;
  getfrep();
}

