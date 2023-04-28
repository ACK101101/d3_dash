var tableState = false;

function printTable() {
    var tableContainer = d3.select("#tableContainer");

    if (tableState) {
        tableContainer.selectAll("table").remove();
        tableState = false;
    }
    else {
        var table = d3.csv("data.csv", function(data) {
            const table = d3.select("#tableContainer").append("table");

            // Add table headers
            table.append("thead").append("tr")
                .selectAll("th")
                .data(Object.keys(data[0]))
                .enter()
                .append("th")
                .text(function(d) { return d; });

            // Add table rows and data
            table.append("tbody")
                .selectAll("tr")
                .data(data)
                .enter()
                .append("tr")
                .selectAll("td")
                .data(function(d) { return Object.values(d); })
                .enter()
                .append("td")
                .text(function(d) { return d; });
            
            return table;
        });
        tableState = true;
    }   
}