import React, { useState } from "react";
// import "./SearchForm.css";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

const Search = ({ searchFor }) => {
    // console.debug("SearchBar", "searchFor=", typeof searchFor);

    const [search, setSearch] = useState("");

    /** Tell parent to filter */
    const handleSubmit = evt => {
        // take care of accidentally trying to search for just spaces
        evt.preventDefault();
        searchFor(search.trim() || undefined);
        setSearch(search.trim());
    }

    /** Update form fields */
    const handleChange = evt => {
        setSearch(evt.target.value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-lg flex-grow-1"
                    name="searchTerm"
                    placeholder="Enter search term.."
                    value={search}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-lg btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Search;