function read_a_day(jahr,tager){
console.log("reading a day: year: "+ jahr+ " - day " + tager)

ref = database.ref('/soundstorm/SS'+jahr+'/day'+tager);
ref.on('value', (snapshot) => {
daydata = snapshot.val()

graphdata={}
Object.keys(daydata).forEach((key) => {
for (k=0;k<stages_list.length;k++){
if (key == stages_list[k].name){capacity= stages_list[k].capacity}
}


graphdata[key]=make_graphdata_stages(daydata[key],capacity,tager)
})

sum_onsite = new Array(53)//.fill(0)
timp =[] 

for(i=0;i<sum_onsite.length;i++){

pq=0
Object.keys(graphdata).forEach((key) => {
if(graphdata[key].usage[i] != undefined) {  
if(sum_onsite[i] == undefined)[sum_onsite[i] =0]
sum_onsite[i] += (graphdata[key].usage[i]*stages_list[pq].capacity)/100}
pq++
})

}      

total_people = {usage:sum_onsite,zeit:graphdata["Big Beast Left"].zeit}





refresh()

return graphdata
})
}
function draw_arrow(){
  movement_layer.clearLayers()  
if(realtime == true){drawjetzt = new Date().getTime();puffer =0}else{drawjetzt=settim;puffer = (1000*60*7)}
  

    for (let lil=0;lil < swipes_arr.length;lil++){
              if(swipes_arr[lil].endzeit+puffer > drawjetzt && swipes_arr[lil].zeit-puffer < drawjetzt)
                              {

                              let ttl = (swipes_arr[lil].endzeit - drawjetzt)

                        farbe = "green"
                        if (swipes_arr[lil].dicke>5){farbe = "lime"}
                        if (swipes_arr[lil].dicke>10){farbe = "red"}
                        if(swipes_arr[lil].meldender == "sandro"){farbe="black"; swipes_arr[lil].dicke=10}

                        var polyline = L.polyline([swipes_arr[lil].von,swipes_arr[lil].nach],{weight:swipes_arr[lil].dicke,color:farbe}).bindTooltip(swipes_arr[lil].meldender + " - " +  getTimeOfDay (swipes_arr[lil].zeit)).addTo(movement_layer);
                      //  polyline.openTooltip()
                        var arrowHead = L.polylineDecorator(polyline, {    patterns: [   
                          { offset: '100%', repeat: 0, symbol: L.Symbol.arrowHead({ 
                          pixelSize: swipes_arr[lil].dicke+5, polygon: false, 
                          pathOptions: { fillOpacity: 1, weight:swipes_arr[lil].dicke,color:farbe } }) }    ]}).addTo(movement_layer);
                        setTimeout(function(){
                        polyline.remove()
                        arrowHead.remove()
                   
                        },ttl*1000)

                        polyline.on("click",function(){     swipes_arr[lil].endzeit = drawjetzt
                          polyline.remove()
                          arrowHead.remove()
                          databaseRef =database.ref('soundstorm/SS24aux/day' + heutag + '/swipes')
         databaseRef.set(swipes_arr)})
                      
                      }
              }

}
function initialise_firebase(){
  
const firebaseConfig = {
apiKey: "AIzaSyBOOdW1SHCwBZSchUJ7DfJZ1a7-dEYTvuQ",
authDomain: "crowdcount-678c8.firebaseapp.com",
databaseURL: "https://crowdcount-678c8-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "crowdcount-678c8",
storageBucket: "crowdcount-678c8.appspot.com",
messagingSenderId: "1020533758948",
appId: "1:1020533758948:web:23ec6e175dff3b5eedc5f1",
measurementId: "G-00674BETEZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
database = firebase.database();
deviceversion = 3.1
databaseRef = database.ref('soundstorm/SS24/Version');
// Read the data once
databaseRef.once('value')
    .then(snapshot => {
        // Process the snapshot data here
        fireversion = snapshot.val();
        if(overridedisplay9==false && deviceversion != fireversion){alert("You are using an old version of the crowd report app. please reload the site!")}              
    })



}  
function initialise_chart(data,plot_title){
selected_area.name = stages_list[selected_area.id].name
d3.select("#liu_div").selectAll('*').remove() // nicht unbedingt notwendig
const margin = {top: 20, right: 40, bottom: 40, left: 40}
width = fenster.breite*1- margin.left - margin.right
height = fenster.hoehe*0.3- margin.top - margin.bottom;



gr_layout= {
xaxis: {
type: 'date',
showgrid: true,
showline:true,          
         
  // Format for displaying date on x-axis
//range: [a, b],
range: ['2024-12-11 '+ (graphlinkegrenze-1) +':59:00', '2024-12-12 04:00:00'],
linecolor: 'black',
linewidth: 2,
mirror: true
},
yaxis: {
//title: plot_title,
autorange: true,
type: 'linear',
rangemode: 'tozero',  

zeroline: false,
showline: true,
overlaying: 'y2',
linecolor: 'black',
linewidth: 2,
mirror: true,
//  spikecolor:"green",spikethickness :1,
side:"left"
},

showlegend: true,legend: {  x: 1,  xanchor: 'right',  y: 1},

hovermode: "x",  //title: 'Basic Time Series', 
// font: {size: 40},
margin: {l: 40,  r: 25,b: 30,t: 10,  pad: 4},  
shapes:[]
}

gr_layout.xaxis.dtick=3600000

if (overridedisplay9){ 
  gr_layout.yaxis.autorange=false,
  gr_layout.yaxis.range = [0,105000],
  gr_layout.yaxis.showticklabels= false,
  gr_layout.yaxis.showticklabels= false,
  gr_layout.plot_bgcolor= "black"//'#2d2d2d',  // Dark background for the plot area
  gr_layout.paper_bgcolor= "black"//'#121212',  // Dark background for the entire page
  gr_layout.showlegend = false,
  gr_layout.font= {color: '#3a3a3b' ,size:22 }, // White font color for text   
  gr_layout.xaxis.tickfont= {            color: 'white' },  // White tick labels for x-axis       
  gr_layout.yaxis.showline = true,
  gr_layout.yaxis.tickfont={            color: 'white' },// White tick labels for y-axis
  gr_layout.margin= {l: 40,  r: 0,b: 60,t: 10,  pad: 4}  ,
  gr_layout.xaxis.gridcolor="#3a3a3b",      
  gr_layout.xaxis.tickformat="%H:%M"      





// gr_layout.title.font={            co

 }



gr_layout.shapes.push(    {
type: 'line',
x0: currentTimestamp,
x1: currentTimestamp,
y0: 0,
y1: 1,
xref: 'x',
yref: 'paper',
line: {
color: 'red',
width: 2,
dash: 'dashdot'  // You can customize the line style
}

})


Plotly.newPlot('liu_div', data,gr_layout,{
//displayModeBar: false, // this is the line that hides the bar.
})
//ply = document.getElementById('liu_div')
}
function fade_map_element(element, ttl){
//   fasdestart = new Date().getTime()
sinkend =1
k=0
let z = ttl/10
intervalId = setInterval(function(){

if(k=10){element.remove();
clearInterval(intervalId)};

element.setStyle({opacity:(sinkend-(k/10))})
},z)
k++
}
function read_current (){
// ich glaube diese funktion wird nur einmal aufgerufen weil connections zu firebas dann automatisch upgedatet werden
console.log("reading current...")
database = firebase.database();


databaseRef = database.ref('soundstorm/SS24aux/day' + heutag + '/swipes');
// Listen for changes in the database
databaseRef.on('value', (snapshot) => {
if (snapshot.exists()) {
swipes_arr = snapshot.val();
draw_arrow()
} else {
console.log("No data available");
}
}); 


databaseRef = database.ref('soundstorm/SS24aux/day' + heutag + '/locations');
// Listen for changes in the database
databaseRef.on('value', (snapshot) => {
if (snapshot.exists()) {
eigensymbole_arr= snapshot.val();

if(eigensymbole_arr.marker == undefined){eigensymbole_arr.marker = []}
if(eigensymbole_arr.spotter == undefined){eigensymbole_arr.spotter = []}

console.log(eigensymbole_arr)
draw_marker()
} else {
console.log("No data available");eigensymbole_arr= {marker:[],spotter:[]}
}
}); 




// Save the initial array to Firebase



ref = database.ref('/soundstorm/aktuell');
ref.on('value', (snapshot) => {//infotag.text("connected to database!"); 
{setTimeout(function (){d3.select('#lock').style('background-color',"green")},500)}
(errorObject) => 
// This callback will be called if there's an error connecting to the database
{d3.select('#lock').style('background-color',"yellow")}
})



ref.on('value', (snapshot) => {
current = snapshot.val()
for(i=0;i<stages_list.length;i++){
if(current[stages_list[i].name] != undefined){
temp = current[stages_list[i].name]

let  fcol = farbskala[Math.round(temp.usage/10)]

let col = farbskala[Math.min(10,Math.round(temp.density)*2)]
stages_list[i].geo.setStyle({
//   opacity:1,
fillOpacity:0.6,
fillColor: fcol,
color: col,
"weight": 3

})

/*
jetzt = new Date()
jetzte = jetzt.getTime()
if((jetzte - current[stages_list[i].name].zeit)>(1000*60*45)){
stages_list[i].geo.setStyle({color:"black",fillColor:"black",opacity:1})
}
*/
}

}
for (i=0;i<7;i++){
temp = current["parking lot "+ (i+1)].usage
parking_list.geo[i].setStyle({fillOpacity:temp/100})
parking_list.tooltip[i].setContent("parking lot "+ (i+1)+ " - " + temp + " %" )

}

for(i=0;i<medstations.length;i++){

medstations[i].geo.setTooltipContent(medstations[i].name +"<br>"+current["aid station "+(1+i)].usage + " / " +medstations[i].capacity+" patients")
temp = (current["aid station "+(1+i)].usage/medstations[i].capacity)
if(temp > 0.8)
{medstations[i].geo.setIcon(mediconring)
}else {medstations[i].geo.setIcon(medicon)

}
}
//select_area(set_area)
});



/*
swipes_arr = {
"1702643125700": {
"dicke": 5,
"meldender": "sandro",
"nach": {
"lat": 24.979989639468105,
"lng": 46.50658607482911
},
"von": {
"lat": 24.98224586763694,
"lng": 46.50873184204102
},
"zeit": 1702643125700
},
"1702645102728": {
"dicke": 10,
"meldender": "martin",
"nach": {
"lat": 24.993318938600222,
"lng": 46.51110649152543
},
"von": {
"lat": 24.992917005752865,
"lng": 46.51087760925293
},
"zeit": 1702645102728
},
"1702645125931": {
"dicke": 5,
"meldender": "martin",
"nach": {
"lat": 24.997267612217545,
"lng": 46.499139741802765
},
"von": {
"lat": 24.99801936367882,
"lng": 46.499220663790474
},
"zeit": 1702645125931
},
"1702645157894": {
"dicke": 10,
"meldender": "martin",
"nach": {
"lat": 24.99736845732333,
"lng": 46.49940779583645
},
"von": {
"lat": 24.997460134353403,
"lng": 46.49898801314813
},
"zeit": 1702645157894
},
"1702646633416": {
"dicke": 5,
"meldender": "marc",
"nach": {
"lat": 24.995114294353407,
"lng": 46.51402005813373
},
"von": {
"lat": 24.995908150534202,
"lng": 46.51431112357859
},
"zeit": 1702646633416
},
"1702647084524": {
"dicke": 10,
"meldender": "martin",
"nach": {
"lat": 24.997295115398273,
"lng": 46.49904364700744
},
"von": {
"lat": 24.997029251129963,
"lng": 46.5001057476478
},
"zeit": 1702647084524
},
"1702647113160": {
"dicke": 10,
"meldender": "martin",
"nach": {
"lat": 24.996941200654543,
"lng": 46.49882501723715
},
"von": {
"lat": 24.998188487949484,
"lng": 46.49906739316104
},
"zeit": 1702647113160
},
"1702647116813": {
"dicke": 10,
"meldender": "martin",
"nach": {
"lat": 24.997112470639987,
"lng": 46.49976165615841
},
"von": {
"lat": 24.99731352647193,
"lng": 46.499063285158265
},
"zeit": 1702647116813
},
"1702647273239": {
"dicke": 15,
"meldender": "anto",
"nach": {
"lat": 24.983801862945032,
"lng": 46.48864746093751
},
"von": {
"lat": 24.98419085869557,
"lng": 46.48658752441407
},
"zeit": 1702647273239
},
"1702647274398": {
"dicke": 5,
"meldender": "anto",
"nach": {
"lat": 24.9966380728667,
"lng": 46.47834777832032
},
"von": {
"lat": 24.998971785195316,
"lng": 46.478261947631836
},
"zeit": 1702647274398
},
"1702647275265": {
"dicke": 5,
"meldender": "anto",
"nach": {
"lat": 24.985980223297386,
"lng": 46.49105072021485
},
"von": {
"lat": 24.984113059643928,
"lng": 46.49173736572266
},
"zeit": 1702647275265
}
}

ref = database.ref('/soundstorm/swipes');

ref.on('value', (snapshot) => {

//movement_layer.clearLayers();
swipes_arr = snapshot.val()
a = new Date()
a =a.getTime()


if(swipes_arr != undefined)
{Object.keys(swipes_arr).forEach((key) => {
x = (a -swipes_arr[key].zeit )/1000 // x ist das alter des pfeiles in sekunden
if(swipes_arr[key].meldender == "sandro"||swipes_arr[key].meldender =="marcel"){y = 0}else{y=20} 
// die time to live ist 10 min bei pfeilen die ich eingemalt habe, else ist sie 20 sek
if((y-x)>8){

draw_arrow (swipes_arr[key].von,swipes_arr[key].nach,"green",swipes_arr[key].dicke,y-x,swipes_arr[key].meldender )
}

})}

})
*/

}
function initialise_map(){

// Karte und Hintergründe
mymap = L.map('map_div',{zoomSnap: 0.1, dragging: false,minZoom:14,maxZoom:20}).setView([24.99646971811259, 46.5075],16.3 )
if (overridedisplay9){ mymap.zoomControl.remove();}

// mymap.on('zoomend', function() {setviewzoom = mymap.getZoom()});
// mymap.on('moveend', function() { mapaa = (mymap.getCenter(),mymap.getCenter());setviewmap=[mapaa.lat,mapaa.lng]});



tl1= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{      
opacity: 0.5,      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'

})

var Jawg_Matrix =  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
subdomains: 'abcd',
maxZoom: 20
})

