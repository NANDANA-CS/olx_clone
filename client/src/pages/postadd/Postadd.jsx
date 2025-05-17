import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/navbar/Nav';
import Foot from '../../components/footer/Foot';

const Postadd = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const subcategories = {
    Cars: ['Cars'],
    Bike: ['Bikes'],
    'Electronics & Appliances': ['Mobile', 'Laptops'],
  };

  const handleSubcategoryClick = (subcategory, event) => {
    event.stopPropagation();
    console.log('Navigating to subcategory:', subcategory); 
    switch (subcategory) {
      case 'Cars':
        navigate('/addcar');
        break;
      case 'Bikes':
        navigate('/bike');
        break;
      case 'Mobile':
        navigate('/mobile');
        break;
      case 'Laptops':
        navigate('/laptop');
        break;
      default:
        navigate('/postadd');
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow px-4 xs:px-6 sm:px-8 py-6">
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-center my-4">POST YOUR AD</h2>
        
        <div className="w-full max-w-4xl mx-auto border shadow-sm">
          <div className="w-full text-base xs:text-lg sm:text-xl flex items-center p-3 xs:p-4 sm:p-6 border-b">
            CHOOSE A CATEGORY
          </div>
          
       
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r">
              <ul className="w-full">
                <li
                  className="border-b flex items-center text-[#8d9094] hover:text-[#020812] p-3 xs:p-4 sm:p-5 fill-[#8d9094] hover:fill-[#020812] cursor-pointer"
                  onClick={() => toggleCategory('Cars')}
                  aria-label="Select Cars category"
                >
                  <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd" className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6">
                    <path
                      className="rui-UJ1uk"
                      d="M744.747 124.16l38.4 33.28 36.949 258.731 107.221 107.179 11.349 27.435v193.963l-38.827 38.784h-38.741v116.352h-77.568v-116.352h-543.061v116.352h-77.568v-116.352h-38.741l-38.827-38.827v-193.877l11.349-27.435 107.264-107.221 36.949-258.731 38.4-33.28h465.493zM768.555 474.325h-513.109l-92.544 92.501v139.093h698.197v-139.093l-92.544-92.501zM298.667 550.784c32.128 0 58.197 26.027 58.197 58.197 0 32.128-26.027 58.155-58.197 58.155-32.128 0-58.197-26.027-58.197-58.155s26.027-58.197 58.197-58.197zM725.333 550.784c32.128 0 58.197 26.027 58.197 58.197 0 32.128-26.027 58.155-58.197 58.155-32.128 0-58.197-26.027-58.197-58.155s26.027-58.197 58.197-58.197zM711.083 201.685h-398.165l-27.904 195.115h453.888l-27.861-195.072z"
                    />
                  </svg>
                  <p className="flex-grow text-sm xs:text-base sm:text-[16px] px-2 xs:px-3 sm:px-4">Cars</p>
                  <svg width="20px" height="20px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd" className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5">
                    <path className="rui-UJ1uk" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z" />
                  </svg>
                </li>
                
                <li
                  className="border-b flex items-center text-[#8d9094] hover:text-[#020812] p-3 xs:p-4 sm:p-5 fill-[#8d9094] hover:fill-[#020812] cursor-pointer"
                  onClick={() => toggleCategory('Bike')}
                  aria-label="Select Bike category"
                >
                  <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd" className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6">
                    <path
                      className="rui-UJ1uk"
                      d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"
                    />
                  </svg>
                  <p className="flex-grow text-sm xs:text-base sm:text-[16px] px-2 xs:px-3 sm:px-4">Bike</p>
                  <svg width="20px" height="20px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd" className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5">
                    <path className="rui-UJ1uk" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z" />
                  </svg>
                </li>
                
                <li
                  className="border-b flex items-center text-[#8d9094] hover:text-[#020812] p-3 xs:p-4 sm:p-5 fill-[#8d9094] hover:fill-[#020812] cursor-pointer"
                  onClick={() => toggleCategory('Electronics & Appliances')}
                  aria-label="Select Electronics & Appliances category"
                >
                  <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd" className="flex-shrink-0 w-5 h-5 xs:w-6 xs:h-6">
                    <path
                      className="rui-UJ1uk"
                      d="M149.76 128l-64.427 62.848v480.853l69.333 67.84h317.781l0.725 75.477h-169.6v80.981h416.128v-80.981h-161.621l-0.683-75.435h315.648l65.621-68.693v-482.389l-75.733-60.501h-713.173zM170.24 638.72v-414.848l15.232-14.848h646.656l21.632 17.28v413.184l-18.176 19.072h-645.12l-20.224-19.84z"
                    />
                  </svg>
                  <p className="flex-grow text-sm xs:text-base sm:text-[16px] px-2 xs:px-3 sm:px-4">Electronics & Appliances</p>
                  <svg width="20px" height="20px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd" className="flex-shrink-0 w-4 h-4 xs:w-5 xs:h-5">
                    <path className="rui-UJ1uk" d="M277.333 85.333v60.331l366.336 366.336-366.336 366.336v60.331h60.331l409.003-408.981v-35.307l-409.003-409.045z" />
                  </svg>
                </li>
              </ul>
            </div>
            
            {/* sub*/}
            <div className="w-full md:w-1/2 bg-gray-50 md:bg-white">
              {selectedCategory && (
                <ul className="w-full">
                  {subcategories[selectedCategory].map((subcategory, index) => (
                    <li
                      key={index}
                      className="border-b flex items-center text-[#8d9094] p-3 xs:p-4 sm:p-5 hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => handleSubcategoryClick(subcategory, e)}
                      aria-label={`Select ${subcategory} subcategory`}
                    >
                      <p className="flex-grow text-sm xs:text-base sm:text-[16px] px-2 xs:px-3 sm:px-4">{subcategory}</p>
                    </li>
                  ))}
                </ul>
              )}
              {!selectedCategory && (
                <div className="hidden md:flex h-full items-center justify-center p-8 text-gray-400">
                  <p>Select a category to view options</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  )
}

export default Postadd