import {useState} from "react";

interface FilterProps {
    movieName?: string,
    directorName?: string,
    actorName?: string,
    generIds?: string
}

export default function SearchBar() {
    const [filters, setFilters] = useState<FilterProps>({});
    return(
        <div>

        </div>
    )
}