d3WordCloudWidget <- function(text, size, tooltip = FALSE, color = "#EEEEEE",
                         textColor = "#333333", width = NULL, height = NULL) {
  
  # forward options using x
  x = data.frame(
    text = text,
    size = size,
    tooltip = tooltip,
    color = color,
    textColor = textColor
  )
  
  # create widget
  htmlwidgets::createWidget(
    name = 'd3WordCloudWidget',
    x,
    width = width,
    height = height,
    package = 'd3WordCloudWidget',
    sizingPolicy = sizingPolicy(
      defaultWidth = 600,
      defaultHeight = 600
    )
  )
}


d3WordCloudWidgetOutput <- function(outputId, width = '600px', height = '600px'){
  shinyWidgetOutput(outputId, 'd3WordCloudWidget', width, height, package = 'd3WordCloudWidget')
}

renderd3WordCloudWidget <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, d3WordCloudWidgetOutput, env, quoted = TRUE)
}