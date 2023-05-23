import { useState, useEffect } from "react";
import { Container } from './App.styled';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { fetchImages } from '../../servises/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query) fetchImg();

    async function fetchImg() {
      setIsLoading(true);
      try {
          const { hits, total, totalHits } = await fetchImages(query, page);

          if (total === 0) {
              const error = new Error('There are no images...')
              setError(error);
              return;
          };

        setGallery(prev =>  [...prev, ...hits]);
        setTotalPages(Math.floor(totalHits / 12));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      };
    };
  }, [page, query]);
  
  const handleSearchImage = searchQuery => {
    if (searchQuery === query) {
      toast(`You can enter something`)
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setGallery([]);
    setError(null);
  };

  const handleClickLoadMore = () => setPage(prevPage => prevPage + 1);

  return (
      <Container>
        <Searchbar onSubmit={handleSearchImage} />
        {isLoading && <Loader />}
        {error && toast(`${error.message}`)}
        { gallery.length > 0 && <ImageGallery gallery={gallery} />}
        { gallery.length > 0 && page < totalPages && <Button onClick={handleClickLoadMore}>Load more</Button>}
        <ToastContainer autoClose =  {1000}/>
      </Container>
    );
};