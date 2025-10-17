const billInput = document.querySelector(".js-bill-input");
const peopleInput = document.querySelector(".js-people-input");
const tipBtns = document.querySelectorAll(".js-tip-btn");
const customTipBtn = document.querySelector(".js-tip-custom");
const tipAmount = document.querySelector(".js-tip-amount");
const total = document.querySelector(".js-total");
const resetBtn = document.querySelector(".js-reset-btn");
const errorMessage = document.querySelector(".error-message");

let billValue = 0;
let numOfPeople = 1;
let tipPercentage = 0;

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipBtn.value = "";
  billValue = 0;
  numOfPeople = 1;
  tipPercentage = 0;
  tipAmount.textContent = "$0.00"
  total.textContent = "$0.00";
});

billInput.addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);
  // Old code. Keeping here for reference, but new code should fix NaN issue when typing in input and then clearing it
    // billValue = parseFloat(e.target.value).toFixed(2) || 0;
    // console.log(billValue);
    /* Below are the problems the old code was making. Source ChatGPT
      Root cause: .toFixed(2) returns a string, and parseFloat("") = NaN.
      Fix: Keep billValue numeric, and only format when displaying.
      Result: No more NaN when clearing inputs.
    */
    if(isNaN(value)) {
      billValue = 0; // reset to 0 when cleared or invalid
    } else {
      billValue = value;
    }

  calculate();
  // Need to figure out how to cut off typing anymore into the input after reaching two decimal places. In other words you cant type into input after 2 decimal places
})

peopleInput.addEventListener("input", (e) => {
  numOfPeople = parseFloat(e.target.value) || 0;
  // Old code used Number but that was converting the value to zero when string was empty so it was causing a bug that would automatically turn the error message on. Changed to parse float instead. Also adding the || 0 gets rid of the bug of Nan showing up in the display of the output col
  if(numOfPeople === 0) {
    peopleInput.classList.add("error-input");
    errorMessage.style.visibility = "visible";
  } else {
    peopleInput.classList.remove("error-input");
    errorMessage.style.visibility = "";
    calculate();
  }
  
})

tipBtns.forEach((button) => {
  button.addEventListener("click", (e)=> {
    tipPercentage = parseFloat(e.target.dataset.tip);
    calculate();
  })
})

customTipBtn.addEventListener("input", (e)=> {
  tipPercentage = parseFloat(e.target.value);
  calculate();
})

function calculate() {
  // 32.79 in example is coming up because the tip is being added to the number you get when you divide the bill by the number of people. My previous calculations were off
  /* Previous code
  const totalAmountCalc = billValue / numOfPeople;
  
  
  const tipCalc = totalAmountCalc * (tipPercentage / 100);
  */
  const tip = (billValue / numOfPeople) * tipPercentage / 100;
  const totalResult = (billValue / numOfPeople) + tip;
  
  // console.log(tip.toFixed
  // (2));
  // console.log(totalResult.toFixed
  // (2));
  total.textContent = `$${totalResult.toFixed(2)}`;
  tipAmount.textContent = `$${tip.toFixed(2)}`;
}

// Got app to work overall. Just need to fix some bugs, get the reset button to work and I'm done.

/* This is the calculation  I came up with based on what the ai suggested me to do. Gets me the same answer*/
  // const tip = billValue * (tipPercentage / 100)  / numOfPeople
  // const totalResult = (billValue / numOfPeople) + tip;

// Just need to get error message to work on num of people and reset button to work, and I'm done. Going to start with reset button first because that seems easier then going to focus on the error message. Could put inside the num of people that if the user types in 0 into the input then the error message pops in and the styles that come with it. Otherwise run the calculation. Going to use the newsletter project to help me write the code for the styles and the logic for getting the error message



