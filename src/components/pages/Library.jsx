import { useEffect, useState } from "react";
import { fetchMangas } from "../../service/service_api";
import Cards from "../Cards";
import CardRow from "../CardRow";
import Categories from "../Categories";
import Genres from "../Genres";
import SelectRow from "../SelectRow";
import SkeletonCard from "../SkeletonCard";
import SkeletonCardRow from "../SkeletonCardRow";

// Nombre d'élément à afficher par page
const ITEMS_PER_PAGE = 10;

const Library = () => {
  const [pageOffset, setPageOffset] = useState(0);
  const [mangas, setMangas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [view, setView] = useState("module");

  /**
   * Transforme l'objet filters en queryString :
   * { categories: ['toto'] } = filter[categories]=toto
   */
  function filtersToQueryString() {
    const filters = {
      categories: [...selectedGenre, selectedCategory],
    };

    // Ajout d'autres filtres : filters.author = 'toto'

    const queryString = [];

    Object.keys(filters).forEach((filter) => {
      const filterValue = filters[filter];

      if (Array.isArray(filterValue) && filterValue.length) {
        const filterValueString = filterValue.join(",");

        if (filterValueString) {
          queryString.push(`filter[${filter}]=${filterValueString}`);
        }
      } else if (typeof filterValue === "string" && filterValue) {
        queryString.push(`filter[${filter}]=${filterValue}`);
      }
    });

    if (!queryString.length) {
      return "";
    }

    return `&${queryString.join("&")}`;
  }

  function resetMangas() {
    setMangas([]);
    setPageOffset(0);
  }

  const scrollHandler = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageOffset(pageOffset + ITEMS_PER_PAGE);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  });

  useEffect(() => {
    setIsLoading(true);
    fetchMangas(ITEMS_PER_PAGE, pageOffset, filtersToQueryString()).then(
      (data) => {
        if (data !== undefined) {
          setMangas([...mangas, ...data]);
          setIsLoading(false);
        }
      }
    );
  }, [selectedCategory, selectedGenre, pageOffset]);

  const onCategoryChange = (category) => {
    if (category !== selectedCategory) {
      resetMangas();
      setSelectedCategory(category);
    }
    if (category === selectedCategory) {
      resetMangas();
      setSelectedCategory("");
    }
  };

  const onGenreChange = (event) => {
    resetMangas();

    const {
      target: { value },
    } = event;

    setSelectedGenre(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onViewChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <>
      <div className="library-filter">
        <Categories value={selectedCategory} onChange={onCategoryChange} />
        <Genres value={selectedGenre} onChange={onGenreChange} />
        <SelectRow value={view} onChange={onViewChange} />
      </div>
      <div className="library_container">
        {mangas.map(({ attributes, id }) => {
          return view === "list" ? (
            <CardRow
              attributes={attributes}
              image={attributes.posterImage.original}
              id={id}
            />
          ) : (
            <Cards
              attributes={attributes}
              image={attributes.posterImage.small}
              id={id}
            />
          );
        })}
        {isLoading &&
          (view === "list" ? (
            <>
              <SkeletonCardRow />
              <SkeletonCardRow />
              <SkeletonCardRow />
              <SkeletonCardRow />
              <SkeletonCardRow />
            </>
          ) : (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ))}
      </div>
    </>
  );
};

export default Library;
