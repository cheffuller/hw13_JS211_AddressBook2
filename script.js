// function that fetches the data from the API, sorts the addressBook array by last name,
// and then calls the function to display the data for each element of the array
const getData = async () => {
  const response = await fetch("https://randomuser.me/api/?results=20");
  const randomUserData = await response.json();
  const addressBook = randomUserData.results;
  addressBook.sort((a, b) =>
    a.name.last > b.name.last ? 1 : b.name.last > a.name.last ? -1 : 0
  );
  addressBook.forEach((user) => displayData(user));
};

// function that builds the display elements for the individuals in the address book,
// including the image and name
const displayData = (user) => {
  const displayWindow = document.querySelector("#display");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = user.picture.large;
  const caption = document.createElement("figcaption");
  const name = user.name.title + " " + user.name.first + " " + user.name.last;
  caption.innerHTML = name;
  displayWindow.append(figure);
  figure.append(img, caption, createButton(user, figure));
};

// function that builds the button and all of the "more info" elements to be displayed
// when the button is clicked. The event listener code allows for toggle functionality
const createButton = (user, figure) => {
  const button = document.createElement("button");
  button.innerText = "more info";
  const moreInfo = document.createElement("ul");
  const dateOfBirth = document.createElement("li");
  const dob = new Date(user.dob.date);
  dateOfBirth.innerHTML = `${dob.getMonth() + 1} / ${dob.getDate()} / ${dob.getFullYear()}`;
  const email = document.createElement("li");
  email.innerHTML = user.email;
  const cell = document.createElement("li");
  cell.innerHTML = user.cell;
  const addressLineOne = document.createElement("li");
  addressLineOne.innerHTML = `${user.location.street.number} ${user.location.street.name}`;
  const addressLineTwo = document.createElement("li");
  addressLineTwo.innerHTML = `${user.location.state}, ${user.location.country} ${user.location.postcode}`;
  moreInfo.append(dateOfBirth, addressLineOne, addressLineTwo, email, cell);
  button.addEventListener("click", function () {
    if (!this.dataset.clicked) {
      this.setAttribute("data-clicked", "true");
      figure.append(moreInfo);
    } else {
      this.removeAttribute("data-clicked");
      moreInfo.remove();
    }
  });
  return button;
};

// function that calls getData() when the windo has loaded
window.onload = () => {
  getData();
};