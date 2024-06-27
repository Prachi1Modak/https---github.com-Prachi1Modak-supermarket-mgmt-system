// // salesReport.js

// // JavaScript function to generate sales trends report
// function generateSalesTrendsReport() {
//     var startDate = document.getElementById("start_date").value;
//     var endDate = document.getElementById("end_date").value;

//     // AJAX call to the server to fetch the sales trends report
//     $.ajax({
//         url: '/generateSalesTrendsReport', // Change the URL to your server-side script
//         type: 'POST',
//         data: {
//             start_date: startDate,
//             end_date: endDate
//         },
//         success: function(response) {
//             // Check if the response is empty or not
//             if (typeof response === 'string' && response.trim() !== "") {
//                 // Update the sales report output div with the fetched report
//                 $("#sales-report-output").html(response);
//             } else {
//                 // If no data available, display a message
//                 $("#sales-report-output").html("<p>No data available for the selected period.</p>");
//             }
//         },
//         error: function(xhr, status, error) {
//             console.error(xhr.responseText);
//             // If an error occurs, display an error message
//             $("#sales-report-output").html("<p>Error occurred while generating the report. Please try again later.</p>");
//         }
//     });
// }



$(document).ready(function(){
    // Handle click event for menu items
    $(".nav-tab").click(function(){
        // Hide other pages
        $(".w3-main").hide();
        // Show the corresponding page
        var tab = $(this).attr('class').split(' ')[2]; // Get the class name
        $("." + tab + "div").show();
    });

    // Handle click event for Sales Trends Report menu
    $(".sales-trends-menu").click(function(){
        // Hide other pages
        $(".w3-main").hide();
        // Show Sales Trends Report page
        $(".sales-trends-page").show();
    });
});

// // JavaScript function to generate sales trends report
// function generateSalesTrendsReport() {
//     var startDate = document.getElementById("start_date").value;
//     var endDate = document.getElementById("end_date").value;

//     console.log("Start Date:", startDate);
//     console.log("End Date:", endDate);

//     // AJAX call to the server to fetch the sales trends report
//     $.ajax({
//         url: '/generateSalesTrendsReport', // Change the URL to your server-side script
//         type: 'POST',
//         data: {
//             start_date: startDate,
//             end_date: endDate
//         },
//         success: function(response) {
//             // Check if the response is empty or not
//             if (typeof response === 'string' && response.trim() !== "") {
//                 // Update the sales report output div with the fetched report
//                 $("#sales-report-output").html(response);
//             } else {
//                 alert('No data available for the selected period.');
//             }
//         },
//         error: function(xhr, status, error) {
//             console.error(xhr.responseText);
//             alert('Error occurred while generating the report. Please check the console for more information.');
//         }
//     });
// }


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("generate-report-btn").addEventListener("click", generateSalesTrendsReport);
});


// JavaScript function to generate sales trends report
function generateSalesTrendsReport() {
    console.log("Generating sales trends report...");
    var startDate = document.getElementById("start_date").value;
    var endDate = document.getElementById("end_date").value;

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    // AJAX call to the server to fetch the sales trends report
    $.ajax({
        url: '/generateSalesTrendsReport', // Change the URL to your server-side script
        type: 'POST',
        data: {
            start_date: startDate,
            end_date: endDate
        },
        success: function(response) {
            console.log("Response:", response); // Log the response to see what's returned
            // Check if the response is empty or not
            if (typeof response === 'string' && response.trim() !== "") {
                // Update the sales report output div with the fetched report
                $("#sales-report-output").html(response);
            } else {
                alert('No data available for the selected period.');
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
            alert('Error occurred while generating the report. Please check the console for more information.');
        }
    });
}
