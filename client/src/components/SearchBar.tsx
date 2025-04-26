import React from "react"

interface FilterProps {
    movieName?: string,
    directorName?: string,
    actorName?: string,
    generIds?: string
}

export default function SearchBar() {
    const [filters, setFilters] = React.useState<FilterProps>({});
    return(
        <div>

        </div>
    )
}