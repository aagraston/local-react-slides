import { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<string[]>([]);

  // Dynamically import all HTML files from the slides folder
  useEffect(() => {
    const importSlides = async () => {
      const slideFiles = import.meta.glob('./slides/*.html', { query: '?raw', import: 'default' });
      const loadedSlides = await Promise.all(
        Object.values(slideFiles).map((loadSlide) => 
          loadSlide().then((mod) => mod as string))
      );
      setSlides(loadedSlides);
    };

    importSlides();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (event.key === "ArrowLeft" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="slides-container" tabIndex={0} onKeyDown={handleKeyDown}>
      <div
        className="slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            className="slide"
            key={index}
            dangerouslySetInnerHTML={{ __html: slide }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;