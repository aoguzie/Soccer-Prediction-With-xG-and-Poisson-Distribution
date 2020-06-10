     $(document).ready(function () {
         // date parsing
         var today = moment().format("YYYY-MM-DD");
         var past7 = moment().subtract(7, 'days').format("YYYY-MM-DD");
         var next7 = moment().add(7, 'days').format("YYYY-MM-DD");
         var next14 = moment().add(14, 'days').format("YYYY-MM-DD");
         var next21 = moment().add(21, 'days').format("YYYY-MM-DD");
         var next28 = moment().add(28, 'days').format("YYYY-MM-DD");

        //  Sort Card items
        $(".tab-content div.card").sort( function (a,b) {
            return $(a).find("span.league").text() > $(b).find("span.league").text();
        }).appendTo(".card");
        //  apply css here
        $("p:contains(&#128085;)").css({"font-size": "large"})
         // ajax begin (Wk1)
         $.ajax({
            //  url: "js/spi_matches.csv",
              url: "https://projects.fivethirtyeight.com/soccer-api/club/spi_matches.csv",
             cache: true,
             async: true,
            //  dataType: 'csv',
             xhr: function () {
                 var xhr = $.ajaxSettings.xhr();
                 xhr.onprogress = function (e) {
                     if (e.lengthComputable) {
                         var lPerc = e.loaded / e.total;
                         $("#lPerc").html(Math.round(lPerc * 100)+'%');
                         //console.log(Math.round(lPerc * 100)+'%');
                     }
                 }
                 return xhr;
             },
             error: function () {
                 $('#loading').html('<p class="nerror">An error has occurred</p><p class="icon icon-info rsh">&nbsp Pull to refresh</p>');
             },
             success: function (csvdata) {
                 var items = $.csv.toObjects(csvdata);
                 var jsonobject = JSON.stringify(items);
                 var matches = JSON.parse(jsonobject).filter(({
                     date
                 }) => date >= past7 && date <= next7);
                 // console.log(matches);
                 var html1 = '';
                 var $loading = $('#loading').hide();
                 //Attach the event handler to any element
                 $(document)
                     .ajaxStart(function () {
                         //ajax request went so show the loading image
                         $loading.show();
                     })
                     .ajaxStop(function () {
                         //got response so hide the loading image
                         $loading.hide();
                     });

                 $.each(matches, function (key, item) {
                     var xg1 = item.proj_score1;
                     var xg2 = item.proj_score2;
                     //    Algoritm
                     function sum(input) {
                         if (toString.call(input) !== "[object Array]")
                             return false;
                         var total = 0;
                         for (var i = 0; i < input.length; i++) {
                             if (isNaN(input[i])) {
                                 continue;
                             }
                             total += Number(input[i]);
                         }
                         return total;
                     }
                     var poisson = function (x, lambda) {
                         var e = 2.718;
                         var a = Math.pow(lambda, x);
                         var b = Math.pow(e, (lambda * -1));
                         var c = factorial(x);
                         // this weird thing is just to keep decimal and float value
                         return parseFloat(((a * b) / c).toFixed(3));
                     };
                     // Yeah, you'll need factorial to do this
                     var factorial = function (n) {
                         if (n < 0) {
                             return -1;
                         } else if (n == 0) {
                             return 1;
                         } else {
                             return n * factorial(n - 1);
                         }
                     };
                     // Home wins
                     var homeWin = ((poisson(1, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100)
                     );
                     // awayWins
                     var awayWin = ((poisson(1, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100)
                     );
                     //   Draws
                     var draw = ((poisson(0, xg1) * poisson(0, xg2) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100)
                     );
                     // Over 1.5
                     var over1 = (
                         (poisson(2, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(2, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100)
                     );
                     // Over 2.5
                     var over2 = (
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100)
                     );
                     // Over 3.5
                     var over3 = (
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100)
                     );
                     // Over 4.5
                     var over4 = (
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100)
                     );
                     // BTTS
                     var btts = (
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100));
                     var odd1 = math.divide(100, homeWin).toFixed(2);
                     var odd2 = math.divide(100, awayWin).toFixed(2);
                     var oddx = math.divide(100, draw).toFixed(2);
                     var onex = 100 / (math.multiply(odd1, oddx) / math.add(odd1, oddx));
                     var one2 = 100 / (math.multiply(odd1, odd2) / math.add(odd1, odd2));
                     var ex2 = 100 / (math.multiply(oddx, odd2) / math.add(oddx, odd2));
                     // Win Tip
                     var wTip = Math.max(onex, one2, ex2);
                     var winTip;
                     switch (wTip) {
                         case onex:
                             winTip = "Home/Draw";
                             break;
                         case one2:
                             winTip = "Home/Away";
                             break;
                         case ex2:
                             winTip = "Draw/Away";
                             break;
                     }
                     // console.log (wTip);
                     // O/U Goal tips
                     var gTip = Math.max(over1, over2, over3, over4, 100 - over1, 100 - over2, 100 - over3, 100 - over4);
                     var goalTip;
                     switch (gTip) {
                         case over1:
                             goalTip = "Over 1.5";
                             break;
                         case over2:
                             goalTip = "Over 2.5";
                             break;
                         case over3:
                             goalTip = "Over 3.5";
                             break;
                         case over4:
                             goalTip = "Over 4.5";
                             break;
                         case 100 - over1:
                             goalTip = "Under 1.5";
                             break;
                         case 100 - over2:
                             goalTip = "Under 2.5";
                             break;
                         case 100 - over3:
                             goalTip = "Under 3.5";
                             break;
                         case 100 - over4:
                             goalTip = "Under 4.5";
                             break;
                     }
                     // Ranks (Home)
                     var spiRnk1 = Math.round(item.spi1);
                     var spiCat1 = function (spiRnk1) {
                         if (spiRnk1 >= 85) {
                             return ("Elite");
                         } else if (spiRnk1 >= 80 && spiRnk1 <= 84) {
                             return ("Very Strong");
                         } else if (spiRnk1 >= 75 && spiRnk1 <= 79) {
                             return ("Strong");
                         } else if (spiRnk1 >= 70 && spiRnk1 <= 74) {
                             return ("Good");
                         } else if (spiRnk1 >= 60 && spiRnk1 <= 69) {
                             return ("Competitive");
                         } else if (spiRnk1 >= 50 && spiRnk1 <= 59) {
                             return ("Marginal");
                         } else if (spiRnk1 >= 25 && spiRnk1 <= 49) {
                             return ("Weak");
                         } else if (spiRnk1 >= 0 && spiRnk1 <= 24) {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     // Ranks (Away)
                     var spiRnk2 = Math.round(item.spi2);
                     var spiCat2 = function (spiRnk2) {
                         if (spiRnk2 >= 85) {
                             return ("Elite");
                         } else if (spiRnk2 >= 80 && spiRnk2 <= 84) {
                             return ("Very Strong");
                         } else if (spiRnk2 >= 75 && spiRnk2 <= 79) {
                             return ("Strong");
                         } else if (spiRnk2 >= 70 && spiRnk2 <= 74) {
                             return ("Good");
                         } else if (spiRnk2 >= 60 && spiRnk2 <= 69) {
                             return ("Competitive");
                         } else if (spiRnk2 >= 50 && spiRnk2 <= 59) {
                             return ("Marginal");
                         } else if (spiRnk2 >= 25 && spiRnk2 <= 49) {
                             return ("Weak");
                         } else if (spiRnk2 >= 0 && spiRnk2 <= 24) {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     // Country Flags
                     var lgname = (item.league);
                     var crFlag = function (lgname) {
                         if (lgname = "French Ligue 1") {
                             return ("U+1F1F7");
                         } else if (lgname = "Barclays Premier League") {
                             return ("U+1F1E7");
                         } else if (lgname = "Spanish Primera Division") {
                             return ("U+1F1F8");
                         } else if (lgname = "Italy Serie A") {
                             return ("U+1F1F9");
                         } else if (lgname = "UEFA Champions League") {
                             return ("UEFA");
                         } else if (lgname = "German Bundesliga") {
                             return ("U+1F1EA");
                         } else if (lgname = "Australian A-League") {
                             return ("U+1F1FA");
                         } else if (lgname = "English League Two") {
                             return ("U+1F1E7");
                         } else if (lgname = "English League Championship") {
                             return ("U+1F1E7");
                         } else if (lgname = "English League One") {
                             return ("U+1F1E7");
                         } else if (lgname = "Portuguese Liga") {
                             return ("U+1F1F9");
                         } else if (lgname = "Mexican Primera Division Torneo Clausura") {
                             return ("U+1F1FD");
                         } else if (lgname = "South African ABSA Premier League") {
                             return ("U+1F1E6");
                         } else if (lgname = "Spanish Segunda Division") {
                             return ("U+1F1F8");
                         } else if (lgname = "French Ligue 2") {
                             return ("U+1F1F7");
                         } else if (lgname = "Greek Super League") {
                             return ("U+1F1F7");
                         } else if (lgname = "Dutch Eredivisie") {
                             return ("U+1F1F0");
                         } else if (lgname = "Belgian Jupiler League") {
                             return ("U+1F1EA");
                         } else if (lgname = "Italy Serie B") {
                             return ("U+1F1F9");
                         } else if (lgname = "Turkish Turkcell Super Lig") {
                             return ("Very Weak");
                         } else if (lgname = "Scottish Premiership") {
                             return ("Very Weak");
                         } else if (lgname = "Argentina Primera Division") {
                             return ("U+1F1F7");
                         } else if (lgname = "German 2. Bundesliga") {
                             return ("Very Weak");
                         } else if (lgname = "Swiss Raiffeisen Super League") {
                             return ("Very Weak");
                         } else if (lgname = "Danish SAS-Ligaen") {
                             return ("Very Weak");
                         } else if (lgname = "Japanese J League") {
                             return ("Very Weak");
                         } else if (lgname = "Chinese Super League") {
                             return ("Very Weak");
                         } else if (lgname = "Austrian T-Mobile Bundesliga") {
                             return ("Very Weak");
                         } else if (lgname = "Major League Soccer") {
                             return ("Very Weak");
                         } else if (lgname = "United Soccer League") {
                             return ("Very Weak");
                         } else if (lgname = "Russian Premier Liga") {
                             return ("Very Weak");
                         } else if (lgname = "UEFA Europa League") {
                             return ("Very Weak");
                         } else if (lgname = "Norwegian Tippeligaen") {
                             return ("Very Weak");
                         } else if (lgname = "Swedish Allsvenskan") {
                             return ("Very Weak");
                         } else if (lgname = "Brasileiro SÃ©rie A") {
                             return ("Very Weak");
                         } else if (lgname = "National Women's Soccer League") {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     var hpCat = spiCat1(spiRnk1);
                     var apCat = spiCat2(spiRnk2);
                     var flg = crFlag(lgname);
                     html1 += '<div class="card">';
                     html1 += '<ul class="list">';
                     html1 += '<li class="divider" style="border-bottom: 2px solid #0e83ca";>' + '<span class="phone-9 tablet-9 column league">' + '&#127942;&nbsp;' + item.league + '</span>' + '<span class="phone-3 tablet-3 column" style="text-align: end;">' + moment(item.date).format("MMM Do YYYY") + '</span>' + '</li>';
                     html1 += '<li>';
                     html1 += '<span class="phone-4 tablet-6 column htname">' + '&#128085;&nbsp;&nbsp;' + item.team1 + '</span>' + '<span class="phone-4 tablet-6 column"  style="text-align: center;font-weight: bold;color: #333;">' + Math.round(item.score1) + ":" + Math.round(item.score2) + '</span>' + '<span class="phone-4 tablet-6 column atname" style="text-align: end;">' + item.team2 +  '&nbsp;&nbsp;&#128085;' +'</span>';
                     html1 += '</li>';
                     html1 += '<li class="table-view-cell sit small chart">';
                     html1 += '<div class="block">' + '<div class="gauge">' + (homeWin).toFixed(2) + '%' + '</div>' + '</div>';
                     html1 += '<div class="block">' + '<div class="gauge">' + (draw).toFixed(2)  + '%' + '</div>' + '</div>';
                     html1 += '<div class="block">' + '<div class="gauge">' + (awayWin).toFixed(2)  + '%' + '</div>' + '</div>';
                     html1 += '</li>';
                     html1 += '<li>';
                     html1 += '<span class="phone-4 tablet-6 column  hteam">' + 'Home:&nbsp;' + odd1 + '</span>' + '<span class="phone-4 tablet-6 column "  style="text-align: center;">' + 'Draw:&nbsp;' + oddx + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'Away:&nbsp;' + odd2 + '</span>';
                     html1 += '</li>';
                     html1 += '<li>';
                     html1 += '<span class="phone-4 tablet-6 column  hteam">' + 'Home/Draw:&nbsp;' + (100 / onex).toFixed(2) + '</span>' + '<span class="phone-4 tablet-6 column "  style="text-align: center;">' + 'Home/Away:&nbsp;' + (100 / one2).toFixed(2) + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'Draw/Away:&nbsp;' + (100 / ex2).toFixed(2) + '</span>';
                     html1 += '</li>';
                     html1 += '<li>';
                     html1 += '<span class="phone-6 tablet-6 column hteam">' + '&#128170;&nbsp;' + item.spi1 + '&nbsp;' + hpCat + '</span>' + '<span class="phone-6 tablet-6 column ateam" style="text-align: end;">' + apCat + ' &nbsp;' + item.spi2 + '&nbsp;&#128170;' + '</span>';
                     html1 += '</li>';
                     html1 += '<li>';
                    //  html1 += '<span class="phone-4 tablet-6 column hteam">' + '&#128293;&nbsp;' + item.importance1 + '&nbsp; Passion' + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'Passion &nbsp;' + item.importance2 + '&nbsp;&#128293;' + '</span>';
                     html1 += '</li>';
                     html1 += '<li>';
                     html1 += '<span class="phone-4 tablet-6 column hteam">' + '&#9917;&nbsp;' + xg1 + '&nbsp; xG' + '</span>' + '<span class="phone-4 tablet-6 column" style="text-align: center;color: #333;font-weight: light;border: 2px solid #0e83ca;border-radius: 10px;">' + 'Correct Score: &nbsp;' + Math.round(xg1) + ":" + Math.round(xg2) + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'xG &nbsp;' + xg2 + '&nbsp;&#9917;' + '</span>';
                     html1 += '</li>';
                     html1 += '</ul>';
                     html1 += '<table class="table">';
                     html1 += '<tr>';
                     html1 += '<thead>';
                     html1 += '<th class="over">' + 'Ovr 1.5: &nbsp;' + Math.round(over1) + "%" + '</th>';
                     html1 += '<th class="over">' + 'Ovr 2.5: &nbsp;' + Math.round(over2) + "%" + '</th>';
                     html1 += '<th class="over">' + 'Ovr 3.5: &nbsp;' + Math.round(over3) + "%" + '</th>';
                     html1 += '<th class="over">' + 'Ovr 4.5: &nbsp;' + Math.round(over4) + "%" + '</th>';
                     html1 += '<th class="over">' + 'BTS Yes: &nbsp;' + Math.round(btts) + "%" + '</th>';
                     html1 += '</thead>';
                     html1 += '</tr>';
                     html1 += '<tbody>';
                     html1 += '<tr>';
                     html1 += '<td class="under">' + 'Und 1.5: &nbsp;' + Math.round(100 - over1) + "%" + '</td>';
                     html1 += '<td class="under">' + 'Und 2.5: &nbsp;' + Math.round(100 - over2) + "%" + '</td>';
                     html1 += '<td class="under">' + 'Und 3.5: &nbsp;' + Math.round(100 - over3) + "%" + '</td>';
                     html1 += '<td class="under">' + 'Und 4.5: &nbsp;' + Math.round(100 - over4) + "%" + '</td>';
                     html1 += '<td class="under">' + 'BTS No:&nbsp;  ' + Math.round(100 - btts) + "%" + '</td>';
                     html1 += '</tr>';
                     html1 += '</tbody>';
                     html1 += '</table>';
                     html1 += '</div>';
                     //    html
                 });
                 $('#wk1').html(html1);
             },
             dataType: "text",
             complete: function () {
                 $('.gauge').each(function () {
                     var text = $(this).text();
                     $(this).parent().width(text);
                 });
                 $('.pwm').each(function () {
                     var text = $(this).text();
                     $(this).parent().width(text);
                 });
                 PullToRefresh.init({
                     mainElement: '#ptr',
                     onRefresh: function () {
                         window.location.reload();
                     }
                 });
             }
         });
         // ajax begin (Wk2)
         $.ajax({
            //  url: "js/spi_matches.csv",
             url: "https://projects.fivethirtyeight.com/soccer-api/club/spi_matches.csv",
             cache: true,
             async: true,
            //  dataType: 'csv',
             xhr: function () {
                 var xhr = $.ajaxSettings.xhr();
                 xhr.onprogress = function (e) {
                     if (e.lengthComputable) {
                         var lPerc = e.loaded / e.total;
                        //  console.log(Math.round(lPerc * 100));
                     }
                 }
                 return xhr;
             },
             error: function () {
                 $('#loading').html('<p class="nerror">An error has occurred</p><p class="icon icon-info rsh">&nbsp Pull to refresh</p>');
             },
             success: function (csvdata) {
                 var items = $.csv.toObjects(csvdata);
                 var jsonobject = JSON.stringify(items);
                 var matches = JSON.parse(jsonobject).filter(({
                     date
                 }) => date > next7 && date <= next14);
                 var html2 = '';
                 var $loading = $('#loading').hide();
                 //Attach the event handler to any element
                 $(document)
                     .ajaxStart(function () {
                         //ajax request went so show the loading image
                         $loading.show();
                     })
                     .ajaxStop(function () {
                         //got response so hide the loading image
                         $loading.hide();
                     });
                 $.each(matches, function (key, item) {
                     var xg1 = item.proj_score1;
                     var xg2 = item.proj_score2;
                     //    Algoritm
                     function sum(input) {
                         if (toString.call(input) !== "[object Array]")
                             return false;
                         var total = 0;
                         for (var i = 0; i < input.length; i++) {
                             if (isNaN(input[i])) {
                                 continue;
                             }
                             total += Number(input[i]);
                         }
                         return total;
                     }
                     var poisson = function (x, lambda) {
                         var e = 2.718;
                         var a = Math.pow(lambda, x);
                         var b = Math.pow(e, (lambda * -1));
                         var c = factorial(x);
                         // this weird thing is just to keep decimal and float value
                         return parseFloat(((a * b) / c).toFixed(3));
                     };
                     // Yeah, you'll need factorial to do this
                     var factorial = function (n) {
                         if (n < 0) {
                             return -1;
                         } else if (n == 0) {
                             return 1;
                         } else {
                             return n * factorial(n - 1);
                         }
                     };
                     // Home wins
                     var homeWin = ((poisson(1, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100));
                     // awayWins
                     var awayWin = ((poisson(1, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     //   Draws
                     var draw = ((poisson(0, xg1) * poisson(0, xg2) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100));
                     // Over 1.5
                     var over1 = (
                         (poisson(2, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(2, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     // Over 2.5
                     var over2 = (
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     // Over 3.5
                     var over3 = (
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     // Over 4.5
                     var over4 = (
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     // BTTS
                     var btts = (
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100));
                     var odd1 = math.divide(100, homeWin).toFixed(2);
                     var odd2 = math.divide(100, awayWin).toFixed(2);
                     var oddx = math.divide(100, draw).toFixed(2);
                     var onex = 100 / (math.multiply(odd1, oddx) / math.add(odd1, oddx));
                     var one2 = 100 / (math.multiply(odd1, odd2) / math.add(odd1, odd2));
                     var ex2 = 100 / (math.multiply(oddx, odd2) / math.add(oddx, odd2));
                     // Win Tip
                     var wTip = Math.max(onex, one2, ex2);
                     var winTip;
                     switch (wTip) {
                         case onex:
                             winTip = "Home/Draw";
                             break;
                         case one2:
                             winTip = "Home/Away";
                             break;
                         case ex2:
                             winTip = "Draw/Away";
                             break;
                     }
                     // console.log (wTip);
                     // O/U Goal tips
                     var gTip = Math.max(over1, over2, over3, over4, 100 - over1, 100 - over2, 100 - over3, 100 - over4);
                     var goalTip;
                     switch (gTip) {
                         case over1:
                             goalTip = "Over 1.5";
                             break;
                         case over2:
                             goalTip = "Over 2.5";
                             break;
                         case over3:
                             goalTip = "Over 3.5";
                             break;
                         case over4:
                             goalTip = "Over 4.5";
                             break;
                         case 100 - over1:
                             goalTip = "Under 1.5";
                             break;
                         case 100 - over2:
                             goalTip = "Under 2.5";
                             break;
                         case 100 - over3:
                             goalTip = "Under 3.5";
                             break;
                         case 100 - over4:
                             goalTip = "Under 4.5";
                             break;
                     }
                     // Ranks (Home)
                     var spiRnk1 = Math.round(item.spi1);
                     var spiCat1 = function (spiRnk1) {
                         if (spiRnk1 >= 85) {
                             return ("Elite");
                         } else if (spiRnk1 >= 80 && spiRnk1 <= 84) {
                             return ("Very Strong");
                         } else if (spiRnk1 >= 75 && spiRnk1 <= 79) {
                             return ("Strong");
                         } else if (spiRnk1 >= 70 && spiRnk1 <= 74) {
                             return ("Good");
                         } else if (spiRnk1 >= 60 && spiRnk1 <= 69) {
                             return ("Competitive");
                         } else if (spiRnk1 >= 50 && spiRnk1 <= 59) {
                             return ("Marginal");
                         } else if (spiRnk1 >= 25 && spiRnk1 <= 49) {
                             return ("Weak");
                         } else if (spiRnk1 >= 0 && spiRnk1 <= 24) {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     // Ranks (Away)
                     var spiRnk2 = Math.round(item.spi2);
                     var spiCat2 = function (spiRnk2) {
                         if (spiRnk2 >= 85) {
                             return ("Elite");
                         } else if (spiRnk2 >= 80 && spiRnk2 <= 84) {
                             return ("Very Strong");
                         } else if (spiRnk2 >= 75 && spiRnk2 <= 79) {
                             return ("Strong");
                         } else if (spiRnk2 >= 70 && spiRnk2 <= 74) {
                             return ("Good");
                         } else if (spiRnk2 >= 60 && spiRnk2 <= 69) {
                             return ("Competitive");
                         } else if (spiRnk2 >= 50 && spiRnk2 <= 59) {
                             return ("Marginal");
                         } else if (spiRnk2 >= 25 && spiRnk2 <= 49) {
                             return ("Weak");
                         } else if (spiRnk2 >= 0 && spiRnk2 <= 24) {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     // Country Flags
                     var lgname = (item.league);
                     var crFlag = function (lgname) {
                         if (lgname = "French Ligue 1") {
                             return ("U+1F1F7");
                         } else if (lgname = "Barclays Premier League") {
                             return ("U+1F1E7");
                         } else if (lgname = "Spanish Primera Division") {
                             return ("U+1F1F8");
                         } else if (lgname = "Italy Serie A") {
                             return ("U+1F1F9");
                         } else if (lgname = "UEFA Champions League") {
                             return ("UEFA");
                         } else if (lgname = "German Bundesliga") {
                             return ("U+1F1EA");
                         } else if (lgname = "Australian A-League") {
                             return ("U+1F1FA");
                         } else if (lgname = "English League Two") {
                             return ("U+1F1E7");
                         } else if (lgname = "English League Championship") {
                             return ("U+1F1E7");
                         } else if (lgname = "English League One") {
                             return ("U+1F1E7");
                         } else if (lgname = "Portuguese Liga") {
                             return ("U+1F1F9");
                         } else if (lgname = "Mexican Primera Division Torneo Clausura") {
                             return ("U+1F1FD");
                         } else if (lgname = "South African ABSA Premier League") {
                             return ("U+1F1E6");
                         } else if (lgname = "Spanish Segunda Division") {
                             return ("U+1F1F8");
                         } else if (lgname = "French Ligue 2") {
                             return ("U+1F1F7");
                         } else if (lgname = "Greek Super League") {
                             return ("U+1F1F7");
                         } else if (lgname = "Dutch Eredivisie") {
                             return ("U+1F1F0");
                         } else if (lgname = "Belgian Jupiler League") {
                             return ("U+1F1EA");
                         } else if (lgname = "Italy Serie B") {
                             return ("U+1F1F9");
                         } else if (lgname = "Turkish Turkcell Super Lig") {
                             return ("Very Weak");
                         } else if (lgname = "Scottish Premiership") {
                             return ("Very Weak");
                         } else if (lgname = "Argentina Primera Division") {
                             return ("U+1F1F7");
                         } else if (lgname = "German 2. Bundesliga") {
                             return ("Very Weak");
                         } else if (lgname = "Swiss Raiffeisen Super League") {
                             return ("Very Weak");
                         } else if (lgname = "Danish SAS-Ligaen") {
                             return ("Very Weak");
                         } else if (lgname = "Japanese J League") {
                             return ("Very Weak");
                         } else if (lgname = "Chinese Super League") {
                             return ("Very Weak");
                         } else if (lgname = "Austrian T-Mobile Bundesliga") {
                             return ("Very Weak");
                         } else if (lgname = "Major League Soccer") {
                             return ("Very Weak");
                         } else if (lgname = "United Soccer League") {
                             return ("Very Weak");
                         } else if (lgname = "Russian Premier Liga") {
                             return ("Very Weak");
                         } else if (lgname = "UEFA Europa League") {
                             return ("Very Weak");
                         } else if (lgname = "Norwegian Tippeligaen") {
                             return ("Very Weak");
                         } else if (lgname = "Swedish Allsvenskan") {
                             return ("Very Weak");
                         } else if (lgname = "Brasileiro SÃ©rie A") {
                             return ("Very Weak");
                         } else if (lgname = "National Women's Soccer League") {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     var hpCat = spiCat1(spiRnk1);
                     var apCat = spiCat2(spiRnk2);
                     //
                     html2 += '<div class="card">';
                     html2 += '<ul class="list">';
                     html2 += '<li class="divider" style="border-bottom: 2px solid #0e83ca";>' + '<span class="phone-9 tablet-9 column league">' + '&#127942;&nbsp;' + item.league + '</span>' + '<span class="phone-3 tablet-3 column" style="text-align: end;">' + moment(item.date).format("MMM Do YYYY") + '</span>' + '</li>';
                     html2 += '<li>';
                     html2 += '<span class="phone-4 tablet-6 column htname">' + '&#128085;&nbsp;&nbsp;' + item.team1 + '</span>' + '<span class="phone-4 tablet-6 column"  style="text-align: center;font-weight: bold;color: #333;">' + Math.round(item.score1) + ":" + Math.round(item.score2) + '</span>' + '<span class="phone-4 tablet-6 column atname" style="text-align: end;">' + item.team2 +  '&nbsp;&nbsp;&#128085;' +'</span>';
                     html2 += '</li>';
                     html2 += '<li class="table-view-cell sit small chart">';
                     html2 += '<div class="block">' + '<div class="gauge">' + Math.round(homeWin) + '%' + '</div>' + '</div>';
                     html2 += '<div class="block">' + '<div class="gauge">' + Math.round(draw) + '%' + '</div>' + '</div>';
                     html2 += '<div class="block">' + '<div class="gauge">' + Math.round(awayWin) + '%' + '</div>' + '</div>';
                     html2 += '</li>';
                     html2 += '<li>';
                     html2 += '<span class="phone-4 tablet-6 column hteam">' + 'Home:&nbsp;' + odd1 + '</span>' + '<span class="phone-4 tablet-6 column "  style="text-align: center;">' + 'Draw:&nbsp;' + oddx + '</span>' + '<span class="phone-4 tablet-6 column  ateam" style="text-align: end;">' + 'Away:&nbsp;' + odd2 + '</span>';
                     html2 += '</li>';
                     html2 += '<li>';
                     html2 += '<span class="phone-4 tablet-6 column hteam">' + 'Home/Draw:&nbsp;' + (100 / onex).toFixed(2) + '</span>' + '<span class="phone-4 tablet-6 column  ateam"  style="text-align: center;">' + 'Home/Away:&nbsp;' + (100 / one2).toFixed(2) + '</span>' + '<span class="phone-4 tablet-6 column  ateam" style="text-align: end;">' + 'Draw/Away:&nbsp;' + (100 / ex2).toFixed(2) + '</span>';
                     html2 += '</li>';
                     html2 += '<li>';
                     html2 += '<span class="phone-6 tablet-6 column hteam">' + '&#128170;&nbsp;' + item.spi1 + '&nbsp;' + hpCat + '</span>' + '<span class="phone-6 tablet-6 column ateam" style="text-align: end;">' + apCat + ' &nbsp;' + item.spi2 + '&nbsp;&#128170;' + '</span>';
                     html2 += '</li>';
                     html2 += '<li>';
                    //  html2 += '<span class="phone-4 tablet-6 column hteam">' + '&#128293;&nbsp;' + item.importance1 + '&nbsp; Passion' + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'Passion &nbsp;' + item.importance2 + '&nbsp;&#128293;' + '</span>';
                     html2 += '</li>';
                     html2 += '<li>';
                     html2 += '<span class="phone-4 tablet-6 column hteam">' + '&#9917;&nbsp;' + xg1 + '&nbsp; xG' + '</span>' + '<span class="phone-4 tablet-6 column" style="text-align: center;color: #333;font-weight: light;border: 2px solid #0e83ca;border-radius: 10px;">' + 'Correct Score: &nbsp;' + Math.round(xg1) + ":" + Math.round(xg2) + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'xG &nbsp;' + xg2 + '&nbsp;&#9917;' + '</span>';
                     html2 += '</li>';
                     html2 += '</ul>';
                     html2 += '<table class="table">';
                     html2 += '<tr>';
                     html2 += '<thead>';
                     html2 += '<th class="over">' + 'Ovr 1.5: &nbsp;' + Math.round(over1) + "%" + '</th>';
                     html2 += '<th class="over">' + 'Ovr 2.5: &nbsp;' + Math.round(over2) + "%" + '</th>';
                     html2 += '<th class="over">' + 'Ovr 3.5: &nbsp;' + Math.round(over3) + "%" + '</th>';
                     html2 += '<th class="over">' + 'Ovr 4.5: &nbsp;' + Math.round(over4) + "%" + '</th>';
                     html2 += '<th class="over">' + 'BTS Yes: &nbsp;' + Math.round(btts) + "%" + '</th>';
                     html2 += '</thead>';
                     html2 += '</tr>';
                     html2 += '<tbody>';
                     html2 += '<tr>';
                     html2 += '<td class="under">' + 'Und 1.5: &nbsp;' + Math.round(100 - over1) + "%" + '</td>';
                     html2 += '<td class="under">' + 'Und 2.5: &nbsp;' + Math.round(100 - over2) + "%" + '</td>';
                     html2 += '<td class="under">' + 'Und 3.5: &nbsp;' + Math.round(100 - over3) + "%" + '</td>';
                     html2 += '<td class="under">' + 'Und 4.5: &nbsp;' + Math.round(100 - over4) + "%" + '</td>';
                     html2 += '<td class="under">' + 'BTS No:&nbsp;  ' + Math.round(100 - btts) + "%" + '</td>';
                     html2 += '</tr>';
                     html2 += '</tbody>';
                     html2 += '</table>';
                     html2 += '</div>';
                     //    html
                 });
                 $('#wk2').html(html2);
             },
             dataType: "text",
             complete: function () {
                 // call a function on complete
                 // return jsonobject;
                 // Horizontal gauge
                 $('.gauge').each(function () {
                     var text = $(this).text();
                     $(this).parent().width(text);
                 });
                 // Power Meter
                 $('.pwm').each(function () {
                     var text = $(this).text();
                     $(this).parent().width(text);
                 });
                 /* global PullToRefresh */
                 PullToRefresh.init({
                     mainElement: '#ptr',
                     onRefresh: function () {
                         window.location.reload();
                     }
                 });
             }
         });

         // ajax begin (Wk3)
         $.ajax({
            //  url: "js/spi_matches.csv",
             url: "https://projects.fivethirtyeight.com/soccer-api/club/spi_matches.csv",
             cache: true,
             async: true,
            //  dataType: 'csv',
             xhr: function () {
                 var xhr = $.ajaxSettings.xhr();
                 xhr.onprogress = function (e) {
                     if (e.lengthComputable) {
                         var lPerc = e.loaded / e.total;
                        //  console.log(Math.round(lPerc * 100));
                     }
                 }
                 return xhr;
             },
             error: function () {
                 $('#loading').html('<p class="nerror">An error has occurred</p><p class="icon icon-info rsh">&nbsp Pull to refresh</p>');
             },
             success: function (csvdata) {
                 var items = $.csv.toObjects(csvdata);
                 var jsonobject = JSON.stringify(items);
                 var matches = JSON.parse(jsonobject).filter(({
                     date
                 }) => date > next14 && date <= next21);
                 // console.log(matches);
                 var html3 = '';
                 var $loading = $('#loading').hide();
                 //Attach the event handler to any element
                 $(document)
                     .ajaxStart(function () {
                         //ajax request went so show the loading image
                         $loading.show();
                     })
                     .ajaxStop(function () {
                         //got response so hide the loading image
                         $loading.hide();
                     });
                 $.each(matches, function (key, item) {
                     var xg1 = item.proj_score1;
                     var xg2 = item.proj_score2;
                     //    Algoritm
                     function sum(input) {
                         if (toString.call(input) !== "[object Array]")
                             return false;
                         var total = 0;
                         for (var i = 0; i < input.length; i++) {
                             if (isNaN(input[i])) {
                                 continue;
                             }
                             total += Number(input[i]);
                         }
                         return total;
                     }
                     var poisson = function (x, lambda) {
                         var e = 2.718;
                         var a = Math.pow(lambda, x);
                         var b = Math.pow(e, (lambda * -1));
                         var c = factorial(x);
                         // this weird thing is just to keep decimal and float value
                         return parseFloat(((a * b) / c).toFixed(3));
                     };
                     // Yeah, you'll need factorial to do this
                     var factorial = function (n) {
                         if (n < 0) {
                             return -1;
                         } else if (n == 0) {
                             return 1;
                         } else {
                             return n * factorial(n - 1);
                         }
                     };
                     // Home wins
                     var homeWin = ((poisson(1, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100));
                     // awayWins
                     var awayWin = ((poisson(1, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     //   Draws
                     var draw = ((poisson(0, xg1) * poisson(0, xg2) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100));
                     // Over 1.5
                     var over1 = (
                         (poisson(2, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(2, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     // Over 2.5
                     var over2 = (
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     // Over 3.5
                     var over3 = (
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     // Over 4.5
                     var over4 = (
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     // BTTS
                     var btts = (
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100));
                     var odd1 = math.divide(100, homeWin).toFixed(2);
                     var odd2 = math.divide(100, awayWin).toFixed(2);
                     var oddx = math.divide(100, draw).toFixed(2);
                     var onex = 100 / (math.multiply(odd1, oddx) / math.add(odd1, oddx));
                     var one2 = 100 / (math.multiply(odd1, odd2) / math.add(odd1, odd2));
                     var ex2 = 100 / (math.multiply(oddx, odd2) / math.add(oddx, odd2));
                     // Win Tip
                     var wTip = Math.max(onex, one2, ex2);
                     var winTip;
                     switch (wTip) {
                         case onex:
                             winTip = "Home/Draw";
                             break;
                         case one2:
                             winTip = "Home/Away";
                             break;
                         case ex2:
                             winTip = "Draw/Away";
                             break;
                     }
                     // console.log (wTip);
                     // O/U Goal tips
                     var gTip = Math.max(over1, over2, over3, over4, 100 - over1, 100 - over2, 100 - over3, 100 - over4);
                     var goalTip;
                     switch (gTip) {
                         case over1:
                             goalTip = "Over 1.5";
                             break;
                         case over2:
                             goalTip = "Over 2.5";
                             break;
                         case over3:
                             goalTip = "Over 3.5";
                             break;
                         case over4:
                             goalTip = "Over 4.5";
                             break;
                         case 100 - over1:
                             goalTip = "Under 1.5";
                             break;
                         case 100 - over2:
                             goalTip = "Under 2.5";
                             break;
                         case 100 - over3:
                             goalTip = "Under 3.5";
                             break;
                         case 100 - over4:
                             goalTip = "Under 4.5";
                             break;
                     }
                     // Ranks (Home)
                     var spiRnk1 = Math.round(item.spi1);
                     var spiCat1 = function (spiRnk1) {
                         if (spiRnk1 >= 85) {
                             return ("Elite");
                         } else if (spiRnk1 >= 80 && spiRnk1 <= 84) {
                             return ("Very Strong");
                         } else if (spiRnk1 >= 75 && spiRnk1 <= 79) {
                             return ("Strong");
                         } else if (spiRnk1 >= 70 && spiRnk1 <= 74) {
                             return ("Good");
                         } else if (spiRnk1 >= 60 && spiRnk1 <= 69) {
                             return ("Competitive");
                         } else if (spiRnk1 >= 50 && spiRnk1 <= 59) {
                             return ("Marginal");
                         } else if (spiRnk1 >= 25 && spiRnk1 <= 49) {
                             return ("Weak");
                         } else if (spiRnk1 >= 0 && spiRnk1 <= 24) {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     // Ranks (Away)
                     var spiRnk2 = Math.round(item.spi2);
                     var spiCat2 = function (spiRnk2) {
                         if (spiRnk2 >= 85) {
                             return ("Elite");
                         } else if (spiRnk2 >= 80 && spiRnk2 <= 84) {
                             return ("Very Strong");
                         } else if (spiRnk2 >= 75 && spiRnk2 <= 79) {
                             return ("Strong");
                         } else if (spiRnk2 >= 70 && spiRnk2 <= 74) {
                             return ("Good");
                         } else if (spiRnk2 >= 60 && spiRnk2 <= 69) {
                             return ("Competitive");
                         } else if (spiRnk2 >= 50 && spiRnk2 <= 59) {
                             return ("Marginal");
                         } else if (spiRnk2 >= 25 && spiRnk2 <= 49) {
                             return ("Weak");
                         } else if (spiRnk2 >= 0 && spiRnk2 <= 24) {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };

                     // Country Flags
                     var lgname = (item.league);
                     var crFlag = function (lgname) {
                         if (lgname = "French Ligue 1") {
                             return ("U+1F1F7");
                         } else if (lgname = "Barclays Premier League") {
                             return ("U+1F1E7");
                         } else if (lgname = "Spanish Primera Division") {
                             return ("U+1F1F8");
                         } else if (lgname = "Italy Serie A") {
                             return ("U+1F1F9");
                         } else if (lgname = "UEFA Champions League") {
                             return ("UEFA");
                         } else if (lgname = "German Bundesliga") {
                             return ("U+1F1EA");
                         } else if (lgname = "Australian A-League") {
                             return ("U+1F1FA");
                         } else if (lgname = "English League Two") {
                             return ("U+1F1E7");
                         } else if (lgname = "English League Championship") {
                             return ("U+1F1E7");
                         } else if (lgname = "English League One") {
                             return ("U+1F1E7");
                         } else if (lgname = "Portuguese Liga") {
                             return ("U+1F1F9");
                         } else if (lgname = "Mexican Primera Division Torneo Clausura") {
                             return ("U+1F1FD");
                         } else if (lgname = "South African ABSA Premier League") {
                             return ("U+1F1E6");
                         } else if (lgname = "Spanish Segunda Division") {
                             return ("U+1F1F8");
                         } else if (lgname = "French Ligue 2") {
                             return ("U+1F1F7");
                         } else if (lgname = "Greek Super League") {
                             return ("U+1F1F7");
                         } else if (lgname = "Dutch Eredivisie") {
                             return ("U+1F1F0");
                         } else if (lgname = "Belgian Jupiler League") {
                             return ("U+1F1EA");
                         } else if (lgname = "Italy Serie B") {
                             return ("U+1F1F9");
                         } else if (lgname = "Turkish Turkcell Super Lig") {
                             return ("Very Weak");
                         } else if (lgname = "Scottish Premiership") {
                             return ("Very Weak");
                         } else if (lgname = "Argentina Primera Division") {
                             return ("U+1F1F7");
                         } else if (lgname = "German 2. Bundesliga") {
                             return ("Very Weak");
                         } else if (lgname = "Swiss Raiffeisen Super League") {
                             return ("Very Weak");
                         } else if (lgname = "Danish SAS-Ligaen") {
                             return ("Very Weak");
                         } else if (lgname = "Japanese J League") {
                             return ("Very Weak");
                         } else if (lgname = "Chinese Super League") {
                             return ("Very Weak");
                         } else if (lgname = "Austrian T-Mobile Bundesliga") {
                             return ("Very Weak");
                         } else if (lgname = "Major League Soccer") {
                             return ("Very Weak");
                         } else if (lgname = "United Soccer League") {
                             return ("Very Weak");
                         } else if (lgname = "Russian Premier Liga") {
                             return ("Very Weak");
                         } else if (lgname = "UEFA Europa League") {
                             return ("Very Weak");
                         } else if (lgname = "Norwegian Tippeligaen") {
                             return ("Very Weak");
                         } else if (lgname = "Swedish Allsvenskan") {
                             return ("Very Weak");
                         } else if (lgname = "Brasileiro SÃ©rie A") {
                             return ("Very Weak");
                         } else if (lgname = "National Women's Soccer League") {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     var hpCat = spiCat1(spiRnk1);
                     var apCat = spiCat2(spiRnk2);
                     //
                     html3 += '<div class="card">';
                     html3 += '<ul class="list">';
                     html3 += '<li class="divider" style="border-bottom: 2px solid #0e83ca";>' + '<span class="phone-9 tablet-9 column league">' + '&#127942;&nbsp;' + item.league + '</span>' + '<span class="phone-3 tablet-3 column" style="text-align: end;">' + moment(item.date).format("MMM Do YYYY") + '</span>' + '</li>';
                     html3 += '<li>';
                     html3 += '<span class="phone-4 tablet-6 column htname">' + '&#128085;&nbsp;&nbsp;' + item.team1 + '</span>' + '<span class="phone-4 tablet-6 column"  style="text-align: center;font-weight: bold;color: #333;">' + Math.round(item.score1) + ":" + Math.round(item.score2) + '</span>' + '<span class="phone-4 tablet-6 column atname" style="text-align: end;">' + item.team2 +  '&nbsp;&nbsp;&#128085;' +'</span>';
                     html3 += '</li>';
                     html3 += '<li class="table-view-cell sit small chart">';
                     html3 += '<div class="block">' + '<div class="gauge">' + Math.round(homeWin) + '%' + '</div>' + '</div>';
                     html3 += '<div class="block">' + '<div class="gauge">' + Math.round(draw) + '%' + '</div>' + '</div>';
                     html3 += '<div class="block">' + '<div class="gauge">' + Math.round(awayWin) + '%' + '</div>' + '</div>';
                     html3 += '</li>';
                     html3 += '<li>';
                     html3 += '<span class="phone-4 tablet-6 column hteam">' + 'Home:&nbsp;' + odd1 + '</span>' + '<span class="phone-4 tablet-6 column "  style="text-align: center;">' + 'Draw:&nbsp;' + oddx + '</span>' + '<span class="phone-4 tablet-6 column  ateam" style="text-align: end;">' + 'Away:&nbsp;' + odd2 + '</span>';
                     html3 += '</li>';
                     html3 += '<li>';
                     html3 += '<span class="phone-4 tablet-6 column hteam">' + 'Home/Draw:&nbsp;' + (100 / onex).toFixed(2) + '</span>' + '<span class="phone-4 tablet-6 column "  style="text-align: center;">' + 'Home/Away:&nbsp;' + (100 / one2).toFixed(2) + '</span>' + '<span class="phone-4 tablet-6 column  ateam" style="text-align: end;">' + 'Draw/Away:&nbsp;' + (100 / ex2).toFixed(2) + '</span>';
                     html3 += '</li>';
                     html3 += '<li>';
                     html3 += '<span class="phone-6 tablet-6 column hteam">' + '&#128170;&nbsp;' + item.spi1 + '&nbsp;' + hpCat + '</span>' + '<span class="phone-6 tablet-6 column ateam" style="text-align: end;">' + apCat + ' &nbsp;' + item.spi2 + '&nbsp;&#128170;' + '</span>';
                     html3 += '</li>';
                     html3 += '<li>';
                    //  html3 += '<span class="phone-4 tablet-6 column hteam">' + '&#128293;&nbsp;' + item.importance1 + '&nbsp; Passion' + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'Passion &nbsp;' + item.importance2 + '&nbsp;&#128293;' + '</span>';
                     html3 += '</li>';
                     html3 += '<li>';
                     html3 += '<span class="phone-4 tablet-6 column hteam">' + '&#9917;&nbsp;' + xg1 + '&nbsp; xG' + '</span>' + '<span class="phone-4 tablet-6 column" style="text-align: center;color: #333;font-weight: light;border: 2px solid #0e83ca;border-radius: 10px;">' + 'Correct Score: &nbsp;' + Math.round(xg1) + ":" + Math.round(xg2) + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'xG &nbsp;' + xg2 + '&nbsp;&#9917;' + '</span>';
                     html3 += '</li>';
                     html3 += '</ul>';
                     html3 += '<table class="table">';
                     html3 += '<tr>';
                     html3 += '<thead>';
                     html3 += '<th class="over">' + 'Ovr 1.5: &nbsp;' + Math.round(over1) + "%" + '</th>';
                     html3 += '<th class="over">' + 'Ovr 2.5: &nbsp;' + Math.round(over2) + "%" + '</th>';
                     html3 += '<th class="over">' + 'Ovr 3.5: &nbsp;' + Math.round(over3) + "%" + '</th>';
                     html3 += '<th class="over">' + 'Ovr 4.5: &nbsp;' + Math.round(over4) + "%" + '</th>';
                     html3 += '<th class="over">' + 'BTS Yes: &nbsp;' + Math.round(btts) + "%" + '</th>';
                     html3 += '</thead>';
                     html3 += '</tr>';
                     html3 += '<tbody>';
                     html3 += '<tr>';
                     html3 += '<td class="under">' + 'Und 1.5: &nbsp;' + Math.round(100 - over1) + "%" + '</td>';
                     html3 += '<td class="under">' + 'Und 2.5: &nbsp;' + Math.round(100 - over2) + "%" + '</td>';
                     html3 += '<td class="under">' + 'Und 3.5: &nbsp;' + Math.round(100 - over3) + "%" + '</td>';
                     html3 += '<td class="under">' + 'Und 4.5: &nbsp;' + Math.round(100 - over4) + "%" + '</td>';
                     html3 += '<td class="under">' + 'BTS No:&nbsp;  ' + Math.round(100 - btts) + "%" + '</td>';
                     html3 += '</tr>';
                     html3 += '</tbody>';
                     html3 += '</table>';
                     html3 += '</div>';
                     //    html
                 });
                 $('#wk3').html(html3);
             },
             dataType: "text",
             complete: function () {
                 // call a function on complete
                 // return jsonobject;
                 // Horizontal gauge
                 $('.gauge').each(function () {
                     var text = $(this).text();
                     $(this).parent().width(text);
                 });
                 // Power Meter
                 $('.pwm').each(function () {
                     var text = $(this).text();
                     $(this).parent().width(text);
                 });
                 /* global PullToRefresh */
                 PullToRefresh.init({
                     mainElement: '#ptr',
                     onRefresh: function () {
                         window.location.reload();
                     }
                 });
             }
         });
         // ajax begin (Wk4)
         $.ajax({
            //  url: "js/spi_matches.csv",
             url: "https://projects.fivethirtyeight.com/soccer-api/club/spi_matches.csv",

             cache: true,
             async: true,
            //  dataType: 'csv',
             xhr: function () {
                 var xhr = $.ajaxSettings.xhr();
                 xhr.onprogress = function (e) {
                     if (e.lengthComputable) {
                         var lPerc = e.loaded / e.total;
                        //  console.log(Math.round(lPerc * 100));
                     }

                 }

                 return xhr;

             },

             error: function () {
                 $('#loading').html('<p class="nerror">An error has occurred</p><p class="icon icon-info rsh">&nbsp Pull to refresh</p>');
             },
             success: function (csvdata) {
                 var items = $.csv.toObjects(csvdata);
                 var jsonobject = JSON.stringify(items);


                 var matches = JSON.parse(jsonobject).filter(({
                     date
                 }) => date > next21 && date <= next28);
                 // console.log(matches);
                 var html4 = '';

                 var $loading = $('#loading').hide();
                 //Attach the event handler to any element
                 $(document)
                     .ajaxStart(function () {
                         //ajax request went so show the loading image
                         $loading.show();
                     })
                     .ajaxStop(function () {
                         //got response so hide the loading image
                         $loading.hide();
                     });

                 $.each(matches, function (key, item) {
                     var xg1 = item.proj_score1;
                     var xg2 = item.proj_score2;
                     //    Algoritm
                     function sum(input) {

                         if (toString.call(input) !== "[object Array]")
                             return false;
                         var total = 0;
                         for (var i = 0; i < input.length; i++) {
                             if (isNaN(input[i])) {
                                 continue;
                             }
                             total += Number(input[i]);
                         }
                         return total;
                     }

                     var poisson = function (x, lambda) {
                         var e = 2.718;
                         var a = Math.pow(lambda, x);
                         var b = Math.pow(e, (lambda * -1));
                         var c = factorial(x);
                         // this weird thing is just to keep decimal and float value
                         return parseFloat(((a * b) / c).toFixed(3));
                     };
                     // Yeah, you'll need factorial to do this
                     var factorial = function (n) {
                         if (n < 0) {
                             return -1;
                         } else if (n == 0) {
                             return 1;
                         } else {
                             return n * factorial(n - 1);
                         }
                     };


                     // Home wins
                     var homeWin = ((poisson(1, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100));

                     // awayWins
                     var awayWin = ((poisson(1, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));


                     //   Draws
                     var draw = ((poisson(0, xg1) * poisson(0, xg2) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100));
                     // Over 1.5
                     var over1 = (
                         (poisson(2, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(2, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100));
                     // Over 2.5
                     var over2 = (
                         (poisson(3, xg1) * poisson(0, xg2) * 100) +
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(3, xg2) * poisson(0, xg1) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100)

                     );

                     // Over 3.5
                     var over3 = (
                         (poisson(4, xg1) * poisson(0, xg2) * 100) +
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(4, xg2) * poisson(0, xg1) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100)

                     );

                     // Over 4.5
                     var over4 = (
                         (poisson(5, xg1) * poisson(0, xg2) * 100) +
                         (poisson(6, xg1) * poisson(0, xg2) * 100) +
                         (poisson(7, xg1) * poisson(0, xg2) * 100) +
                         (poisson(8, xg1) * poisson(0, xg2) * 100) +
                         (poisson(9, xg1) * poisson(0, xg2) * 100) +
                         (poisson(10, xg1) * poisson(0, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100) +
                         (poisson(5, xg2) * poisson(0, xg1) * 100) +
                         (poisson(6, xg2) * poisson(0, xg1) * 100) +
                         (poisson(7, xg2) * poisson(0, xg1) * 100) +
                         (poisson(8, xg2) * poisson(0, xg1) * 100) +
                         (poisson(9, xg2) * poisson(0, xg1) * 100) +
                         (poisson(10, xg2) * poisson(0, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100)

                     );

                     // BTTS
                     var btts = (
                         (poisson(2, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(1, xg2) * 100) +
                         (poisson(3, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(1, xg2) * 100) +
                         (poisson(4, xg1) * poisson(2, xg2) * 100) +
                         (poisson(4, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(1, xg2) * 100) +
                         (poisson(5, xg1) * poisson(2, xg2) * 100) +
                         (poisson(5, xg1) * poisson(3, xg2) * 100) +
                         (poisson(5, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(1, xg2) * 100) +
                         (poisson(6, xg1) * poisson(2, xg2) * 100) +
                         (poisson(6, xg1) * poisson(3, xg2) * 100) +
                         (poisson(6, xg1) * poisson(4, xg2) * 100) +
                         (poisson(6, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(1, xg2) * 100) +
                         (poisson(7, xg1) * poisson(2, xg2) * 100) +
                         (poisson(7, xg1) * poisson(3, xg2) * 100) +
                         (poisson(7, xg1) * poisson(4, xg2) * 100) +
                         (poisson(7, xg1) * poisson(5, xg2) * 100) +
                         (poisson(7, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(1, xg2) * 100) +
                         (poisson(8, xg1) * poisson(2, xg2) * 100) +
                         (poisson(8, xg1) * poisson(3, xg2) * 100) +
                         (poisson(8, xg1) * poisson(4, xg2) * 100) +
                         (poisson(8, xg1) * poisson(5, xg2) * 100) +
                         (poisson(8, xg1) * poisson(6, xg2) * 100) +
                         (poisson(8, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(1, xg2) * 100) +
                         (poisson(9, xg1) * poisson(2, xg2) * 100) +
                         (poisson(9, xg1) * poisson(3, xg2) * 100) +
                         (poisson(9, xg1) * poisson(4, xg2) * 100) +
                         (poisson(9, xg1) * poisson(5, xg2) * 100) +
                         (poisson(9, xg1) * poisson(6, xg2) * 100) +
                         (poisson(9, xg1) * poisson(7, xg2) * 100) +
                         (poisson(9, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(1, xg2) * 100) +
                         (poisson(10, xg1) * poisson(2, xg2) * 100) +
                         (poisson(10, xg1) * poisson(3, xg2) * 100) +
                         (poisson(10, xg1) * poisson(4, xg2) * 100) +
                         (poisson(10, xg1) * poisson(5, xg2) * 100) +
                         (poisson(10, xg1) * poisson(6, xg2) * 100) +
                         (poisson(10, xg1) * poisson(7, xg2) * 100) +
                         (poisson(10, xg1) * poisson(8, xg2) * 100) +
                         (poisson(10, xg1) * poisson(9, xg2) * 100) +
                         (poisson(2, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(1, xg1) * 100) +
                         (poisson(3, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(1, xg1) * 100) +
                         (poisson(4, xg2) * poisson(2, xg1) * 100) +
                         (poisson(4, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(1, xg1) * 100) +
                         (poisson(5, xg2) * poisson(2, xg1) * 100) +
                         (poisson(5, xg2) * poisson(3, xg1) * 100) +
                         (poisson(5, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(1, xg1) * 100) +
                         (poisson(6, xg2) * poisson(2, xg1) * 100) +
                         (poisson(6, xg2) * poisson(3, xg1) * 100) +
                         (poisson(6, xg2) * poisson(4, xg1) * 100) +
                         (poisson(6, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(1, xg1) * 100) +
                         (poisson(7, xg2) * poisson(2, xg1) * 100) +
                         (poisson(7, xg2) * poisson(3, xg1) * 100) +
                         (poisson(7, xg2) * poisson(4, xg1) * 100) +
                         (poisson(7, xg2) * poisson(5, xg1) * 100) +
                         (poisson(7, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(1, xg1) * 100) +
                         (poisson(8, xg2) * poisson(2, xg1) * 100) +
                         (poisson(8, xg2) * poisson(3, xg1) * 100) +
                         (poisson(8, xg2) * poisson(4, xg1) * 100) +
                         (poisson(8, xg2) * poisson(5, xg1) * 100) +
                         (poisson(8, xg2) * poisson(6, xg1) * 100) +
                         (poisson(8, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(1, xg1) * 100) +
                         (poisson(9, xg2) * poisson(2, xg1) * 100) +
                         (poisson(9, xg2) * poisson(3, xg1) * 100) +
                         (poisson(9, xg2) * poisson(4, xg1) * 100) +
                         (poisson(9, xg2) * poisson(5, xg1) * 100) +
                         (poisson(9, xg2) * poisson(6, xg1) * 100) +
                         (poisson(9, xg2) * poisson(7, xg1) * 100) +
                         (poisson(9, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(1, xg1) * 100) +
                         (poisson(10, xg2) * poisson(2, xg1) * 100) +
                         (poisson(10, xg2) * poisson(3, xg1) * 100) +
                         (poisson(10, xg2) * poisson(4, xg1) * 100) +
                         (poisson(10, xg2) * poisson(5, xg1) * 100) +
                         (poisson(10, xg2) * poisson(6, xg1) * 100) +
                         (poisson(10, xg2) * poisson(7, xg1) * 100) +
                         (poisson(10, xg2) * poisson(8, xg1) * 100) +
                         (poisson(10, xg2) * poisson(9, xg1) * 100) +
                         (poisson(1, xg1) * poisson(1, xg2) * 100) +
                         (poisson(2, xg1) * poisson(2, xg2) * 100) +
                         (poisson(3, xg1) * poisson(3, xg2) * 100) +
                         (poisson(4, xg1) * poisson(4, xg2) * 100) +
                         (poisson(5, xg1) * poisson(5, xg2) * 100) +
                         (poisson(6, xg1) * poisson(6, xg2) * 100) +
                         (poisson(7, xg1) * poisson(7, xg2) * 100) +
                         (poisson(8, xg1) * poisson(8, xg2) * 100) +
                         (poisson(9, xg1) * poisson(9, xg2) * 100) +
                         (poisson(10, xg1) * poisson(10, xg2) * 100));
                     var odd1 = math.divide(100, homeWin).toFixed(2);
                     var odd2 = math.divide(100, awayWin).toFixed(2);
                     var oddx = math.divide(100, draw).toFixed(2);
                     var onex = 100 / (math.multiply(odd1, oddx) / math.add(odd1, oddx));
                     var one2 = 100 / (math.multiply(odd1, odd2) / math.add(odd1, odd2));
                     var ex2 = 100 / (math.multiply(oddx, odd2) / math.add(oddx, odd2));
                     // Win Tip
                     var wTip = Math.max(onex, one2, ex2);
                     var winTip;
                     switch (wTip) {
                         case onex:
                             winTip = "Home/Draw";
                             break;
                         case one2:
                             winTip = "Home/Away";
                             break;
                         case ex2:
                             winTip = "Draw/Away";
                             break;

                     }
                     // console.log (wTip);
                     // O/U Goal tips
                     var gTip = Math.max(over1, over2, over3, over4, 100 - over1, 100 - over2, 100 - over3, 100 - over4);
                     var goalTip;
                     switch (gTip) {
                         case over1:
                             goalTip = "Over 1.5";
                             break;
                         case over2:
                             goalTip = "Over 2.5";
                             break;
                         case over3:
                             goalTip = "Over 3.5";
                             break;
                         case over4:
                             goalTip = "Over 4.5";
                             break;
                         case 100 - over1:
                             goalTip = "Under 1.5";
                             break;
                         case 100 - over2:
                             goalTip = "Under 2.5";
                             break;
                         case 100 - over3:
                             goalTip = "Under 3.5";
                             break;
                         case 100 - over4:
                             goalTip = "Under 4.5";
                             break;

                     }
                     // Ranks (Home)
                     var spiRnk1 = Math.round(item.spi1);
                     var spiCat1 = function (spiRnk1) {
                         if (spiRnk1 >= 85) {
                             return ("Elite");
                         } else if (spiRnk1 >= 80 && spiRnk1 <= 84) {
                             return ("Very Strong");
                         } else if (spiRnk1 >= 75 && spiRnk1 <= 79) {
                             return ("Strong");
                         } else if (spiRnk1 >= 70 && spiRnk1 <= 74) {
                             return ("Good");
                         } else if (spiRnk1 >= 60 && spiRnk1 <= 69) {
                             return ("Competitive");
                         } else if (spiRnk1 >= 50 && spiRnk1 <= 59) {
                             return ("Marginal");
                         } else if (spiRnk1 >= 25 && spiRnk1 <= 49) {
                             return ("Weak");
                         } else if (spiRnk1 >= 0 && spiRnk1 <= 24) {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     // Ranks (Away)
                     var spiRnk2 = Math.round(item.spi2);
                     var spiCat2 = function (spiRnk2) {
                         if (spiRnk2 >= 85) {
                             return ("Elite");
                         } else if (spiRnk2 >= 80 && spiRnk2 <= 84) {
                             return ("Very Strong");
                         } else if (spiRnk2 >= 75 && spiRnk2 <= 79) {
                             return ("Strong");
                         } else if (spiRnk2 >= 70 && spiRnk2 <= 74) {
                             return ("Good");
                         } else if (spiRnk2 >= 60 && spiRnk2 <= 69) {
                             return ("Competitive");
                         } else if (spiRnk2 >= 50 && spiRnk2 <= 59) {
                             return ("Marginal");
                         } else if (spiRnk2 >= 25 && spiRnk2 <= 49) {
                             return ("Weak");
                         } else if (spiRnk2 >= 0 && spiRnk2 <= 24) {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     // Country Flags
                     var lgname = (item.league);
                     var crFlag = function (lgname) {
                         if (lgname = "French Ligue 1") {
                             return ("U+1F1F7");
                         } else if (lgname = "Barclays Premier League") {
                             return ("U+1F1E7");
                         } else if (lgname = "Spanish Primera Division") {
                             return ("U+1F1F8");
                         } else if (lgname = "Italy Serie A") {
                             return ("U+1F1F9");
                         } else if (lgname = "UEFA Champions League") {
                             return ("UEFA");
                         } else if (lgname = "German Bundesliga") {
                             return ("U+1F1EA");
                         } else if (lgname = "Australian A-League") {
                             return ("U+1F1FA");
                         } else if (lgname = "English League Two") {
                             return ("U+1F1E7");
                         } else if (lgname = "English League Championship") {
                             return ("U+1F1E7");
                         } else if (lgname = "English League One") {
                             return ("U+1F1E7");
                         } else if (lgname = "Portuguese Liga") {
                             return ("U+1F1F9");
                         } else if (lgname = "Mexican Primera Division Torneo Clausura") {
                             return ("U+1F1FD");
                         } else if (lgname = "South African ABSA Premier League") {
                             return ("U+1F1E6");
                         } else if (lgname = "Spanish Segunda Division") {
                             return ("U+1F1F8");
                         } else if (lgname = "French Ligue 2") {
                             return ("U+1F1F7");
                         } else if (lgname = "Greek Super League") {
                             return ("U+1F1F7");
                         } else if (lgname = "Dutch Eredivisie") {
                             return ("U+1F1F0");
                         } else if (lgname = "Belgian Jupiler League") {
                             return ("U+1F1EA");
                         } else if (lgname = "Italy Serie B") {
                             return ("U+1F1F9");
                         } else if (lgname = "Turkish Turkcell Super Lig") {
                             return ("Very Weak");
                         } else if (lgname = "Scottish Premiership") {
                             return ("Very Weak");
                         } else if (lgname = "Argentina Primera Division") {
                             return ("U+1F1F7");
                         } else if (lgname = "German 2. Bundesliga") {
                             return ("Very Weak");
                         } else if (lgname = "Swiss Raiffeisen Super League") {
                             return ("Very Weak");
                         } else if (lgname = "Danish SAS-Ligaen") {
                             return ("Very Weak");
                         } else if (lgname = "Japanese J League") {
                             return ("Very Weak");
                         } else if (lgname = "Chinese Super League") {
                             return ("Very Weak");
                         } else if (lgname = "Austrian T-Mobile Bundesliga") {
                             return ("Very Weak");
                         } else if (lgname = "Major League Soccer") {
                             return ("Very Weak");
                         } else if (lgname = "United Soccer League") {
                             return ("Very Weak");
                         } else if (lgname = "Russian Premier Liga") {
                             return ("Very Weak");
                         } else if (lgname = "UEFA Europa League") {
                             return ("Very Weak");
                         } else if (lgname = "Norwegian Tippeligaen") {
                             return ("Very Weak");
                         } else if (lgname = "Swedish Allsvenskan") {
                             return ("Very Weak");
                         } else if (lgname = "Brasileiro SÃ©rie A") {
                             return ("Very Weak");
                         } else if (lgname = "National Women's Soccer League") {
                             return ("Very Weak");
                         } else {
                             return ("N/A");
                         }
                     };
                     var hpCat = spiCat1(spiRnk1);
                     var apCat = spiCat2(spiRnk2);
                     //
                     html4 += '<div class="card">';
                     html4 += '<ul class="list">';
                     html4 += '<li class="divider" style="border-bottom: 2px solid #0e83ca";>' + '<span class="phone-9 tablet-9 column league">' + '&#127942;&nbsp;' + item.league + '</span>' + '<span class="phone-3 tablet-3 column" style="text-align: end;">' + moment(item.date).format("MMM Do YYYY") + '</span>' + '</li>';
                     html4 += '<li>';
                     html4 += '<span class="phone-4 tablet-6 column htname">' + '&#128085;&nbsp;&nbsp;' + item.team1 + '</span>' + '<span class="phone-4 tablet-6 column"  style="text-align: center;font-weight: bold;color: #333;">' + Math.round(item.score1) + ":" + Math.round(item.score2) + '</span>' + '<span class="phone-4 tablet-6 column atname" style="text-align: end;">' + item.team2 +  '&nbsp;&nbsp;&#128085;' +'</span>';
                     html4 += '</li>';
                     html4 += '<li class="table-view-cell sit small chart">';
                     html4 += '<div class="block">' + '<div class="gauge">' + Math.round(homeWin) + '%' + '</div>' + '</div>';
                     html4 += '<div class="block">' + '<div class="gauge">' + Math.round(draw) + '%' + '</div>' + '</div>';
                     html4 += '<div class="block">' + '<div class="gauge">' + Math.round(awayWin) + '%' + '</div>' + '</div>';
                     html4 += '</li>';
                     html4 += '<li>';
                     html4 += '<span class="phone-4 tablet-6 column hteam">' + 'Home:&nbsp;' + odd1 + '</span>' + '<span class="phone-4 tablet-6 column "  style="text-align: center;">' + 'Draw:&nbsp;' + oddx + '</span>' + '<span class="phone-4 tablet-6 column  ateam" style="text-align: end;">' + 'Away:&nbsp;' + odd2 + '</span>';
                     html4 += '</li>';
                     html4 += '<li>';
                     html4 += '<span class="phone-4 tablet-6 column hteam">' + 'Home/Draw:&nbsp;' + (100 / onex).toFixed(2) + '</span>' + '<span class="phone-4 tablet-6 column "  style="text-align: center;">' + 'Home/Away:&nbsp;' + (100 / one2).toFixed(2) + '</span>' + '<span class="phone-4 tablet-6 column  ateam" style="text-align: end;">' + 'Draw/Away:&nbsp;' + (100 / ex2).toFixed(2) + '</span>';
                     html4 += '</li>';
                     html4 += '<li>';
                     html4 += '<span class="phone-6 tablet-6 column hteam">' + '&#128170;&nbsp;' + item.spi1 + '&nbsp;' + hpCat + '</span>' + '<span class="phone-6 tablet-6 column ateam" style="text-align: end;">' + apCat + ' &nbsp;' + item.spi2 + '&nbsp;&#128170;' + '</span>';
                     html4 += '</li>';
                     html4 += '<li>';
                    //  html4 += '<span class="phone-4 tablet-6 column hteam">' + '&#128293;&nbsp;' + item.importance1 + '&nbsp; Passion' + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'Passion &nbsp;' + item.importance2 + '&nbsp;&#128293;' + '</span>';
                     html4 += '</li>';
                     html4 += '<li>';
                     html4 += '<span class="phone-4 tablet-6 column hteam">' + '&#9917;&nbsp;' + xg1 + '&nbsp; xG' + '</span>' + '<span class="phone-4 tablet-6 column"  style="text-align: center;color: #333;font-weight: light;border: 2px solid #0e83ca;border-radius: 10px;">' + 'Correct Score: &nbsp;' + Math.round(xg1) + ":" + Math.round(xg2) + '</span>' + '<span class="phone-4 tablet-6 column ateam" style="text-align: end;">' + 'xG &nbsp;' + xg2 + '&nbsp;&#9917;' + '</span>';
                     html4 += '</li>';
                     html4 += '</ul>';
                     html4 += '<table class="table">';
                     html4 += '<tr>';
                     html4 += '<thead>';
                     html4 += '<th class="over">' + 'Ovr 1.5: &nbsp;' + Math.round(over1) + "%" + '</th>';
                     html4 += '<th class="over">' + 'Ovr 2.5: &nbsp;' + Math.round(over2) + "%" + '</th>';
                     html4 += '<th class="over">' + 'Ovr 3.5: &nbsp;' + Math.round(over3) + "%" + '</th>';
                     html4 += '<th class="over">' + 'Ovr 4.5: &nbsp;' + Math.round(over4) + "%" + '</th>';
                     html4 += '<th class="over">' + 'BTS Yes: &nbsp;' + Math.round(btts) + "%" + '</th>';
                     html4 += '</thead>';
                     html4 += '</tr>';
                     html4 += '<tbody>';
                     html4 += '<tr>';
                     html4 += '<td class="under">' + 'Und 1.5: &nbsp;' + Math.round(100 - over1) + "%" + '</td>';
                     html4 += '<td class="under">' + 'Und 2.5: &nbsp;' + Math.round(100 - over2) + "%" + '</td>';
                     html4 += '<td class="under">' + 'Und 3.5: &nbsp;' + Math.round(100 - over3) + "%" + '</td>';
                     html4 += '<td class="under">' + 'Und 4.5: &nbsp;' + Math.round(100 - over4) + "%" + '</td>';
                     html4 += '<td class="under">' + 'BTS No:&nbsp;  ' + Math.round(100 - btts) + "%" + '</td>';
                     html4 += '</tr>';
                     html4 += '</tbody>';
                     html4 += '</table>';
                     html4 += '</div>';
                     //    html
                 });
                 // });
                 $('#wk4').html(html4);
             },
             dataType: "text",
             complete: function () {
                 // call a function on complete
                 // return jsonobject;
                 // Horizontal gauge
                 $('.gauge').each(function () {
                     var text = $(this).text();
                     $(this).parent().width(text);
                 });
                 // Power Meter
                 $('.pwm').each(function () {
                     var text = $(this).text();
                     $(this).parent().width(text);
                 });
                 /* global PullToRefresh */
                 PullToRefresh.init({
                     mainElement: '#ptr',
                     onRefresh: function () {
                         window.location.reload();
                     }
                 });
             }
         });
     });
