import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqs = [
    {
      question: 'What is the significance of henna? Why should I get henna?',
      answer: 'Henna has been used to adorn bodies as part of traditional and holiday celebrations for many years now. In many cultures, it is regarded as a blessing, and applied for luck as well as joy and beauty. There are various stories and folk lores. In India, it is said that the deeper the colour of a bride’s henna stain color, the more her husband (some say mother-in-law) will love her!',
    },
    {
      question: 'Is the process painful? How does it compare to getting a tattoo?',
      answer: 'Henna application is painless and quite different from getting a tattoo. It involves applying a paste to the skin which then stains the skin temporarily.',
    },
    {
      question: 'Is henna applied only on the hands and feet?',
      answer: 'While henna is traditionally applied to the hands and feet, it can be applied to other parts of the body as well.',
    },
    {
      question: 'How long is the application process?',
      answer: 'The application process can take anywhere from a few minutes to a few hours, depending on the complexity and size of the design.',
    },
    {
      question: 'How can I get an amazing henna stain?',
      answer: 'To get a deep, dark henna stain, ensure that the paste is of good quality, the application is done correctly, and the paste is left on the skin for the recommended time.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">FAQ</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-300 mb-4">
          <div
            className={`flex justify-between items-center p-3 bg-gray-800 text-white cursor-pointer rounded-md ${activeIndex === index ? '' : 'hover:bg-gray-700 hover:shadow-md'}`}
            onClick={() => toggleFAQ(index)}
            style={{ transition: 'background-color 0.3s, box-shadow 0.3s', borderRadius: '18px' }}
          >
            <h4 className="text-lg mb-4 font-medium">{faq.question}</h4>
            <div>
              {activeIndex === index ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          {activeIndex === index && (
            <div className="p-4 bg-white text-black rounded-b-md">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
