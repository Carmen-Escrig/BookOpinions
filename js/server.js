$(document).ready(function () {
    $("#like").on("click", function (e) {
        if(("#like").attr("src") == "img/nolike.png") {
            $("#like").attr("src", "img/like.png");
        } else {
            $("#like").attr("src", "img/nolike.png");
        }
    });
    $("#follow").on("click", function (e) {
        slug = $("#follow").attr("slug");
        $("#follow").addRemove("/profile/" + slug + "/follow", "/img/following.png", "/img/no_following.png");
    });
});