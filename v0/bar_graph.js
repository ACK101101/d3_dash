// Set up the SVG element
const svg = d3.select("#chart");
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;
const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the CSV file and group the data by Race and Attorney
d3.csv("data.csv", function(data) {
  const groupedData = d3.group(data, d => d.Race, d => d.Gender);
  // Create an array of objects with the Race, Att type, and the count
  const attData = Array.from(groupedData, ([raceKey, raceValue]) => {
    const attValues = Array.from(raceValue, ([attKey, attValue]) => ({ Att: raceKey, Count: attValue.length }));
    return { Race: raceKey, Att: attValues };
  });

  // Flatten the array of att data
  const flattenedData = attData.flatMap(d => d.Att);

  // Set up the x and y scales
  const x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1).domain(flattenedData.map(d => d.Att));
  const y = d3.scaleLinear().rangeRound([height, 0]).domain([0, d3.max(flattenedData, d => d.Count)]);

  // const groupedData = d3.group(data, d => d.Race, d => d.Final_Plead_Sentence_Min_Prison_mths);
  // console.log(groupedData)
  // const x = d3
  //   .scaleBand()
  //   .domain(d => d.Race)
  //   .rangeRound([0, width])
  //   .padding(0.1);
  // const y = d3.scaleLinear().rangeRound([height, 0]).domain([0, d3.max(data, d => d.Final_Plead_Sentence_Min_Prison_mths)]);

  // Add the x and y axes
  g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
  g.append("g").call(d3.axisLeft(y));

  // Add the bars
  g.selectAll(".bar")
    .data(flattenedData)
    // .data(groupedData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.Att))
    .attr("y", d => y(d.Count))
    // .attr("x", d => x(d.Race))
    // .attr("y", d => y(d.Final_Plead_Sentence_Min_Prison_mths))
    .attr("width", x.bandwidth())
    .transition()
    .duration(1000)
    .attr("height", d => height - y(d.Count))
    .attr("fill", "#69b3a2");

  //   // Add labels

});

