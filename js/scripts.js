$(function() {
  $("select").on("change", function() {
    // saves selected value from selector drop-down

    // active state for resizing header
    $("header").addClass("header--active");

    //clears previous list
    $(".stories").empty();

    //loading gif
    $(".loading").empty();
    $(".loading").append(
      '<img alt="loader" src="../images/ajax-loader.gif" width="100" height="100" align="center" />'
    );

    var selected = $(this).val();

    //api get requeset
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

        // console.log(arr);

        // var parsedArr = arr.filter(arr => arr.multimedia.length > 0);

        // console.log(arr);
        // console.log(parsedArr);

        var pasredArr = arr
          .filter(function(index) {
            return index.multimedia.length;
          })
          .slice(0, 12);

        console.log(pasredArr);

        //loops through results array
        for (var i = 0; i <= arr.length; i++) {
          var abs = arr[i].abstract;
          var imgURL;
          var storyURL = arr[i].url;

          var mArr = arr[i].multimedia;
          // var pasredArr = mArr.filter(mArr => mArr.length > 0);

          // console.log(mArr);
          // console.log(pasredArr);

          // adds only stories with images

          //remove for .filert . splice
          if (arr[i].multimedia.length) {
            imgURL = arr[i].multimedia[4].url;

            $(".stories").append(
              '<li> <a href="' +
                storyURL +
                '"> <div class="imgBG" style="background-image: url(' +
                imgURL +
                ')"><p>' +
                abs +
                "</p></div></a></li>"
            );

            total++;

            // breaks for loop when 12 articles wit pictures is reached
            if (total === 12) {
              break;
            }
          }
        }
      })

      // throws error if api cannot be reached
      .fail(function(err) {
        throw err;
      })

      // removes loading gif when stories are done loading
      .always(function() {
        $(".loading").empty();
      });
  });
});
