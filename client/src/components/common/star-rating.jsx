import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent(){
    return(
        [1,2,3,4,5].map((star) => (<Button size={'icon'} variant={'outline'}>
            <StarIcon/>
        </Button>))
    )
}

export default StarRatingComponent;