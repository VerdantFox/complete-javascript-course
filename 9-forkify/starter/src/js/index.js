import axios from 'axios';

async function getResults(query) {
    try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        console.log(res);
        const recipies = res.request.response
        console.log(recipies)
    } catch(error) {
        alert(error);
    }
}
let query = "pasta";
getResults(query);