$(function() {
  $("select").on("change", function() {
    // saves selected value from selector drop-down
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

        console.log(data);
        console.log(obj);
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
