console.log ("Ya estamos otra vez en D3")
d3.json ("jeisoncovid.js").then (function (datos){
    
    console.log ("Ya he cargado correctamente los datos")
    
    
    var height = 700
    var width = 500
    
    var margin = {
        top: 60,
        botton: 40,
        left: 100,
        right: 50     

    }
    
    var escalaX = d3.scaleLinear()
        .domain ([6800,23000])
        //.range (["25","475"])
        .range ([0 + margin.left, width - margin.right])
    
    
    var escalaY = d3.scaleLinear()
        .domain (d3.extent(datos, d=> d.people_vaccinated_per_hundred))
        //.range (["700","0"])
        //  .range (["675","25"])
        .range ([height-margin.botton, 0 + margin.top])
    
    /*var escalaColor = d3.scaleLinear()
        .domain ([185,6000])
        .range (["blue", "red"])*/
    
    // prueba color
    
    /*var dato1 = ["Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Peru", "Paraguay", "Suriname", "Uruguay", "Venezuela"]*/
    
    var dato2= d3.values(datos, d=> d.location);
    
    
    var myColor = d3.scaleOrdinal().domain(dato2)
  .range(["gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"])
    
    var escalatamanio = d3.scaleLinear ()
        .domain (d3.extent(datos, d=> d.total_deaths_per_million))
        .range ([8,30])
    
    var elementoSVG = d3.select ("body")
        .append ("svg")
        .attr ("width", width)
        .attr ("height", height)

    elementoSVG
        .selectAll ("circle")
        .data(datos)
        .enter()
        .append ("circle")
        
        
        //.attr("r",15)
        .attr ("r", d =>escalatamanio(d.total_deaths_per_million))
    
        //.attr ("cx", d=>d.mediaAutoubicacion)
        .attr("cx",d => escalaX(d.gdp_per_capita))
        .attr("cy", d=> escalaY(d.people_vaccinated_per_hundred))
        //.attr("fill", "red")
        .attr("fill", d => myColor(d.location))


        //LLAMA A LA FUNCION QUE PINTA LA SEGUNDA GRAFICA
        //.on("click", d => pintarHistograma(d.partido))
        //.on("mouseover", d => pintarHistograma(d.partido))
        .on ("mouseover", d => {
               pintarTooltip (d)
        })
        .on ("mouseout", borrarTooltip)
    
  

    
    
    
    
    
    //// EJES
    // VISUALIZAMOS EJE Y
    var ejeY = d3.axisLeft (escalaY)
    
    // PINTAR eje y
    elementoSVG
        .append("g")
        .attr ("transform", "translate (" + margin.left + ",0)")
        .call (ejeY)
    
    
    
    
    /// VISUALIZAMOS EJE X
    var ejeX = d3.axisBottom (escalaX)
    // PONER TICKS
        .ticks (5)
        .tickFormat (d3.format(".3s"))
    
    // PINTAR eje X
    elementoSVG
        .append("g")
        .attr ("transform", "translate (0," + (height - margin.botton/2) + ")")
        .call (ejeX)
    
    //// EJES
    
    /////TOOLTIP
    
         var tooltip = d3.select ("body")
        .append("div")
        .attr("class","tooltip")
     
     //BORRAR TOOLTIP
     function borrarTooltip(){
         tooltip    
           // .transition()
            .style("opacity",0)         
     }
    
    //PINTAR TOOLTIP
    function pintarTooltip(d){
        tooltip
            //.text (d.partido)
            .text(d.iso_code + " -*- " + d.total_deaths_per_million)
            .style ("top", d3.event.pageY + "px")  // TçE DA LA POSICION DONDE SE HA PRODUCIDO EL EVENTO
            .style ("left", d3.event.pageX + "px")
            // PARA QUE LA APRICION DEL TOOLTIP NO SEA BRUSCA
           //.transition()
            .style("opacity",1)
        
    }
    
    
    
})