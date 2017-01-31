HTMLWidgets.widget({

  name: 'd3WordCloudWidget',

  type: 'output',
  
  renderOnNullValue: true,

  initialize: function(el, width, height) {

  var svg;
  //word cloud layout 
  var cloud = d3.layout.cloud().size([width, height])
      .padding(5);
  var svg = d3.select(el).append("svg")
        .attr("class", "d3WordCloudWidget");
        
    return {
      svg: svg,
      d3WordCloudWidget: cloud
    }

  },

  renderValue: function(el, x, instance) {
    var fill = d3.scale.category20();
   
   
    function draws(words) {
    svg = instance.svg;
    wordCloudGraph=svg.attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate("+width/2+","+height/2+")")
      .selectAll("text")
      .data(words);
        
    var words=wordCloudGraph.enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
     //   .style("font-size", "20px")
        .style("font-family", "Arial")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
       
        
		.on("click", function(d) { 
            console.log("Selected words:"+d.text);  
			if (typeof Shiny != 'undefined') {
			Shiny.onInputChange('d3word',d.text) }
		});
		
      words.on({
      "mouseover": function(d) {
        d3.select(this).style("cursor", "pointer")
      },
      "mouseout": function(d) {
        d3.select(this).style("cursor", "default")
      }
    });
		
  }
   


    // Retrieve our svg and bubble objects that were created in
    // the initialize method above

	//svg.remove(); //clearing old stuffs
     if (instance.lastValue !== undefined) {
        instance.svg.remove();
        console.log('Clearing svg');
	 var svg = d3.select(el).append("svg")
        .attr("class", "d3WordCloudWidget");
	instance.svg = svg;
         
    }
    
    
        var svg = instance.svg;
        var cloud = instance.d3WordCloudWidget;

    // Resize our svg element and bubble layout according to the
    // size of the actual DOM element
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    svg.attr("width", width).attr("height", height);
    var df = HTMLWidgets.dataframeToD3(x);
    maxFreq=df[0].size;
    s = d3.scale.linear().domain([1,maxFreq]).range([10, 90]);
    cloud = d3.layout.cloud().size([width, height])
              .words(df)
              .padding(1)
              .rotate(function() { return ~~(Math.random() * 2) * 0; })
               .text(function(d) { return d.text; })
              .font("Impact")
              .fontSize(function(d) { return (d.size); })
          
              .on("end", draws)
              .start();
 //   cloud.size([width, height])
 //     .words(df)
 //     .rotate(function() { return ~~(Math.random() * 2) * 90; })
 //     .font("Impact")
 //     .fontSize(function(d) { return s(d.size); })
 //     .on("end", draws)
 //     .start();
     // Store the current value so we can easily call renderValue
    // from the resize method below, which doesn't give us an x
    // value
    instance.lastValue = x;
  
  },

  resize: function(el, width, height, instance) {
    // Re-render the previous value, if any
    if (instance.lastValue) {
      this.renderValue(el, instance.lastValue, instance);
    }
  }

});