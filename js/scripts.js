$(function() {
  $("select").on("change", function() {
    // saves selected value from selector drop-down
    $(".stories").empty();
    var selected = $(this).val();
    // console.log(selected);

    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "1dcc8ad4ce2442b19fc5355e2305e259"
      });

    $.ajax({ url: url, method: "GET" })
      .done(function(data) {
        var arr = data.results;
        var total = 0;

        for (var i = 0; i <= arr.length; i++) {
          var abs = arr[i].abstract;
          var imgURL;
          if (arr[i].multimedia.length) {
            imgURL = arr[i].multimedia[4].url;

            // $(".stories").append(
            //   `<li> <img src="${imgURL}"> <p>${abs}</p> </li>`
            // );

            total++;
            if (total === 12) {
              break;
            }
          }
        }

        // console.log(data);
        // console.log(obj.slice(11));
      })

      .fail(function(err) {
        //   api request error

        // console.log("there has been an error!!!");
        throw err;
      })
      .always(function() {
        // console.log("always runs");
      });
  });
});
