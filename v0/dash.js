import * as d3 from 'd3';

// Set the dimensions and margins of the chart
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Parse the data and create a new array of objects
d3.csv("data.csv", function(error, data) {
  if (error) throw error;
  
  var dataset = data.map(function(d) {
    return { race: d.defendant_race, type: d.attorney_type };
  });

  // Define the scales
  var xScale = d3.scaleBand()
    .domain(dataset.map(function(d) { return d.race; }))
    .range([0, width])
    .padding(0.1);

  var yScale = d3.scaleBand()
    .domain(dataset.map(function(d) { return d.type; }))
    .range([height, 0])
    .padding(0.1);

  // Create the chart
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add the data points
  svg.selectAll("rect")
    .data(dataset)
    .enter().append("rect")
    .attr("x", function(d) { return xScale(d.race); })
    .attr("y", function(d) { return yScale(d.type); })
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", function(d) {
      if (d.type == "Public Defender") { return "blue"; }
      else if (d.type == "Private Attorney") { return "red"; }
      else { return "gray"; }
    });

  // Add the x-axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  // Add the y-axis
  svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale));
});
