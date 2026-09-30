import { Ratelimit } from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

//create a new ratelimiter, that allows 10 requests per 20 seconds
const ratelimit = new Ratelimit({

    redis:Redis.fromEnv(), //use upstash redis instance
    limiter:Ratelimit.slidingWindow(10,"20 s"), //allow 10 requests per 20 seconds
})

export default ratelimit;