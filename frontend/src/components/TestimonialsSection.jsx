import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5002/api/testimonials")
      .then(res => res.json())
      .then(setTestimonials)
      .catch(() => setTestimonials([]));
  }, []);
  

  const minSwipeDistance = 50;

  const handlePrev = () => setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const handleNext = () => setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    else if (distance < -minSwipeDistance) handlePrev();
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">What Our Users Say</p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Hear from students and startups who have found success with LaunchPad.
          </p>
          <button
            className="mt-6 px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={() => navigate("/add-testimonial")}
          >
            Add Testimonial
          </button>
        </div>

        <div
          className="mt-12 relative max-w-3xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial._id || testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 italic mb-6">"{testimonial.content}"</blockquote>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-500 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white rounded-full shadow-lg p-2 text-gray-800 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white rounded-full shadow-lg p-2 text-gray-800 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                  activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
