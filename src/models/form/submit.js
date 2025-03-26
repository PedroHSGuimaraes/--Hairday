import dayjs from "dayjs";


const form = document.querySelector("form");
const selectDate = document.getElementById("date");

const todayImput = dayjs(new Date()).format("YYYY-MM-DD");

selectDate.value = todayImput;
selectDate.min = todayImput;

form.onsubmit = (event) => {
  event.preventDefault();
  
  console.log("enviado");
}