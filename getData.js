d3.json("https://genstory.jardindesconnaissances.fr/files/original/0b5592ef87ccd96e00cc82eaf8ed5f54a407ec11.json").then((data) => {
    console.log(data);

    /*
    data.layers.forEach(l => {
        console.log(l.name);
    });
    */

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

    //hasLieu
});