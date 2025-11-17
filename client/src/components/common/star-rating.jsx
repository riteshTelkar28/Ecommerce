import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({rating,handleRatingChange}){
    return(
        [1,2,3,4,5].map((star) => (<Button onClick={()=> handleRatingChange(star)} className={`p-2 rounded-full transition-colors ${star <= rating ? 'text-yellow-400 hover:bg-black' :'text-black hover:bg-black hover:text-white' }`} size={'icon'} variant={'outline'}>
            <StarIcon className={`h-6 w-6 ${star<=rating ? 'fill-yellow-500': 'fill-black'}`} />
        </Button>))
    )
}

export default StarRatingComponent;