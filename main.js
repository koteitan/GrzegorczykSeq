window.onload=function(){ //entry point
  targetin.value = 5;
  basein.value   = 3;
  doctorin.value = 10000000;
  getfrep();
}
var getfrep=function(){ //button
  doctorstop=doctorin.value;
  isstop=0;
  var f=Frep.parseInt(targetin.value, basein.value);
  if(isstop){
    outtext.value = "Doctor stop.";
  }else{
    outtext.value = f.toStringf() + " = " + f.toString();
  }
};

var inctarget=function(){ //button
  targetin.value=parseInt(targetin.value)+1;
}

var dectarget=function(){ //button
  targetin.value=parseInt(targetin.value)-1;
}

var doctorstop=10000000;

