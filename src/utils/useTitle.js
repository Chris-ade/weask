import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Or equivalent from your router

function useTitle(title) {
  const location = useLocation();
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    // Update title based on route
    setDocumentTitle(title);
  }, [location]);

  document.title = documentTitle;
}

export default useTitle;