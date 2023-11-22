//The logic begins with first fetching the tweets and populating the 'timeline'
//The second part tackles the form submission

tweetsDataUrl = "https://twitter-vanilla-json.onrender.com";

const twitterTimeline = document.querySelector(".timeline");
//This selects the element to populate by id and stores that in a variable

//Then does the fetch to get the data from the db.json
fetch("https://twitter-vanilla-json.onrender.com/tweets") //takes the server url as a parameter
  .then((response) => response.json()) //passes a callback function that converts the promise/response into json format data
  .then((data) => timelineData(data)); //then then passes the data to the function timelineData as a variable

//This function creates and maps the individual tweets in the server on the timeline
let timelineData = (data) => {
  //This functions passes an arrow function that handles the data storage of the tweets and populating the 'timeline' and takes the fetched data as a parameter
  data.map((item) => {
    //The map function is called to map through the server data te replicate each tweet
    let tweets = document.createElement("div"); //this variable stores the created element upon which the individual tweets will be created and mapped in
    tweets.innerHTML =
      //this section designs/marks the individual tweet using string interpolation of the individual components and how they are mapped
      `   
    <div class="wholetweet" data-id=${item.id}>
        <h5 class="handle" >@${item.username}</h5>
        <div class="belowusername">
          <p class ="expressions">${item.content}</p>
          <br>
        <div class= "buttons">
            <button id="demLikes">${item.likes} likes</button>
            <button id="demRetweets">${item.retweets} retweets</button>
        </div>
          <p> 
          <span class ="tweeted-time">${item.timestamp}</span> 
          <p/>
        <div class="tweet-menu">
              <button class="tweet-menu-button">...</button>
              <div class="tweet-dropdown">
              <button class="edit-button" id='edit-post'>Edit</button>
              <button class="delete-button" id ='delete-post'>Delete</button>
              </div>
        </div>
    </div>
     `;
    twitterTimeline.appendChild(tweets); //this function selects the selected item hardcoded in the html file "twitterTimeline",
    // then through the appendChild method, pastes or populates the designed tweets in the dom to the selected element
  });
};

//The second part handles the form submissions
//first select the form element for handling the adding of a new tweet
const newTweet = document.getElementById("tweetform");
let addNewTweet = (tweets) => {
  //this function adds and handles event listening based on the data stored in the db.json file
  let username = document.getElementById("username").value;
  let content = document.getElementById("content").value;
  let likes = (document.getElementById("nolikes").defaultValue = "0"); //sets default values because by the time of tweeting the likes numbers stand at zero
  let retweets = (document.getElementById("noretweets").defaultValue = "0"); //sets default values because by the time of tweeting the retweet numbers stand at zero
  let timestamp = document.getElementById("timesent").value;

  //The tweetData variable then stores all the event listeners taking in each event from the form
  let tweetData = {
    username: username,
    content: content,
    likes: likes,
    retweets: retweets,
    timestamp: timestamp,
  };
  //The tweetData is them 'posted' or added in db.json server and the timeline updated
  fetch("https://twitter-vanilla-json.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tweetData),
  }).then((response) => response.json());
};
newTweet.addEventListener("submit", addNewTweet);

//The second section covers delete request and patch requests
twitterTimeline.addEventListener("click", (e) => {
  e.preventDefault();
  let deleteButtonPressed = e.target.id == "delete-post"; //select the delete button and ensure it is the tweet delete button pressed and store info
  let editButtonPressed = e.target.id == "edit-post"; // do the same for an edit button when pressed
  let tweetParent = e.target.closest(".wholetweet"); //navigate to the parent tweet to select the whole div before either editing or deleting
  let tweetId = tweetParent.getAttribute("data-id");

  //perform a logic that handles the delete if the delete the button is pressed
  if (deleteButtonPressed) {
    fetch(`https://twitter-vanilla-json.onrender.com/tweets/${tweetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  }
  if (editButtonPressed) {
    let twitterHandle = tweetParent.querySelector(".handle").textContent;
    let tweetContent = tweetParent.querySelector(".expressions").textContent;
    let timestamp = tweetParent.querySelector(".tweeted-time").textContent;

    username.value = twitterHandle;
    content.value = tweetContent;
    timestamp.value = timestamp;

    let updates = {
      username: username.value,
      content: content.value,
      timestamp: timestamp.value,
      retweets: retweets,
      likes: likes,
    };

    //now we update the existing post
    //grab the edit button
    const changeTweet = document.querySelector(".submit-btn");
    changeTweet.addEventListener("click", () => {
      fetch(`https://twitter-vanilla-json.onrender.com/tweets/${tweetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }).then((res) => res.json());
    });
  }
});

// // const tweetsContainer = docment.getElementById("timeline");
// // tweetsContainer
// //   .querySelector(".edit-button")
// //   .addEventListener("click", (event) => {
// //     event.preventDefault();
// //     //we select the edit button, add a click type of event and pass a default function of preventing auto page reload once the event happens
// //     let editTweetForm = document.createElement("div");
// //     //We first create the item and store that data in a variable editTweetForm: a form because we want to do a resubmission really like an update
// //     editTweetForm.innerHTML =
// //       //By interpolating we return the similar form as hardcoded in the html for the user to update the submission
// //       `
// //     <form class = "update-tweet">
// //       <div>
// //         <div>
// //           <input class= "edit-username" type="text" placeholder="Your twitter handle">
// //         </div>
// //         <div>
// //            <input class= "edit-content" type="text" placeholder="Type up to 300 characters">
// //         </div>
// //         <div class="edit-otheritems">
// //           <input class="edit-timesent" type="datetime-local" placeholder="YYYY-MM-DD HR:MM:SS">
// //           <input id="edit-nolikes" type="number" placeholder="You currently have zero likes, make it go viral">
// //           <input class="edit-noretweets" type="number" placeholder="Your retweets start at zero make the tweet fun.">
// //         </div>
// //         <div>
// //           <button type="submit">Update Tweet</button>
// //         </div>
// //       </div>
// //     </form>
// //     `;
// //     tweetsContainer.appendChild(editTweetForm);
// //     //We then add or append the created form to the tweets/timeline so that once the click events happens on the edit button it is presented
// //     //Now we handle the update by repeating the same thing as a post
// //     const updateTweetDiv = document.querySelector(".update-tweet");
// //     updateTweetDiv.addEventListener("submit", (event) => {
// //       event.preventDefault();
// //       const updatedUsername = document.querySelector(".edit-username").value;
// //       const updatedContent = document.querySelector(".edit-content").value;
// //       const updatedLikes = document.querySelector("#edit-nolikes").value;
// //       const updatedRetweets = document.querySelector(".edit-noretweets").value;
// //       const updatedTimestamp = document.getElementById("edit-timesent").value;

// //       const updatedTweetData = {
// //         username: updatedUsername,
// //         content: updatedContent,
// //         likes: updatedLikes,
// //         retweets: updatedRetweets,
// //         time: updatedTimestamp,
// //       };

// //       let editUrl = `${tweetsDataUrl}/${i.id}`;

// //       fetch(editUrl, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(updatedTweetData),
// //       }).then((response) => response.json());
// //     });
// //   })
