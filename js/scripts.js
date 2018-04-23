$(function() {
  // Built by LucyBot. www.lucybot.com
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  url +=
    "?" +
    $.param({
      "api-key": "1dcc8ad4ce2442b19fc5355e2305e259"
    });
  $.ajax({ url: url, method: "GET" })
    .done(function(result) {
      console.log(result);
    })
    .fail(function(err) {
      throw err;
    });
});
