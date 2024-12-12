function startGame() {
    // Hide welcome screen
    document.getElementById('welcome-screen').style.display = 'none';
    
    // Show game
    document.querySelector('.circle-big').style.display = 'block';
    
    
    // Initialize game
    filled = [];
    wrongtries = 0;
    
    // Reset progress
    document.getElementById('p').value = 0;
    document.getElementById('wt').innerHTML = Sanscript.t('0', 'iast', 'devanagari');
    
    // Clear all circles
    const circles = document.getElementsByClassName('circle');
    for(let circle of circles) {
        circle.getElementsByTagName('p')[0].innerHTML = '';
    }
}

const urlParams = new URLSearchParams(window.location.search);
var set = urlParams.get('s');
if (!set || isNaN(set))
	set=0;
var t = urlParams.get('t'); // transliterate mode - 1 is true
if (!t)
	t=0;
var m=[["ॐ मित्राय नमः","ॐ रवये नमः","ॐ सूर्याय नमः","ॐ भानवे नमः","ॐ खगाय नमः","ॐ पूष्णे नमः","ॐ हिरण्यगर्भाय नमः","ॐ मरीचये नमः","ॐ आदित्याय नमः","ॐ सवित्रे नमः","ॐ अर्काय नमः","ॐ भास्कराय नमः"],["चैत्रः","वैशाखः","ज्येष्ठः","आषाढः","श्रावणः","भाद्रपदः","आश्विनः","कार्तिकः","मार्गशीर्षः","पौषः","माघः","फाल्गुनः"],["१","२","३","४","५","६","७","८","९","१०","११","१२"]];
var m1=m2=m[set];
var filled=[];
function stop()
{
document.getElementById("spin").style.backgroundImage="url('sun.png')";
pos=Math.floor(Math.random()*100)%m2.length;
text=m2[pos];
document.getElementById("new").innerHTML=text;
if (t==1) document.getElementById("trans").innerHTML= " - " + Sanscript.t(text, 'devanagari','itrans');
 document.getElementById("new").setAttribute("pos",m1.indexOf(text)+1);
}
wrongtries=0;
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  //if (document.getElementById(data).innerHTML==ev.target.getAttribute('r'))
  if (document.getElementById(data).getAttribute('pos')==ev.target.getAttribute('r'))
  {
   filled.push(document.getElementById("new").innerHTML);
   m2=[];
  for (i=0;i<m1.length;i++)
  {
   if (filled.indexOf(m1[i])<0)
   m2.push(m1[i]);
   }
  ev.target.getElementsByTagName("p")[0].innerHTML=document.getElementById(data).innerHTML;
  document.getElementById("p").value+=1;
  
  document.getElementById("new").innerHTML=Sanscript.t(document.getElementById("p").value+ " / 12",'iast', 'devanagari') ;
  document.getElementById("trans").innerHTML="";
  }
  else
  {
  wrongtries++;
  document.getElementById("wt").innerHTML=Sanscript.t(String(wrongtries),'iast', 'devanagari') ;
  }
  if (document.getElementById("p").value==document.getElementById("p").max)
    {
        showEndScreen();
        document.getElementById("spin").cursor="none";
        document.getElementById("spin").onclick="";
    }
	else{
document.getElementById("spin").style.backgroundImage="url('sun.gif')";
	 }  
}

var circleArray = document.getElementsByClassName("circle");
var pArray = document.querySelectorAll("div p");
var angle = 30;

chargearray();

function chargearray () {
    for (var i = 0, j = circleArray.length; i < j; i++) {
        var circle = circleArray[i];
		var p=pArray[i];
        var circleAngle = parseInt (circle.dataset.angle);
        var totalAngle = angle + circleAngle
        var style = "rotate(" + totalAngle + "deg) translate(200px)";
        totalAngle = - totalAngle;
        style = style + " rotate(" + totalAngle + "deg)"
        circle.style.webkitTransform = style;
        circle.style.Transform = style;
		p.style=style;
    }
}

document.onkeydown = function (e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
        case 37:
            angle = angle + 30;
            chargearray ();
            break;
        case 39:
            angle = angle - 30;
            chargearray ();
            break;
    }
}
function showEndScreen() {
    // Hide the game circle
    document.querySelector('.circle-big').style.display = 'none';
    
    // Show the end screen
    document.getElementById('end-screen').style.display = 'flex';
    document.getElementById('final-wrong-attempts').textContent = document.getElementById('wt').textContent;
}

function restartGame() {
    document.getElementById('end-screen').style.display = 'none';
    window.location.reload();
}