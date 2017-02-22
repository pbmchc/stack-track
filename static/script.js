window.onload = function () {
    generateUserInterface();
    Chart.defaults.global.legend.display = false;
}

function generateUserInterface(pages) {
    pages = pages || 1
    urls = [
      { url: "https://stack-track.herokuapp.com/stack/api/v1.0/questions?pages=" + pages, name: "questions" },
      { url: "https://stack-track.herokuapp.com/stack/api/v1.0/jobs?pages=" + pages, name: "jobs" },
      { url: "https://stack-track.herokuapp.com/stack/api/v1.0/jobs/poland?pages=" + pages, name: "jobsPoland" }
    ];

    urls.forEach(function (item, index) {
        loadData(item.url, item.name, index);
        /*setTimeout(function () {
            mockData(index, item.name);
        }, 3000*index);*/
        
    });
}


function mockData(index, name) {
    var labels = [];
    var values = [];
    for (var i = 10; i >= 1; i--) {
        labels.push(i);
        values.push(i);
    }
    document.getElementsByClassName('loader')[index].style.display = 'none';
    generateChart(labels, values, name);
    drawPieChart(labels, values, name);
}

function loadData(url, name, index) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var labels = [];
            var values = [];
            document.getElementsByClassName('loader')[index].style.display = 'none';
            document.getElementsByTagName('section')[index].style.backgroundColor = 'white';
            JSON.parse(this.responseText).forEach(function (tag) {
                labels.push(tag.name);
                values.push(tag.occurrences);
            });
            generateChart(labels, values, name);
            drawPieChart(labels, values, name);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send(); 
}

function generateColors(color) {
    var colors = [];
    colors.push(color);

    for (var i = 1; i < 10; i++) {
        var newColor = color.replace("0", 36 * i);
        colors.push(newColor);
    }
    return colors;
}

function generateChart(labels, values, name) {
    var ctx = document.getElementById(name + "Bar");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'tags',
                data: values,
                backgroundColor: generateColors("hsl(0, 68%, 68%)"),
                hoverBackgroundColor: generateColors("hsl(0, 58%, 58%)")
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function drawPieChart(labels, values, name) {
    var ctx = document.getElementById(name + "Pie");
    var data = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: generateColors("hsl(0, 68%, 68%)"),
                hoverBackgroundColor: generateColors("hsl(0, 58%, 58%)")
            }]
    };
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            elements: {
                arc: {
                    borderColor: "#FFFFFF"
                }
            }
        }
    });
}