const imgInput = document.querySelector("#img-select");
const imgPreview = document.querySelector(".preview");

// check color picker:
if (!window.EyeDropper) {
  alert("your browser doesn't support eyeDropper feature");
} else {
  //create a new instance of eyeDropper(needs for color picker)
  const eyeDropper = new EyeDropper();
  const pickerBtn = document.querySelector(".open-picker");
  const result = document.querySelector(".res");

  imgInput.addEventListener("change", function () {
    const file = this.files[0];
    result.innerHTML = ``;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("it's not an image file.");
      return;
    }
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      imgPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  });

  //open color picker:
  pickerBtn.addEventListener("click", function () {
    eyeDropper
      .open()
      .then((res) => {
        console.log(res.sRGBHex); //log selected color
        result.innerHTML = `Picked Color:<b>${res.sRGBHex}</b>`;
      })
      .catch((err) => {
        console.error("err opening the color picker", err);
      });
  });
}
