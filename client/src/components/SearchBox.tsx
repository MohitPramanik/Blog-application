import { memo, useState } from "react";
import { InputGroup, Form } from "react-bootstrap";


type SearchBoxProp = {
    handleSearch: (search: string) => void
}

const SearchBox: React.FC<SearchBoxProp> = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(searchText);
    }

    return (
        <InputGroup as={"form"} onSubmit={handleSubmit} className="search-input">
            <InputGroup.Text as={"button"} className="bg-white border-end-0">
                🔍
            </InputGroup.Text>
            <Form.Control
                placeholder="Search blogs by title, content, or author..."
                value={searchText}
                onChange={handleChange}
                className="border-start-0"
            />
        </InputGroup>
    )
}

export default memo(SearchBox);