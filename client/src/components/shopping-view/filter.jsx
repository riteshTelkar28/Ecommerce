import { Fragment } from "react"
import { filterOptions } from "../config"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Separator } from "../ui/separator"

function ProductFilter({filters,handleFilter}){
    return(
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filterOptions).map(keyItem =>
                        <Fragment>
                            <div>
                                <h3 className="text-  font-bold">{keyItem}</h3>
                                <div className="grid gap-2 mt-2">
                                    {
                                        filterOptions[keyItem].map(options => 
                                        <Label className='flex items-center font-medium gap-4'>
                                        <Checkbox
                                        checked ={
                                            filters && Object.keys(filters).length> 0 && filters[keyItem] && filters[keyItem].indexOf(options.id) > -1
                                        }
                                        onCheckedChange={()=>handleFilter(keyItem,options.id)}
                                        />
                                        {
                                            options.label
                                        }
                                        </Label> 
                                    )
                                    }
                                </div>
                            </div>
                            <Separator/>

                        </Fragment>
                     )
                }
            </div>
        </div>
    )
}

export default ProductFilter