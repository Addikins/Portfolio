// document.getElementById('themeToggle').addEventListener('click', function() {
//     const currentTheme = document.documentElement.getAttribute('data-bs-theme');
//     if (currentTheme === 'dark') {
//         document.documentElement.setAttribute('data-bs-theme', 'light');
//     } else {
//         document.documentElement.setAttribute('data-bs-theme', 'dark');
//     }
// });

window.onload = function () {
  var container = document.querySelector(".row[data-masonry]");

  if (typeof imagesLoaded === "function") {
    console.log("imagesLoaded library is recognized.");

    imagesLoaded(container, function (instance) {
      console.log(instance.images.length + " images are being tracked.");

      // Initialize masonry after images are loaded
      var masonry = new Masonry(container, {
        percentPosition: true,
      });
    }).on("progress", function (instance, image) {
      var result = image.isLoaded ? "loaded" : "broken";
      console.log("image is " + result + " for ", image.img.src);
    });
  } else {
    console.log(
      "imagesLoaded library is not recognized. Ensure it's correctly linked."
    );
  }
};

// Re-initialize Masonry on window resize
window.addEventListener("resize", function () {
  var container = document.querySelector(".row[data-masonry]");
  var masonry = new Masonry(container, {
    percentPosition: true,
  });
});
