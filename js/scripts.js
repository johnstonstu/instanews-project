$(function() {
  // initalizes selectric selector
  $("select").selectric();

  // when the dropdown selector changes, runs the following scripts
  $("select").on("change", function() {
    // active state for resizing header
    $("header").addClass("header--active");
    $("footer").addClass("footer--active");

    //clears previous list
    $(".stories").empty();

    //loading gif
    $(".loading").empty();
    $(".loading").append(
      '<img alt="loader" src="../images/ajax-loader.gif" width="100" height="100" align="center" />'
    );

    // saves selected value from selector drop-down
    var selected = $(this).val();

    //api get requeset
    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "1dcc8ad4ce2442b19fc5355e2305e259"
      });

    $.ajax({
      url: url,
      method: "GET"
    })

      // runs after a succesful api request
      .done(function(data) {
        var arr = data.results;

        // filters array to new parsed array which includes only objects with pictures
        var pasredArr = arr
          .filter(function(index) {
            return index.multimedia.length;
          })
          .slice(0, 12);

        //loops through results array
        if (pasredArr.length >= 12) {
          for (var i = 0; i <= pasredArr.length; i++) {
            var abs = pasredArr[i].abstract;
            var imgURL = pasredArr[i].multimedia[4].url;
            var storyURL = pasredArr[i].url;

            // adds stories to the page with link, picture and abstract
            $(".stories").append(
              '<li> <a href="' +
                storyURL +
                '"> <div class="imgBG" style="background-image: url(' +
                imgURL +
                ')"><p>' +
                abs +
                "</p></div></a></li>"
            );
            // clears the loading gif
            $(".loading").empty();
          }
        } else {
          alert("Not enough stories to display.");
          $(".loading").empty();
        }
      }) // end of .done

      // throws error if api cannot be reached
      .fail(function(err) {
        throw err;
      })

      // removes loading gif when stories are done loading
      .always(function() {
        $(".loading").empty();
      });
  }); // end of .on "change" function
});
