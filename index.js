//The logic begins with first fetching the tweets and populating the 'timeline'
//The second part tackles the form submission
//The last part addresses making the tweets dynamic whenever one likes or 'retweets' them.


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

let natureofTwitter = () =>{     //this function handles event listening based on the data taken in the db.json file
    let username = document.getElementById('username').value
}