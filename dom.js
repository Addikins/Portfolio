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
    // console.log("imagesLoaded library is recognized.");

    imagesLoaded(container, function (instance) {
      //   console.log(instance.images.length + " images are being tracked.");

      // Initialize masonry after images are loaded
      var masonry = new Masonry(container, {
        percentPosition: true,
      });
    }).on("progress", function (instance, image) {
      var result = image.isLoaded ? "loaded" : "broken";
      //   console.log("image is " + result + " for ", image.img.src);
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

function getGradientColorAtYPosition(y) {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = document.documentElement.scrollHeight;
  const ctx = canvas.getContext("2d");

  const computedStyle = getComputedStyle(document.documentElement);
  const color1 = computedStyle.getPropertyValue("--bg-1").trim();
  const color2 = computedStyle.getPropertyValue("--bg-2").trim();

  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.5, color2);
  gradient.addColorStop(1, color1);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1, canvas.height);

  const data = ctx.getImageData(0, y, 1, 1).data;
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, .9)`;

  //   console.log(`Y: ${y}, Color: ${rgba}`);
  return rgba;
}

window.addEventListener("scroll", function () {
  let scrollPos = window.scrollY || document.documentElement.scrollTop;
  const navbar = document.querySelector(".navbar");
  let adjustment = 111.23;
  navbar.style.backgroundColor = getGradientColorAtYPosition(
    scrollPos + adjustment
  );
});
