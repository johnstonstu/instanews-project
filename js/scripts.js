$(function() {
  $("select").on("change", function() {
    // saves selected value from selector drop-down
    $(".stories").empty();
    var selected = $(this).val();
    console.log(selected);

    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "1dcc8ad4ce2442b19fc5355e2305e259"
      });

    $.ajax({ url: url, method: "GET" })
      .done(function(data) {
        //   successful request

        var obj = data.results;

        for (i = 0; i <= 12; i++) {
          console.log(data.results[i]);
          var imgURL = data.results[i].multimedia[0].url;
          var abs = data.results[i].abstract;
          $(".stories").append(
            `<li> <img src="${imgURL}"> <p>${abs}</p> </li>`
          );
          console.log(imgURL);
          console.log(abs);
        }

        console.log(data);
        // console.log(obj.slice(11));
      })

      .fail(function(err) {
        //   api request error
        throw err;
      })
      .always(function() {
        console.log("always runs");
      });
  });
});
