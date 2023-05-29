const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
});


const InfoSelectedFields = [
    "title",
    "subscribers",
    "public_description"
]


const PostSelectedFields = [
    "title",
    "selftext",
    "num_comments",
    "score",
    "icon_url",
    "author",
    "is_original_content"
];

function filterObjectFields(originalObject, selectedFields) {
    const newObject = {};
  
    selectedFields.forEach(field => {
      if (originalObject.hasOwnProperty(field)) {
        newObject[field] = originalObject[field];
      }
    });
  
    return newObject;
}


async function getSubredditPosts(subreddit) {
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);
    const posts = response.data.data.children.map(
        child => filterObjectFields(child.data, PostSelectedFields)
    );
    return posts
}


async function getSubredditInfo(subreddit) {
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}/about.json`);

    // There is a bug in reddit api - when using long subreddit name that doesn't exists,
    // no error return, and an empty data returned.
    if (response.data.data.display_name == null) {
        return null
    }

    return filterObjectFields(response.data.data, InfoSelectedFields)
}


async function listRelatedSubredits(subreddit) {
    const response = await axios.get(`https://www.reddit.com/subreddits/search.json?q=${subreddit}`);
    const subreddits = response.data.data.children.map(child => child.data.display_name_prefixed.replace("r\/", ""))
    return subreddits
}


app.get('/api/search/:subreddit', async (req, res) => {
    
    try {
        const subreddit = req.params.subreddit;
        const info = await getSubredditInfo(subreddit)

        // This is a hack to deal with all the errors together. 
        if (info == null) {
            throw new Error('Not Found');
        }

        const posts = await getSubredditPosts(subreddit)
        
        res.json({
            info: info,
            posts: posts
        });

    } catch (error) {
        
        const subreddit = req.params.subreddit;
        
        console.error(`Failed to fetch the given subredit ${subreddit} `);
        
        var related_subreddits = []
        try {
            related_subreddits = await listRelatedSubredits(subreddit)
        } catch {
            console.error(`Couldnt fetch related subriddits to ${subreddit}`)   
        }
        
        var message = ""
        // In case we get Reddit API error
        if (error.response != null) {
            message = error.response.data.message 
            
        // In case: info == null ('Not Found')
        } else {
            message = error.message
        }

        res.status(500).json({
            error: `Couldnt find subreddit '${subreddit}'`,
            message: message, 
            related_subreddits: related_subreddits.slice(0, 10)
        });
        
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})