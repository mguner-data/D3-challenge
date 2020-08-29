// Setting variable for height and width for ease of calculations
var svgHeight = 600;
var svgWidth = 850;

// Define the chart's margins as an object
var chartMargin = {
    top: 20,
    right: 20,
    bottom: 60,
    left: 100
  };

// Define dimensions of the chart area
var width = svgWidth - chartMargin.left - chartMargin.right;
var height = svgHeight - chartMargin.top - chartMargin.bottom;

// Append an SVG wrapper to the page and set a variable equal to a reference to it
var svg = d3.select("#scatter")
  .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

  // Read csv data

d3.csv('/assets/data/data.csv').then(function (csvData) {
        console.log(csvData);
        csvData.forEach(function(data){
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare
        })

   
// Create a scale for your independent (x) coordinates
const xScale = d3.scaleLinear()
.domain([d3.min(csvData, d=>d.poverty)*.95,d3.max(csvData, d=>d.poverty)])
.range([0,width]);

// Create a scale for your dependent (y) coordinates
const yScale = d3.scaleLinear()
.domain([d3.min(csvData, d=>d.healthcare)*.85, d3.max(csvData, d=>d.healthcare)])
.range([height, 0]);

// Use bottomAxis and leftAxis to create the chart's axes using the passed in scales.
var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);

    // append x axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "18px")
        .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
        .style("font-size", "18px")
        .call(leftAxis);

  // Create Circles
  // ==============================
  const circlesGroup = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "violet")
    .attr("opacity", ".3");

    const textGroup = chartGroup.selectAll("text.abbr")
    .data(csvData)
    .enter()
    .append("text")
    .attr("class","abbr")
    .attr("x", d => xScale(d.poverty)-5)
    .attr("y", d => yScale(d.healthcare)+2)
    .attr("opacity","0.5")
    .text(d=>d.abbr)

// Create axes labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - chartMargin.left + 40)
.attr("x", 0 - (height / 2)-100)
.attr("dy", "1em")
.attr("class", "axisText")
.text("Lacks Healthcare (%)");

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + chartMargin.top+30})`)
.attr("class", "axisText")
.text("In Poverty (%)");
}).catch(function (error) {
console.log(error);


});