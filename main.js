var story;
function getStory(name) {
  return {
    currentScene: "attack",
    attack: {
      title: "Chapter 1",
      story: `Once upon a time, the village of Cute Puppistan lived in peace. Until one day, it was attacked by Avarice the Angry Aardvark. The Premier of Cute Puppistan, said there's only one person who can save us ${name}.`,
      choices: [
        {
          choice: "Yes, I'm ready to accept!",
          destination: 'battle'
        },
        {
          choice: "Meh, think I'd rather just play video games instead.",
          destination: 'goHome'
        }
      ]
    },
    battle: {
      title: 'The epic battle for Cute Puppistan!',
      story: `It's Avarice the Angry Aardvark, he looks pretty scary...`,
      choices: [
        {
        choice: "Attack him with a sword.",
        destination: 'sword'
        },
        {
        choice: "Attack him with a candlestick.",
        destination: 'candleStick'
        }
      ]
    },
    goHome: {
      title: "Back at home!",
      story: "Yes, you're back in comfort of your own home. Don't worry about it, someone else took care of the problem. No need to at all to feel guilty...",
      image: "video_game.png",
      defaultDestination: 'attack',
      buttonText: "Let's try this again"
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var button = document.querySelector('#start-button')
  var content = document.querySelector('#content')
  button.addEventListener('click', function() {
    var name = document.querySelector('#name-input')
    story = getStory(name.value)
    renderScene()
  })
})

function renderScene() {
  var text = "Next"
  var image = "";
  if (story[story.currentScene].image) {
    image = "<img></img>"
  }
  if (story[story.currentScene].buttonText) {
    text = story[story.currentScene].buttonText
  }
  content.innerHTML = `
  <h1>${story[story.currentScene].title}</h1>
  <p>${story[story.currentScene].story}</p>
  ${image}
  ${getInputs()}
  <button id = "submit-button">${text}</button>
  `
  if (story[story.currentScene].image) {
    document.querySelector("img").src = `./img/${story[story.currentScene].image}`
  }
  var button = document.querySelector("#submit-button");
  button.addEventListener('click', function() {
    getInputValue()
  })
}

function getInputValue() {
  var inputs = document.querySelectorAll('input[type="radio"]');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      story.currentScene = inputs[i].getAttribute('data-destination')
      renderScene();
      return;
    }
  }
  story.currentScene = story[story.currentScene].defaultDestination
  renderScene()
}

function getInputs() {
  var input = ""
  if (!story[story.currentScene].choices) {
    return ""
  }
  for(var i = 0; i < story[story.currentScene].choices.length; i++) {
    input += `
    <div>
      <input data-destination = ${story[story.currentScene].choices[i].destination} id = "radio${i}" type = "radio" name = "choices" />
      <label for "radio${i}">${story[story.currentScene].choices[i].choice}</label>
    </div>`
  }
  return input;
}
