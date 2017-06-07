
chart.push(function(div, data){
 
 	 var parseDate = d3.time.format("%d-%b-%y").parse;
	  data.forEach(function(d) {
	    d.date = parseDate(d.date);
	    d.close.price = Number(d.close.price)
	    d.close2.price = Number(d.close2.price)
	    d.close3.price = Number(d.close3.price)

	    d.portfolios = d.portfolios.map(function(f){

	    	return {Price:Number(f.Price), name: f.name}

	    })

	  });


	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;


	var x = d3.time.scale()
	    .range([0, width])
	    .domain(d3.extent(data, function(d) { 
	    	return d.date; }));

	var y = d3.scale.linear()
	    .range([height, 0])
		.domain([0, d3.max(data, function(d) { return d.close.price+d.close2.price+d.close3.price; })]);
	
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
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	    .on("click", click);

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)


	  //get the stacks
	  stacksData = d3.keys(data[0]).filter(function(d){ return (d!=="date" && d!=="portfolios") })

	  //stack
	  var stacks = d3.layout.stack()
	  	.offset("")
      .values(function(d) { return d.values; })(
		  	//layers
		  	stacksData.map(function(d, i) {
		  	    return {
		  	        name: d,
		  	        values: data.map(function(da, i) {
		  	            return {
		  	                date: data[i].date,
		  	                portfolio: da[d].portfolio,
		  	                y: da[d].price
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


// Number 2

	  //get the stacks
 	  stacksData = d3.keys(data[0].portfolios).map(function(d){
		  return {key:d, name: data[0].portfolios[d].name}
	  })
	  //stack
	  var stacks2 = d3.layout.stack()
	  	.offset("")
      .values(function(d) { return d.values; })(
		  	//layers
		  	stacksData.map(function(d, i) {
		  	    return {
		  	        name: d.name,
		  	        values: data.map(function(da, i) {
		  	            return {
		  	                date: data[i].date,
		  	                portfolio: da.portfolios[d.key].name,
		  	                y: da.portfolios[d.key].Price
		  	            }
		  	        })
		  	    }
		  	})
	  	);

  var browser = svg.selectAll(".stacks2")
      .data(stacks2)
      .enter().append("g")
      .attr("class", "browser");

  browser.append("path")
      .attr("class", "area")
      .attr("d", function(d) { 
      	return area(d.values); 
      })
      .style("fill", function(d, i) { return color(i+10); })
      .on("mouseover", function() {
      	d3.select(this).style("opacity","0");
      })
      .on("mouseleave", function() {
      	d3.select(this).style("opacity","");
      });

    var values = data
    var b = browser
  // On click, update the x-axis.
  function click() {
    var n = values.length - 1,
        //i = Math.floor(Math.random() * n / 2),
        //j = i + Math.floor(Math.random() * n / 2) + 1;
        i=0
        j= Math.random()>.5? n:n-1;
    x.domain([values[i].date, values[j].date]);
    var t = svg.transition().duration(750);
    t.select(".x.axis").call(xAxis);
    t.selectAll(".area").attr("d", function(d) { 
      	return area(d.values); 
      });
    //t.select(".line").attr("d", line(values));
  }

});