if(overridedisplay9){
  Jawg_Matrix.addTo(mymap);
}else{tl1.addTo(mymap)}
imageUrl ="./zeichnung.svg"

imageOverlay = L.imageOverlay(imageUrl, imageBounds);



//const imageUrl = './map1.png';
//const imageBounds = [ [25.013,46.4805],[24.988092848232725, 46.53216767460525]];

/*



const topLeft = [25.00084386674766, 46.49814964591205]; // Coordinates of the top-left corner
const topRight = [24.998247816188762, 46.518431895543]; // Coordinates of the top-right corner
const bottomLeft = [24.99492699889193, 46.49684178697793]; // Coordinates of the bottom-left corner
// 24.99218934000478, 46.51740754735572
imageOverlay = L.imageOverlay.rotated('./newmap.jpg', topLeft, topRight, bottomLeft).addTo(mymap);
*/




stages_layer = L.layerGroup().addTo(mymap)
green_layer = L.layerGroup().addTo(mymap)
eigensymbole_layer = L.layerGroup().addTo(mymap)
movement_layer = L.layerGroup().addTo(mymap)
parkinglot_layer = L.layerGroup().addTo(mymap)
zones_layer = L.layerGroup()
back_layer = L.layerGroup().addTo(mymap)
aidstations_layer = L.layerGroup().addTo(mymap)
// alles einmalen das keine Bühnen sind
for (f=0;f<parking_arr.length;f++)  {

let l = eval(parking_arr[f].layer)
let fx = f
let polygon = L.polygon(parking_arr[f].coords, {color: parking_arr[f].color})

parking_list.geo.push(polygon)
/*
polygon.on('click',function(){
current[parking_arr[fx].name].usage += 10
if (current[parking_arr[fx].name].usage > 100){current[parking_arr[fx].name].usage =0}
//  current[parking_arr[fx].name].usage = Math.min(current[parking_arr[fx].name].usage,100)
a = new Date()
databaseRef = database.ref('soundstorm').child('aktuell').child(parking_arr[fx].name);
  databaseRef.set({usage: current[parking_arr[fx].name].usage,zeit:a.getTime()})
    })

    */


polygon.addTo(l)

var tooltip = L.tooltip({permanent: true, direction: 'center'})
.setContent(parking_arr[f].name)
.setLatLng(polygon.getBounds().getCenter())
.addTo(l);
parking_list.tooltip.push(tooltip)

}


