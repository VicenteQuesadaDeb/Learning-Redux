//YouTube Video on PLAIN JS

const redux = require("redux")

/*-----------------Action creators-----------------*/

function addTag(tag) {
    return {
        type: "ADD_TAG",
        payload: tag
    }
}

function removeTag(tag) {
    return {
        type: "REMOVE_TAG",
        payload: tag
    }
}

function setVideoTitle(title) {
    return {
        type: "SET_VIDEO_TITLE",
        payload: title
    }
}

function addUpVote() {
    return{
        type: "ADD_UP_VOTE"
    }
}

function addDownVote() {
    return{
        type: "ADD_DOWN_VOTE"
    }
}

const initialState = {
    tags: [],
    youtubeVideo: {
        title: "",
        viewCount: 0,
        votes: {
            up: 0,
            down: 0
        }
    }
}

/*-----------------------------------------*/

console.log(initialState)
//{tags: [], youtubeVideo: {title: "", viewCount: 0, votes: {up: 0, down: 0}}}


/*-----------------Reducer-----------------*/

function reducer(state = initialState, action) {
    switch(action.type) {
        case "ADD_TAG":
            return {
                //Destructuring so we don't override the previous state
                ...state,
                //Same with previous tags
                tags: [...state.tags, action.payload]
            }
        case "REMOVE_TAG": {
            //We want to remove a specific tag, so we need to check this out. We use toLowerCase() to fix the 
            //possible variation name problems          
            const updatedArr = state.tags.filter(thing => thing.toLowerCase() !== action.payload.toLowerCase())
            return {
                ...state,
                tags: updatedArr
            }
        }
        case "SET_VIDEO_TITLE":
            return {
                ...state,
                youtubeVideo: {
                    ...state.youtubeVideo,
                    title: action.payload
                }
            }
        case "ADD_UP_VOTE":
            return{
                ...state,
                youtubeVideo:{
                    ...state.youtubeVideo,
                    votes: {
                        ...state.youtubeVideo.votes,
                        up: state.youtubeVideo.votes.up + 1
                    }                    
                }
            }
         case "ADD_DOWN_VOTE":
            return{
                ...state,
                youtubeVideo:{
                    ...state.youtubeVideo,
                     votes: {
                         ...state.youtubeVideo.votes,
                        down: state.youtubeVideo.votes.down + 1
                    }                    
                }
            }
        default:
            return state
    }
}

/*---------------------------------------*/

/*-----------------Store-----------------*/

const store = redux.createStore(reducer)
store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(setVideoTitle("Learn Redux"))
//{tags: [], youtubeVideo: {viewCount: 0, votes: {up: 0, down: 0}, title: "Learn Redux"}}
store.dispatch(addUpVote())
//{tags: [], youtubeVideo: {viewCount: 0, title: "Learn Redux", votes: {down: 0, up: 1}}}
store.dispatch(addUpVote())
//{tags: [], youtubeVideo: {viewCount: 0, title: "Learn Redux", votes: {down: 0, up: 2}}}
store.dispatch(addUpVote())
//{tags: [], youtubeVideo: {viewCount: 0, title: "Learn Redux", votes: {down: 0, up: 3}}}
store.dispatch(addDownVote())
//{tags: [], youtubeVideo: {viewCount: 0, title: "Learn Redux", votes: {up: 3, down: 1}}}
store.dispatch(addTag("Code"))
//{youtubeVideo: {viewCount: 0, title: "Learn Redux", votes: {up: 3, down: 1}}, tags: ["Code"]}
store.dispatch(addTag("Hilarious"))
//{youtubeVideo: {viewCount: 0, title: "Learn Redux", votes: {up: 3, down: 1}}, tags: ["Code", "Hilarious"]}
store.dispatch(removeTag("Hilarious"))
//{youtubeVideo: {viewCount: 0, title: "Learn Redux", votes: {up: 3, down: 1}}, tags: ["Code"]}
