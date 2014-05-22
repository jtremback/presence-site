
chart.push(function(div, data){
 
 	 var parseDate = d3.time.format("%d-%b-%y").parse;
	  data.forEach(function(d) {
	    d.date = parseDate(d.date);
	    d.close = Number(d.close)
	    d.close2 = Number(d.close)
	    d.close3 = Number(d.close)
	  });


	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;


	var x = d3.time.scale()
	    .range([0, width])
	    .domain(d3.extent(data, function(d) { return d.date; }));

	var y = d3.scale.linear()
	    .range([height, 0])
		.domain([0, d3.max(data, function(d) { return d.close+d.close2+d.close3; })]);
	
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");



	var svg = d3.select(div).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)


	  //get the stacks
	  stacksData = d3.keys(data[0]).filter(function(d){ return d!=="date"})

	  //stack
	  var stacks = d3.layout.stack()
      .values(function(d) { return d.values; })(
	  	//layers
	  	stacksData.map(function(d, i) {
	  	    return {
	  	        name: d,
	  	        values: data.map(function(da, i) {
	  	            return {
	  	                date: data[i].date,
	  	                y: da[d]
	  	            }
	  	        })
	  	    }



	  	})



	  	);



  // var area = d3.svg.area()
  //     .x(function(d) { return x(d.date); })
  //     .y0(height)
  //     .y1(function(d) { return y(d.close); });


  var area = d3.svg.area()
      .x(function(d) { return x(d.date); })
      .y0(function(d) { 
      	return y(d.y0); })
      .y1(function(d) { 
      	return y(d.y0 + d.y); });



  var browser = svg.selectAll(".stacks")
      .data(stacks)
    	.enter().append("g")
      .attr("class", "browser");


		var color = d3.scale.category20();

  browser.append("path")
      .attr("class", "area")
      .attr("d", function(d) { 
      	return area(d.values); 
      })
      .style("fill", function(d, i) { return color(i); });
	  // svg.append("path")
	  //     .datum(data)
	  //     .attr("class", "area")
	  //     .attr("d", area);


});