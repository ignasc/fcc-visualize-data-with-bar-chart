/*Load dataset from*/
/*https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json*/

document.addEventListener('DOMContentLoaded', function(){

    const req = new XMLHttpRequest();
    req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
    req.send();
    req.onload = function(){
    const jsonGDP = JSON.parse(req.responseText);

    /*for constructing html element to be "put" in root div (DEBUG)*/
    let html = "test";
    
    
    document.getElementById('root').innerHTML = html;

    const dataSet = [...jsonGDP.data]/*create separate array for data*/


    console.log(dataSet.length);

    
    
    const w = 500;
    const h = 500;
    const padding = 60;
    
    const xScale = d3.scaleLinear()
           .domain([0, dataSet.length])
           .range([padding, w - padding]);
    
    const yScale = d3.scaleLinear()
           .domain([0, d3.max(dataSet, (d)=>d[1])])
           .range([h - padding, padding]);
    
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
    
    svg.selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr("x", (d, index) => xScale(index))
    .attr("y",(d) => yScale(d[1]))
    .attr("width", 5)
    .attr("height", h);
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);
    
    svg.append("g")
    .attr("transform","translate(" + padding + ",0)")
    .call(yAxis)
    
    };
  });