/*
var fullscreenButton = L.easyButton('fa-arrows-alt', function(btn, mymap){
mymap.toggleFullscreen();
}, 'Toggle Fullscreen');
fullscreenButton.addTo(mymap);
*/


for (f=0;f<inert_arr.length;f++)  {
let l = eval(inert_arr[f].layer)
let polygon = L.polygon(inert_arr[f].coords, {color: inert_arr[f].color}).bindTooltip(inert_arr[f].name).addTo(l)



}
for (f=0;f<medstations.length;f++) {medstations[f].geo = L.marker(medstations[f].coords,{icon:medicon}).bindTooltip(medstations[f].name)
//medstations[f].geo .on("mouserover",function(e){this.openPopup()})
medstations[f].geo.addTo(aidstations_layer)}
for (f=0;f<greening_arr.length;f++) {let fu = f;L.polygon(greening_arr[f].coords, {color: 'green', "weight": 1,"opacity": 0.65, "fillOpacity":0.5 }).bindTooltip(greening_arr[f].name).addTo(green_layer)}
for (f=0;f<restrooms.length;f++) {L.marker(restrooms[f],{icon:resticon}).addTo(green_layer)}
for (f=0;f<blocking_arr.length;f++) {let fu = f; L.polygon(blocking_arr[f].coords, {fillColor: "#748cad",color:"black", "weight": 1,"opacity": 1,fillOpacity:0.8}).bindTooltip(blocking_arr[f].name).addTo(green_layer)}

