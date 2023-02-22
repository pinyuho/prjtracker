export default document.onload = function () {
  const inputValue = (document.getElementById("text1") as HTMLInputElement)
    .value;

  const characterCount = 30;
  if (inputValue.length > characterCount) {
    //Now the character count is greater than 10
    (
      document.getElementById("text1") as HTMLInputElement
    ).style.backgroundColor = "#f00";
  }
};
