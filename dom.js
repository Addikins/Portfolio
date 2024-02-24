// document.getElementById('themeToggle').addEventListener('click', function() {
//     const currentTheme = document.documentElement.getAttribute('data-bs-theme');
//     if (currentTheme === 'dark') {
//         document.documentElement.setAttribute('data-bs-theme', 'light');
//     } else {
//         document.documentElement.setAttribute('data-bs-theme', 'dark');
//     }
// });

var masonry;

// Activate Image once loaded, then Gif
function imageLoaded(imageElement) {
  // Show the image
  imageElement.style.display = "block";
  // Hide the loading icon
  var loadingIcon = imageElement.parentNode.querySelector(".loading-icon");
  if (loadingIcon) {
    loadingIcon.style.display = "none";
  }

  loadGif(imageElement);

  // Call masonry layout method to layout the newly displayed image
  if (masonry) {
    masonry.layout();
  }
}

// Activate Gif once loaded
function loadGif(imageElement) {
  var gifSrc = imageElement.getAttribute('data-gif');
  if (gifSrc && imageElement.src.indexOf(gifSrc.slice(1)) === -1) {
    var gifImage = new Image();
    gifImage.onload = function () {
      // Replace the still image with the GIF
      imageElement.src = gifSrc;
      if (masonry) {
        masonry.layout();
      }
    };
    gifImage.src = gifSrc;
  }
}

// This will be called once all images have been either loaded or confirmed broken
function allImagesLoaded(container) {
  // Initialize masonry here if not already initialized
  if (!masonry) {
    masonry = new Masonry(container, {
      itemSelector: ".col",
      percentPosition: true,
    });
  } else {
    // Layout the masonry again in case any late-loaded content changed
    masonry.layout();
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.onload = function () {
      imageLoaded(this);
    };
  });
});

// Initialize event listeners
window.onload = function () {
  var container = document.querySelector(".row[data-masonry]");

  if (typeof imagesLoaded === "function") {
    imagesLoaded(container)
      .on("always", function () {
        // Call this function when all images are loaded
        allImagesLoaded(container);
      })
      .on("progress", function (instance, image) {
        if (image.isLoaded) {
          // Call the imageLoaded function for each image that's loaded
          imageLoaded(image.img);
        }
      });
  } else {
    console.error(
      "imagesLoaded library is not recognized. Ensure it's correctly linked."
    );
  }
};

// Re-initialize Masonry on window resize
window.addEventListener("resize", function () {
  if (masonry) {
    masonry.layout();
  }
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
