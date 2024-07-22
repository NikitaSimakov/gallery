import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const usePagination = (url, pageSize) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setSearchParams({ page: currentPage })
      try {
        const countResponse = await axios.get(`${url}&aggregate[count]=*`);
        const totalCount = countResponse.data.data[0].count;
        const dataResponse = await axios.get(url, {
          params: {
            limit: pageSize,
            page: currentPage,
          },
        });
        setData(dataResponse.data.data);
        setTotalPages(Math.ceil(totalCount / pageSize));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, currentPage, pageSize]);

  return {
    data,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
  };
};

export default usePagination;
