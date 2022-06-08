<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>D3: Loading GeoJSON data and generating SVG paths</title>
		<script src="https://d3js.org/d3.v4.min.js"></script>
		<style type="text/css">
			/* No style rules here yet */		
		</style>
	</head>
	<body>
		<script type="text/javascript">

			//Width and height
			var s = 4
			var w = 720*s;
			var h = 1080*s;
			
			var lon = -78.8787;
			var lat = 42.88;

			//Define path generator, using the Albers USA projection
			//var path = d3.geoPath().projection(d3.geoTransverseMercator().fitSize([w,h], json));

			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			var census_tract = "https://data.buffalony.gov/resource/9f79-wnbd.json";

			//Load in GeoJSON data
			d3.json("https://data.buffalony.gov/resource/9f79-wnbd.geojson", function(json) {
				var path = d3.geoPath()
				 		 .projection(d3.geoMercator().center([lon,lat]).fitSize([w,h], json));
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
				   .attr("fill", function(d) {
					   return "rgb(0, 0, " + (d.length) + ")";
				   })
				   .attr("stroke", "red")
				   .attr("stroke-width", function(d){
					   return d.length;
					   console.log(d);
				   });
					
				   
				var muh = json.features;
				console.log(json.features);
		
			});
			
			d3.selectAll("path")
      .on("click", function(){
          d3.select(this)
            .style("background-color", "orange");

          // Get current event info
          console.log(d3.event);
          
          // Get x & y co-ordinates
          console.log(d3.mouse(this));
      })
      .on("mouseout", function(){
          d3.select(this)
            .style("background-color", "steelblue")
      });
		</script>
	</body>
</html>