for (f=0;f<hinter.length;f++)       {let fu = f;L.polygon(hinter[f], {color: 'grey' ,"weight": 2,"fillOpacity": 0.65}).addTo(green_layer)}
for (f=0;f<vib_arr.length;f++)      {let fu = f;L.polygon(vib_arr[f].coords,{fillColor: '#6e737a',fillOpacity:1,color:"black",weight:1}).bindTooltip(vib_arr[f].name).addTo(green_layer)}

// Layercontroll
if(!overridedisplay9)
  {mymap.addControl(new L.Control.Fullscreen());
    L.control.layers(
      {"dark":Jawg_Matrix ,"light": tl1,"img": imageOverlay,"sat":Esri_WorldImagery},
      {"stages":stages_layer,"blocks":green_layer,"spotter+marker":eigensymbole_layer,"crowdflow" :movement_layer,
    "medical":aidstations_layer}).addTo(mymap);
      
  }
  //  "parking lots":parkinglot_layer,"op-zones":zones_layer
  

//ownmarker = L.marker(  [24.996,46.508]).addTo(mymap);

// Swipefunktion
let touchStartX, touchEndX;

mymap.on('click',function(e){

if(eventmarkertoggle == true){
  tcolor = "green"
  if(incident_toggle ==true){tcolor="red"; inciden_toggle = false}
jetzt = new Date()
  let eventloc = 
//   L.marker([e.latlng.lat,e.latlng.lng],{icon:eventicon}).addTo(mymap)
    userInput = prompt('describe marker:', '')
    if (userInput !== null) {
      randomNum = Math.floor(Math.random() * 9999) + 1;
    databaseRef = database.ref('soundstorm/SS24aux/day' + heutag + '/locations/marker');
      eigensymbole_arr.marker.push({
      ort: [e.latlng.lat, e.latlng.lng],
      text: userInput,
      meldender: set_name,
      zeige: true,
      farbe:tcolor,
      zeit:jetzt.getTime(),
      endzeit:jetzt.getTime()+(1000*60*5)
  });

  // Save the updated data back to Firebase, using the array index as the key
  databaseRef.set(eigensymbole_arr.marker);
    

    

    eventmarkertoggle = false


    

  
    
}
}}
)
mymap.getContainer().addEventListener("touchstart", function (e) {

touchStartX = e.touches[0].clientX;
touchStartY = e.touches[0].clientY;
start_time = new Date()
})

