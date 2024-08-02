import { createReview } from "./review.js";

// 본인의 API 키를 넣어주셔야 합니다.
const API_KEY = "5c8a9b1eb3226789d2118422302ef310";
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

fetch(url)
    .then((Response) => console.log("response :", response))
    .catch((error) => console.log("error: ", error));
