/* ---------------------------------------------------------
  F-representation
  in: list = list
    : b    = base */
var Frep=function(){
  this.list=[];
  this.b=2;
};
Frep.parseInt=function(xs,bs){
  x=parseInt(xs);
  b=parseInt(bs);
  var f=new Frep();
  f.list=[];
  var bt=b;
  while(true){
    var xt=0;
    while(true){
      ft=getF(xt+1,bt);
      if(ft>x) break;
      xt++;
    }
    var ft;
    var it=0;
    while(true){
      ft=getFi(xt,it+1,bt);
      if(ft>x) break;
      it++;
    }
    ft=getFi(xt,it,bt);
    if(xt>=b) xt=Frep.parseInt(xt,b);
    f.list.push([xt,it]);
    if(ft==x)break;
    bt=ft;
  }
  f.b=b;
  return f;
}
var getFi=function(a,it,b){
  var v=b;
  for(var i=0;i<it;i++){
    v=getF(a,v);
  }
  return v;
}
var getF=function(a,b){
  if(a==0) return b+1;
  var v=b;
  for(var i=0;i<b;i++){
    v=getF(a-1,v);
  }
  return v;
}
/* ---------------------------------------------------------
  bms.expand() returns one step expanded matrix from bms */
Frep.prototype.expand=function(){
  return new Frep(s1,b1,this.f);
};
/* ---------------------------------------------------------
  convert to string */
Frep.prototype.toString=function(){
  var str=this.b;
  for(l=0;l<this.list.length;l++){
    var x=this.list[l][0];
    var i=this.list[l][1];
    if(i>0){
      is = (i==1)?"":"^"+i;
      if(typeof(x)=="object"){
        str="f_"+x.toString()+is+"("+str+")";
      }else{
        str="f_"+x           +is+"("+str+")";
      }
    }
  }
  return str;
}
Frep.prototype.toStringf=function(){
  var str="[";
  for(l=0;l<this.list.length;l++){
    if(l>0) str+=", ";
    var x=this.list[l][0];
    var i=this.list[l][1];
    if(typeof(x)=="object"){
      str+="("+x.toStringf()+","+i+")";
    }else{
      str+="("+x            +","+i+")";
    }
  }
  return str+"]_"+this.b;
}
/* ---------------------------------------------------------
  Parse multiple matrices
  Frep.multiparse("(0,1,2)(3,4,5)\n(6,7,8)(9,10,11)")
= [ [ [0,1,2],[3,4,5]],[[6,7,8],[9,10,11]  ] ]  */
Frep.multiparse=function(str){
  var a=str.split("\n");
  var mm=new Array(a.length);
  for(var m=0;m<a.length;m++){
    mm[m]=Frep.parse(a[m]);
  }
  return mm;
}
/* ---------------------------------------------------------
  parse matrix from String
  parse("(0,1,2)(3,4,5)") = Frep([[0,1,2],[3,4,5] ]) */
Frep.parse=function(str){
  var s=[[]];
  //              1  2   3   4
  var r = /^(\s*\()(.*?)(\))(.*)/;
  var m=str.match(r);
  var ci=0;
  while(m!=null){
    var c=m[2].split(",");
    for(ri=0;ri<c.length;ri++){
      s[ci].push(parseInt(c[ri],10));
    }
    str=m[4];
    if(str=="")break;
    m=str.match(r);
    if(m!=null){
      s.push([]);
      ci++;
    }
  }
  var b;
  //                     1   2    3
  m=str.match(/(\[)([\s\d]*)(\])/);
  if(m!=null) b = parseInt(m[2]);
  if(s.dims==1){
    return new Frep([s],b); // primitive sequence
  }else{
    return new Frep(s,b);
  }
}

Frep.prototype.Lng=function(){
  return this.xs();
}
Frep.Lng=function(M){
  return M.xs();
}
