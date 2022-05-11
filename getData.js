d3.json("data.json").then((data) => {
    console.log(data);

    /*
    data.layers.forEach(l => {
        console.log(l.name);
    });
    */

    d3.select('body').selectAll('div').data(data.layers).enter().append('H1').text(l => l.name);
});
