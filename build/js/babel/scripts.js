"use strict";

$(function () {
  // initalizes selectric selector
  $("select").selectric();

  // when the dropdown selector changes, runs the following scripts
  $("select").on("change", function () {
    // active state for resizing header / footer
    $("header").addClass("header--active");
    $("footer").addClass("footer--active");

    var stu = "stu";

    //clears previous stories list
    $(".stories").empty();

    //loading gif
    $(".loading").css("display", "block");

    // saves selected value from selector drop-down
    var selected = $(this).val();

    //api get requeset
    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url += "?" + $.param({
      "api-key": "1dcc8ad4ce2442b19fc5355e2305e259"
    });

    $.ajax({
      url: url,
      method: "GET"
    })

    // runs after a succesful api request
    .done(function (data) {
      // assigns json from api return to new array
      var arr = data.results;

      // filters array to new parsed array which includes only objects with pictures (multimedia must have legnth)
      var pasredArr = arr.filter(function (index) {
        return index.multimedia.length;
      }).slice(0, 12); // sets parsed array to contain only 12 stories

      // check length to fix issue of 11 items or less
      if (pasredArr.length >= 12) {
        // loop through new parsed array and display content
        for (var i = 0; i < pasredArr.length; i++) {
          var abs = pasredArr[i].abstract;
          var imgURL = pasredArr[i].multimedia[4].url; // 4th index of media array contains highest res picture
          var storyURL = pasredArr[i].url;

          // adds stories to the page with link, picture and abstract
          $(".stories").append('<li> <a href="' + storyURL + '" target="_blank"> <div class="imgBG" style="background-image: url(' + imgURL + ')"><p>' + abs + "</p></div></a></li>");
        }
        // throws error if theres less than 12 stories with pictures
      } else {
        alert("Not enough stories to display. Please try another catagory.");
        $(".loading").css("display", "none");
      }
    }) // end of .done

    // throws error if api cannot be reached
    .fail(function (err) {
      alert("There has been an error. Please refresh and try again.");
      throw err;
    })

    // removes loading gif when stories are done loading
    .always(function () {
      $(".loading").css("display", "none");
    });
  }); // end of .on "change" function
});