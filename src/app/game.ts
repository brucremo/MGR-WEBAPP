import { Review } from "src/app/review";

export class Game {
    id: string;
    name: string;
    summary: string;
    developers: any[];
    cover: any;
    rating: number;
    screenshots: any[];
    reviews: Review[];
}
