$(document).ready(function () {
    var animal = ["dog", "cat", "bee"];

    // Function to display button
    function createButtons() {
        $("#button-group").empty();
        for (let i = 0; i < animal.length; i++) {
            var newBtn = $("<button>");
            newBtn.text(animal[i]);
            $("#button-group").append(newBtn);
            newBtn.addClass("btn");
            newBtn.addClass("btn-primary");
            newBtn.addClass("btn-animal");
            newBtn.attr("type", "button");
            newBtn.attr("data-name", animal[i]);
        }
    }

    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var userText = $("#animal-search").val();
        animal.push(userText);
        createButtons();
    });
    // Call the function
    createButtons();

    // API Part
    function displayAnimalImg() {
        var searchName = $(this).attr("data-name");
        var queryUrl =
            "https://api.giphy.com/v1/gifs/search?api_key=KAm9GPR66I1KTmZ27OXGP8NIwxAu4Hfm&q=" +
            searchName +
            "&limit=10&offset=0&rating=R&lang=en";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (let i = 0; i < 10; i++) {
                var imgURL = response.data[i].images.downsized.url;
                var imgStill = response.data[i].images.downsized_still.url;
                $("img")
                    .eq(i)
                    .attr("src", imgURL)
                    .attr("data-animate", imgURL)
                    .attr("data-still", imgStill);
            }
        });
    }
    $(document).on("click", ".btn-animal", displayAnimalImg);

    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            var dataAnimate = $(this).attr("data-animate");
            $(this).attr("src", dataAnimate);
            $(this).attr("data-state", "animate");
        }
        if (state === "animate") {
            var dataStill = $(this).attr("data-still");
            $(this).attr("src", dataStill);
            $(this).attr("data-state", "still");
        }
    });
});