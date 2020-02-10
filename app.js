async function chat() {
  const message = await randomMessage();
  if (message === "Остановитесь!") {
    createBrowserAnswerBlock(message);
    return chatClosedByBrowser();
  } else {
    createBrowserAnswerBlock(message);
  }
}

async function randomMessage() {
  let message = [
    "пссс..я не браузер, это я, Витька",
    "cьогодні вже встановлюється новорічна...йолка",
    "ты знаешь, когда увидишь своими руками..глазами потрогаешь",
    "что плохого, что я поддерживал этих страусов?",
    "Остановитесь!",
    "в самом начале мы договорились, что не будем говорить о плохом, а лучше сделаем"
  ][rand(0, 5)];

  return timeout(message, 2);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function timeout(message, time = 0) {
  return new Promise(done => {
    setTimeout(() => done(message), time * 1000);
  });
}

function yourTurn() {
  let input = document.querySelector(".input");
  if (input.value === "батон") {
    let chatBlock = document.querySelector(".chat_answer-container");
    chatBlock.innerHTML = "";
    let area = $(
      '<div class="modal fade show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-modal="true" style="display: block;"></div>'
    );
    let background = $('<div class="modal-backdrop fade show"></div>');
    let container = $("<div></div>")
      .addClass("modal-dialog modal-dialog-centered")
      .attr("role", "document");
    let content = $("<div></div>")
      .addClass("modal-content")
      .attr("style", "color: #0c5460; background-color: #d1ecf1;");
    let header = $("<div></div>")
      .addClass("modal-header")
      .attr("style", "border-bottom: 1px solid grey;");
    let title = $("<h5>Вы использовали стоп-слово</h5>")
      .addClass("modal-title")
      .attr("style", "margin: 0 auto;")
      .attr("id", "exampleModalCenterTitle");
    let message = $("<div>диалог завершён по инициативе пользователя</div>")
      .addClass("modal-body")
      .attr("style", "margin:0,auto")
      .attr("style", "text-align:center");

    let body = $("body");

    body.append(area);
    body.addClass("modal-open");
    area.append(container);
    container.append(content);
    content.append(header);
    content.append(message);
    header.append(title);
    body.append(background);

    area.click("click", () => {
      background.hide();
      area.hide();
    });
  } else {
    x = new Promise((done, fail) => {
      done(createUserAnswerBlock(input.value));
    });
    x.then(() => riseOfMaschine());
  }
}

function riseOfMaschine() {
  chat().then(() => {
    let sendMessageToBrowser = document.querySelector(".sendMessage");
    sendMessageToBrowser.addEventListener("click", yourTurn);
  });
}

let button = document.querySelector(".button");

button.addEventListener("click", riseOfMaschine);

function createBrowserAnswerBlock(browserMessage) {
  let date = new Date();
  let hours = date.getHours();
  let minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let time = `${hours}:${minutes}`;

  let chatBlock = document.querySelector(".chat_answer-container");
  let browserAnswer = document.createElement("div");
  let answerInfo = document.createElement("p");
  let answerText = document.createElement("p");

  browserAnswer.classList.add("browser-message");
  answerText.innerHTML = browserMessage;
  answerInfo.innerHTML = `browser ${time}`;
  browserAnswer.appendChild(answerInfo);
  browserAnswer.appendChild(answerText);
  chatBlock.appendChild(browserAnswer);
}

function chatClosedByBrowser() {
  let chatBlock = document.querySelector(".chat_answer-container");
  let browserAlert = document.createElement("p");
  browserAlert.classList.add("browser-alert");
  browserAlert.innerHTML = "* диалог закончен по инициативе собеседника *";
  chatBlock.appendChild(browserAlert);
  $(".browser-alert").fadeOut(6500);
  setTimeout(() => {
    chatBlock.innerHTML = "";
  }, 6500);
}

function createUserAnswerBlock(userMessage) {
  let date = new Date();
  let hours = date.getHours();
  let minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let time = `${hours}:${minutes}`;

  let chatBlock = document.querySelector(".chat_answer-container");

  let userAnswerBlock = document.createElement("div");
  let userAnswerText = document.createElement("p");
  let answerInfo = document.createElement("p");
  let userAnswerIcon = document.createElement("img");

  userAnswerBlock.classList.add("user-message");
  userAnswerText.classList.add("user-text");
  userAnswerIcon.setAttribute("src", "img/delivery_status.png");

  userAnswerText.innerHTML = userMessage;
  answerInfo.innerHTML = `user ${time}`;
  userAnswerBlock.appendChild(answerInfo);
  userAnswerBlock.appendChild(userAnswerText);
  userAnswerBlock.appendChild(userAnswerIcon);
  chatBlock.appendChild(userAnswerBlock);
}