mymap.on('zoomlevelschange', function () {
// This event is triggered when the zoom level changes (e.g., button press)
// You can handle button press logic here
isZooming = true;
setTimeout(function () {
isZooming = false
}, 500);
});

mymap.on('zoomstart', function() {
isZooming = true;
});

mymap.on('zoomend', function() {
isZooming = false;
});


// hier werden die swipes aufgenommen und gespeichert in der firebase  
mymap.getContainer().addEventListener("touchend", function (e) {
  if(!isZooming ){
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    ort1 = mymap.containerPointToLatLng([touchStartX,touchStartY]);
    ort2 = mymap.containerPointToLatLng([touchEndX,touchEndY]);
    console.log("touchend")
    minmove = 0.0002
    maxmove = 0.002
    move = Math.abs(ort1.lat - ort2.lat) + Math.abs(ort1.lng - ort2.lng)
    end_date = new Date()   
    diff = Math.ceil((end_date.getTime()-start_time.getTime())/500)
    www = 5*diff
 
    if(move> minmove && move <maxmove && diff < 4){ 
      infotag.text("swipe reported. category:   "+ www/5)
  
      if (locked) {
        infotag.text('can not send swipes when -LOCKED-')
        console.log("swipe while locked")
        return;
        }
        else{
       
          ntemp = new Date()
          ntemp = ntemp.getTime()
          newEntry ={meldender:set_name,von:ort1, nach:ort2,zeit:parseInt(ntemp),endzeit:ntemp + (1000*60*5),dicke:www}
          swipes_arr.push(newEntry); // Add new entry to the array
      
          databaseRef =database.ref('soundstorm/SS24aux/day' + heutag + '/swipes')
          databaseRef.set(swipes_arr)
          }
    }
  }
})

