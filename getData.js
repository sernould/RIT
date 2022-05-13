const props = ['genstory:affect','genstory:actant','genstory:evenement','genstory:lieu','genstory:object'];
let arrElemStory = []; 
d3.json("https://genstory.jardindesconnaissances.fr/files/original/0b5592ef87ccd96e00cc82eaf8ed5f54a407ec11.json").then((data) => {
    console.log(data);
        //console.log(data);
        props.forEach(p=>{
            arrElemStory[p] = data.layers.filter(l=>l.class["o:term"]==p);
            showElemStory(p);
        })
});
function showElemStory(p){
    //get alea ElemeStory
    let idES = d3.randomInt(arrElemStory[p].length-1)();	
    let rdmES = arrElemStory[p][idES];
    switch (p) {
        case 'genstory:lieu':
            appendImage(rdmES);
            break;
        case 'genstory:actant':
            appendImage(rdmES);
            break;
        case 'genstory:evenement':         
            appendText(rdmES);
            break;      
    }
}

function appendImage(es){
    let c = es.class["o:label"];

    d3.select('body').selectAll('.'+c)
        .data([es])
        .join(
          enter => enter.append("img")
              .attr("class", c)
              .attr("src", d => d.source.thumbnail_display_urls.medium)
              .on('click',changeStory),
          update => update.attr("src", d => d.source.thumbnail_display_urls.medium),
          exit => exit.remove()
        );        
}
function changeStory(e,d){
    //showElemStory(d.class["o:term"]);
    props.forEach(p=>{
        showElemStory(p);
    });
}

function appendText(es){
    let c = es.class["o:label"];

    d3.select('body').selectAll('.'+c)
        .data([es])
        .join(
          enter => enter.append("div")
              .attr("class", c)
              .text(d => d.source['o:title']),
          update => update.text(d => d.source["o:title"]),
          exit => exit.remove()
        );        
}

/*   

    let layout = d3.select('body').selectAll('div').data(data.layers).enter().append('div');

    initActant();


    function getStoryElt(data, type)
    {
        let f = data.values.filter( v => {
            return v["genstory:" + type]
        });
        let m = f.map(act => 
        {
            return act["genstory:" + type][0]
            //return act["genstory:" + type]
        });
        console.log(m.length ? m : []);
        return m.length ? m : [];
    }
    
    function clickActant(e, d){
        console.log(d)
    }

    function initActant()
    {
        layout.selectAll('img').data(d => getStoryElt(d, "hasLieu")).enter().append("img")
        .attr('class','actant')
        .attr("src", d => {
            return d.thumbnail_display_urls.large
        })
        .on('click',clickActant);
    }
*/
