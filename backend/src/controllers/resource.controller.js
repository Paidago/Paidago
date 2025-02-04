import { INSTAGRAM_TOKEN } from "../config.js";
import axios from 'axios'

export const getPosts = async (req, res) => {
    try{
        const info = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${INSTAGRAM_TOKEN}`);
        console.log(info)
        const posts = await axios.get(`https://graph.instagram.com/${info.data.id}/media?fields=id,media,caption,media_url,media_type&access_token=${INSTAGRAM_TOKEN}`);
        
        return res.status(200).json(posts.data);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}