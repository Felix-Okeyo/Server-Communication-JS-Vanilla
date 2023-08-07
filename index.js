//The logic begins with first fetching the tweets and populating the 'timeline'
//The second part tackles the form submission


const twitterTimeline = document.getElementById('timeline') 
//This selects the element to populate by id and stores that in a variable

//Then does the fetch to get the data from the db.json
fetch ("http://localhost:3000/tweets") //takes the server url as a parameter
.then(response => response.json())    //passes a callback function that converts the promise/response into json format data
.then(data => timelineData(data))    //then then passes the data to the function timelineData as a variable


//This function creates and maps the individual tweets in the server on the timeline
let timelineData = (data) =>{  //This functions passes an arrow function that handles the data storage of the tweets and populating the 'timeline' and takes the fetched data as a parameter
    data.map(item =>{         //The map function is called to map through the server data te replicate each tweet
        let allTweets = document.createElement('div') //this variable stores the created element upon which the individual tweets will be created and mapped in
 allTweets.innerHTML = //this section designs/marks the individual tweet using string interpolation of the individual components and how they are mapped
        `   
    <div id="wholetweet">
        <h5>@${item.username}</h5>
        <div class="belowusername">
          <p>${item.content}</p>
          <br>
        <div class= "buttons">
            <button id="demLikes">${item.likes} likes</button>
            <button id="demRetweets">${item.retweets} retweets</button>
        </div>
          <p> 
          <span>${item.timestamp}</span> 
          <p/>
        </div>
    </div>
     `
     twitterTimeline.appendChild(allTweets)  //this function selects the selected item hardcoded in the html file "twitterTimeline", 
                                            // then through the appendChild method, pastes or populates the designed allTweets in the dom to the selected element
    })
}


//The second part handles the form submissions 
//first select the form element for handling the adding of a new tweet
const newTweet = document.getElementById('tweetform') 
let addNewTweet = () =>{     //this function adds and handles event listening based on the data stored in the db.json file
    let username = document.getElementById('username').value
    let content = document.getElementById("content").value
    let likes = document.getElementById('nolikes').defaultValue= "0";  //sets default values because by the time of tweeting the likes numbers stand at zero
    let retweets = document.getElementById('noretweets').defaultValue= "0";  //sets default values because by the time of tweeting the retweet numbers stand at zero
    let timestamp = document.getElementById('timesent').value

  let tweetData = {
     username: username,
     content: content,
     likes:likes,
     retweets:retweets, 
     timestamp: timestamp
 }


 fetch ("http://localhost:3000/tweets", {
    method:"POST",
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(tweetData)
 })
   .then(response => response.json())
 }
  newTweet.addEventListener('submit',addNewTweet)