// Bühnen einmalen
stages_geo=[]
for(i=0;i<stages_list.length;i++)
{if(stages_list[i].coords != "donotdraw"){
let zi =i 
f = L.polygon(stages_list[i].coords, {color: '#99ff66'}).bindTooltip(stages_list[i].name)
//.on('mouseover',function(){this.setStyle({color:"red"})})
.on('click',function(){
// this.setStyle({color:"green"})
set_area=zi;d3.select('#dropdown').property('value',zi)
select_area(zi)

}).addTo(stages_layer,{ bubblingMouseEvents: false })
stages_list[i].geo = f
}}



}
function interpolateUndefined(arr) {
const nonEmptyIndices = arr.reduce((indices, value, index) => {
if (value !== null && value !== undefined) {
  indices.push(index);
}
return indices;
}, []);

// If there are less than 2 non-empty entries, return the original array
if (nonEmptyIndices.length < 2) {
return arr;
}

// Interpolate values between non-empty entries
for (let i = nonEmptyIndices[0] + 1; i < nonEmptyIndices[nonEmptyIndices.length - 1]; i++) {
const startIndex = Math.max(...nonEmptyIndices.filter((idx) => idx < i));
const endIndex = Math.min(...nonEmptyIndices.filter((idx) => idx > i));

// Linear interpolation formula
arr[i] = arr[startIndex] + (arr[endIndex] - arr[startIndex]) * (i - startIndex) / (endIndex - startIndex);

}


vorher = true
nachher= false
for (k=0;k<arr.length;k++){
if(vorher == true && arr[k] != undefined){vorher=false}
if(vorher == false && arr[k] == undefined){nachher = true


  if(nachher = true){
    arr[k] =arr[k-1]
    
    arr[k+1] =arr[k-1]
    arr[k+2] =arr[k-1]
    break
  }
}


}



return arr;
}
function make_graphdata_counts(indata){
//die indaten sind ein array mit jeweils den obj zeit und usage
//outdata = new Array(52).fill(undefined)
bucket = new Array(53).fill(undefined)

temp = new Date(indata.zeit[0])
//indata.zeit[0] = temp.getTime()
//indata.usage[0] = 0 
temp = temp.setHours(12,0,0,0)

for (i=0;i<indata.zeit.length;i++){

entfernungzu15uhr = parseInt(Math.round((indata.zeit[i]-temp)/(15*60*1000)))
    
if(entfernungzu15uhr > -1 && entfernungzu15uhr<65){
if (bucket[entfernungzu15uhr] == undefined){bucket[entfernungzu15uhr] = [indata.in[i]]}
  else{bucket[entfernungzu15uhr].push(indata.in[i])}
}
}

// Function to calculate the average of an array using a for loop
function calculateAverageWithForLoop(array) {
if (!array || array.length === 0) {
  return undefined; // Return undefined for empty or undefined arrays
}

let sum = 0;
let count = 0;

for (let i = 0; i < array.length; i++) {
  if (typeof array[i] === 'number') {
    sum += array[i];
    count++;  
  }
}

if (count === 0) {
  return 0//undefined; // Return undefined if all elements were undefined
}

return Math.round(sum / count);
}

// Calculate averages for each sub-array using for loops
outdata = [];
for (let i = 0; i < bucket.length; i++) {
const subArray = bucket[i];
const average = calculateAverageWithForLoop(subArray);
outdata.push(average)[0];
}
outdata = interpolateUndefined(outdata)

return {in:outdata,zeit:generateTimeArray(temp)}

}
function make_graphdata(indata){
//die indaten sind ein array mit jeweils den obj zeit und usage
//outdata = new Array(52).fill(undefined)
bucket = new Array(53).fill(undefined)

temp = new Date(indata.zeit[0])
//indata.zeit[0] = temp.getTime()
//indata.usage[0] = 0 
temp = temp.setHours(12,0,0,0)

for (i=0;i<indata.zeit.length;i++){

entfernungzu15uhr = parseInt(Math.round((indata.zeit[i]-temp)/(15*60*1000)))


if(entfernungzu15uhr > -1 && entfernungzu15uhr<(graphbreiteinviertelstunden+1)){
if (bucket[entfernungzu15uhr] == undefined){bucket[entfernungzu15uhr] = [indata.usage[i]]}
else{bucket[entfernungzu15uhr].push(indata.usage[i])}
}
}

// Function to calculate the average of an array using a for loop
function calculateAverageWithForLoop(array) {
if (!array || array.length === 0) {
return undefined; // Return undefined for empty or undefined arrays
}

let sum = 0;
let count = 0;

for (let i = 0; i < array.length; i++) {
if (typeof array[i] === 'number') {
sum += array[i];
count++;  
}
}

if (count === 0) {
return 0//undefined; // Return undefined if all elements were undefined
}

return Math.round(sum / count);
}

// Calculate averages for each sub-array using for loops
outdata = [];
for (let i = 0; i < bucket.length; i++) {
const subArray = bucket[i];
const average = calculateAverageWithForLoop(subArray);
outdata.push(average)[0];
}
outdata = interpolateUndefined(outdata)

return {usage:outdata,zeit:generateTimeArray(temp)}

}
function generateTimeArray(startTime) {

const timeArray = [new Date(startTime)]; // Start with the provided time

for (let i = 1; i < 53; i++) {
const nextTime = new Date(timeArray[i - 1]);
nextTime.setMinutes(nextTime.getMinutes() + 15);
timeArray.push(nextTime);
}

return timeArray;
}
function addArrays(array1, array2) {
// Check if the arrays are of the same length
if (array1.length !== array2.length) {
throw new Error('Arrays must be of the same length');
}

// Create a new array to store the result
const resultArray = [];

// Loop through the arrays and add the values at each index
for (let i = 0; i < array1.length; i++) {
const sum = array1[i] - array2[i];
resultArray.push(sum);
}

return resultArray;
}
function make_graphdata_stages(indata,capacity,tager){

//die indaten sind ein array mit jeweils den obj zeit und usage
//outdata = new Array(52).fill(undefined)
bucket_tension = new Array(52).fill(undefined)
bucket_density = new Array(52).fill(undefined)
bucket_usage = new Array(52).fill(undefined)

temp = new Date(indata.zeit[0])
//indata.zeit[0] = temp.getTime()
//indata.usage[0] = 0 

temp = temp.setHours(12,0,0,0)

// der fixe wert capacity der in der stages_list manuelll vegeben wurde * die auslastung ergibt die anzahlen
// capacity =

for (i=0;i<indata.zeit.length;i++){

entfernungzu15uhr = parseInt(Math.round((indata.zeit[i]-temp)/(15*60*1000)))

if(entfernungzu15uhr > -1 && entfernungzu15uhr<(graphbreiteinviertelstunden+1)){

if (bucket_density[entfernungzu15uhr] == undefined){
bucket_density[entfernungzu15uhr] = [indata.density[i]]}
else{bucket_density[entfernungzu15uhr].push(indata.density[i])}

if (bucket_tension[entfernungzu15uhr] == undefined){
bucket_tension[entfernungzu15uhr] = [indata.tension[i]]}
  else{bucket_tension[entfernungzu15uhr].push(indata.tension[i])}

  if (bucket_usage[entfernungzu15uhr] == undefined){
  bucket_usage[entfernungzu15uhr] = [indata.usage[i]]}
    else{bucket_usage[entfernungzu15uhr].push(indata.usage[i])}


}
}

// Function to calculate the average of an array using a for loop
function calculateAverageWithForLoop(array) {
if (!array || array.length === 0) {
return undefined; // Return undefined for empty or undefined arrays
}

let sum = 0;
let count = 0;

for (let i = 0; i < array.length; i++) {
if (typeof array[i] === 'number') {
  sum += array[i];
  count++;  
}
}

if (count === 0) {
return 0//undefined; // Return undefined if all elements were undefined
}

return sum / count;
}

// Calculate averages for each sub-array using for loops
function bucky(bucket){  outdata = [];
for (let i = 0; i < bucket.length; i++) {
const subArray = bucket[i];
const average = calculateAverageWithForLoop(subArray);
outdata.push(average)[0];
}
return interpolateUndefined(outdata)
}

b
outdata = {density:bucky(bucket_density),usage:bucky(bucket_usage),tension:bucky(bucket_tension),zeit:generateTimeArray(temp)}

return outdata

}
function estimateProgression(originalObject,ruck) {

xzeit=originalObject.zeit[originalObject.zeit.length-1]
xusage =originalObject.usage[originalObject.usage.length-1]

progressions_arr = {zeit:[],usage:[]}

steigung = (xusage - originalObject.usage[originalObject.usage.length-(ruck+1)])
zeitdelta = (xzeit - originalObject.zeit[originalObject.zeit.length-(ruck+1)])

// Estimate values for the next 3 hours (12 steps)
for(i=0;i<2;i++)
{  progressions_arr.zeit.push(xzeit + zeitdelta*i*ruck)
progressions_arr.usage.push(xusage + steigung*i*ruck)
}
return progressions_arr;
}
function removeEmptyEntries(object) {
const { zeit, usage } = object;

// Start iterating from the end of the arrays
for (let i = zeit.length - 1; i >= 0; i--) {
// Check if the corresponding value is not empty (customize this condition)
if (usage[i] !== undefined && usage[i] !== null && usage[i] !== '') {
  // Remove empty entries from the right side
  object.zeit = zeit.slice(0, i + 1);
  object.usage = usage.slice(0, i + 1);
  return object;
}
}

// If all entries are empty, return an empty object or handle accordingly
return { zeit: [], usage: [] };
}
function writeReportToFirebase() {
  
console.log(set_area)
  d3.select('#lock').style('background-color',"yellow")
  
  if (locked || set_name == "demo" || deviceversion != fireversion) {
    infotag.text('can not send reports or swipes when -LOCKED-')
    return;
  }else{
const database = firebase.database();

  databaseRef = database.ref('soundstorm/SS24/day'+heutag).child(stages_list[set_area].name).child("zeit");
              databaseRef.transaction(function(currentArray) {
              currentArray = currentArray || [];
              currentArray.push(jetzt.getTime()); //!!!!!!!!!!!!!!!!!!!!!!!! das hier ist fingiert für demo
              
        return currentArray;
             });
      
  databaseRef = database.ref('soundstorm/SS24/day'+heutag).child(stages_list[set_area].name).child("usage");
              databaseRef.transaction(function(currentArray) {
              currentArray = currentArray || [];
             currentArray.push(parseInt(set_usage));
             setTimeout(function (){d3.select('#lock').style('background-color',"green")},500)
              return currentArray;
             });

             databaseRef = database.ref('soundstorm/SS24/day'+heutag).child(stages_list[set_area].name).child("tension");
              databaseRef.transaction(function(currentArray) {
              currentArray = currentArray || [];
             currentArray.push(parseInt(set_tens));
              return currentArray;
             });
             databaseRef = database.ref('soundstorm/SS24/day'+heutag).child(stages_list[set_area].name).child("density");
              databaseRef.transaction(function(currentArray) {
              currentArray = currentArray || [];
             currentArray.push(parseInt(set_dens));
              return currentArray;
             });
             databaseRef = database.ref('soundstorm/SS24/day'+heutag).child(stages_list[set_area].name).child("meldender");
              databaseRef.transaction(function(currentArray) {
              currentArray = currentArray || [];
             currentArray.push(set_name);
              return currentArray;
             });
             databaseRef = database.ref('soundstorm/SS24/day'+heutag).child(stages_list[set_area].name).child("position");
              databaseRef.transaction(function(currentArray) {
              currentArray = currentArray || [];
             currentArray.push(set_pos);
              return currentArray;
             });




             //if (infotag) infotag.text("report sent");

 

  

/*

     // Push the data to the database
      databaseRef.push(dataToWrite)
        .then(() => {
          console.log("Data was successfully written to the Firebase database.");
        })
        .catch((error) => {
          console.error("Error writing data to the Firebase database:", error);
          infotag.text("no connection!!")
        });

        d3.select('#infotag').text('status: report sent at '+ jetzt.getHours()+":"+jetzt.getMinutes()+":"+jetzt.getSeconds())
*/
        // hier wird versucht zusätzlich einen report über die aktuelle alge zusammenzustellen

       
        databaseRef = database.ref('soundstorm').child('aktuell').child(stages_list[set_area].name);
        databaseRef.set({zeit:jetzt.getTime(), density: set_dens, tension: set_tens,  usage: set_usage})

      }
    }


    setTimeout(function() {
      mymap.invalidateSize();
  }, 500);


