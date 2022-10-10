import { useEffect, useRef, useState } from "react";
import {
  Container,
  SearchInput,
  IconRightArrow,
  IconMagnifyingGlass,
} from "./styles";

import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function Search() {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput]);

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsHovered(true)
    if (keyword.toLowerCase().trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sm:w-9/12 ">
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          // setKeyword("")
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setKeyword("");
        }}
        hover={showSearchInput}
      >
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          ref={targetRef}
          showSearchInput={showSearchInput}
        />
        {showSearchInput ? <IconRightArrow /> : <IconMagnifyingGlass />}
      </Container>
    </form>
  );
}

export default Search;