function draw_marker(){
  eigensymbole_layer.clearLayers()
  if(realtime == true){drawjetzt = new Date().getTime();puffer =0}else{drawjetzt=settim;puffer = (1000*60*7)}
  
                        

for(let ip=0;ip<eigensymbole_arr.marker.length;ip++)
 {   
          if(eigensymbole_arr.marker[ip].endzeit+puffer > drawjetzt && eigensymbole_arr.marker[ip].zeit-puffer < drawjetzt ){
           


                    if(eigensymbole_arr.marker[ip].farbe =="red"){tempico=redicon}else{tempico = greenicon}
                    let tempmarker = L.marker(eigensymbole_arr.marker[ip].ort,{icon:tempico}).bindTooltip(eigensymbole_arr.marker[ip].text+ " - " +  getTimeOfDay (eigensymbole_arr.marker[ip].zeit)).addTo(eigensymbole_layer)//,
                    tempmarker.openTooltip()
                    tempmarker.on('click', function() {
              
                   
                      tempmarker.remove()
             
                  //    eigensymbole_arr.marker[ip].zeige = false
                     eigensymbole_arr.marker[ip].endzeit = drawjetzt
                    //console.log(eigensymbole_arr)
                    databaseRef = database.ref('soundstorm/SS24aux/day' + heutag + '/locations/marker');
                    databaseRef.set(eigensymbole_arr.marker)
                  })
                
                  
        }
}


 Object.keys(eigensymbole_arr.spotter).forEach(key => {

  let tempmarker = L.marker(eigensymbole_arr.spotter[key].ort).bindTooltip(eigensymbole_arr.spotter[key].name).addTo(eigensymbole_layer)//,
  tempmarker.on('click', function() {
   tempmarker.remove()
 
 // }}
 })
});



}




  /*
ww =[]
for (f=0;f< zones_arr.length;f++){

  ww.push({name:zones_arr[f][0],color:zones_arr[f][1],coords:polystrtoco(zones_arr[f][2]) })

}



function polystrtoco (d){
  ///                                       --------------- mit dieser funktion werden die polygon strings in coordinaten umgewandelt
  d = d.slice(8)
  d = d.slice(0,-1)
  d = d.split(", ")
  for (i=0;i<d.length;i++){d[i] = d[i].split(" ")}
  for (i=0;i<d.length;i++){d[i]=[  d[i][1]*yauslpp +25.0074,  d[i][0]*xauslpp +46.49160088116361 ]}
  return d
  }

xauslpp =   (46.513899054271185-46.49160088116361  )/508.48//574
yauslpp = -   (24.99899094193483- 24.995559147406844)/86.33//113
// events


*/
function getTimeOfDay(milliseconds) {
  const date = new Date(milliseconds);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}


// Version
