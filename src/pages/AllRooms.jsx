import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input 
        type="checkbox" 
        checked={selected} 
        onChange={(e) => onChange(e.target.checked, label)} 
        className="accent-indigo-600"
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input 
        type="radio" 
        name='SortOption' 
        checked={selected} 
        onChange={() => onChange(label)} 
        className="accent-indigo-600"
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false)
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState(null)
  const [sortOption, setSortOption] = useState(null)
  
  const roomTypes = [
    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Family Suite",
  ];
  
  const priceRanges = [
    '0 - 500',
    '500 - 1000',
    '1000 - 3000',
    '2000 - 5000',
  ];
  
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First"
  ];

  const handleRoomTypeChange = (checked, type) => {
    if (checked) {
      setSelectedRoomTypes([...selectedRoomTypes, type])
    } else {
      setSelectedRoomTypes(selectedRoomTypes.filter(t => t !== type))
    }
  }

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range === selectedPriceRange ? null : range)
  }

  const handleSortChange = (option) => {
    setSortOption(option === sortOption ? null : option)
  }

  const clearFilters = () => {
    setSelectedRoomTypes([])
    setSelectedPriceRange(null)
    setSortOption(null)
  }

  return (
    <div className='flex flex-col lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32 gap-8'>
      {/* Main Content */}
      <div className='w-full lg:w-3/4'>
        <div className='flex flex-col items-start text-left mb-8'>
          <h1 className='font-playfair text-4xl md:text-5xl text-gray-800'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray-500 mt-2 max-w-2xl'>
            Take advantage of our limited-time offer and special packages to enhance
            your stay and create unforgettable memories.
          </p>
        </div>
        
        {roomsDummyData.map((room) => (
          <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-8 border-b border-gray-200 last:border-0'>
            <img 
              onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }} 
              src={room.images[0]} 
              alt="hotel" 
              className='w-full md:w-1/2 h-64 rounded-xl shadow-md object-cover cursor-pointer hover:shadow-lg transition-shadow duration-300'
            />
            
            <div className='w-full md:w-1/2 flex flex-col gap-3'>
              <p className='text-gray-500 text-sm'>{room.hotel.city}</p>
              <h2 
                onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }}
                className='text-gray-800 text-2xl font-playfair cursor-pointer hover:text-indigo-600 transition-colors'
              >
                {room.hotel.name}
              </h2>
              
              <div className='flex items-center'>
                <StarRating rating={room.rating} />
                <p className='ml-2 text-gray-600 text-sm'>{room.reviews} reviews</p>
              </div>
              
              <div className='flex items-center gap-2 text-gray-500 mt-1 text-sm'>
                <img src={assets.locationIcon} alt='location' className='w-4 h-4'/> 
                <span>{room.hotel.address}</span>
              </div>
              
              <div className='flex flex-wrap items-center mt-3 mb-4 gap-3'>
                {room.amenities.map((item, index) => (
                  <div key={index} className='flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50'>
                    <img src={facilityIcons[item]} alt={item} className='w-4 h-4' />
                    <p className='text-xs text-indigo-800'>{item}</p>
                  </div>
                ))}
              </div>
              
              <div className='mt-auto'>
                <p className='text-xl font-medium text-indigo-700'>
                  ${room.pricePerNight} <span className='text-sm font-normal text-gray-500'>/ night</span>
                </p>
                <button 
                  onClick={() => { navigate(`/rooms/${room._id}`); window.scrollTo(0, 0) }}
                  className='mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm'
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Filters Sidebar */}
      <div  className="flex flex-col lg:flex-row gap-4">
      <div className='bg-white w-80 border border-gray-300 text-gray-600 order-1 lg:order-none'>
        <div className={`flex items-center justify-between px-5 py-3 border-b border-gray-200 ${openFilters && "border-b"}`}>
          <p className='text-base font-medium text-gray-800'>Filters</p>
          <div className='flex gap-2'>
            <span 
              onClick={clearFilters}
              className='mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm lg:inline'
            >
              Clear all
            </span>
            <span 
              onClick={() => setOpenFilters(!openFilters)} 
              className='mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm lg:hidden'
            >
              {openFilters ? 'Hide' : 'Show'}
            </span>
          </div>
        </div>
        
        <div className={`${openFilters ? 'block' : "hidden lg:block"} px-5 py-4`}>
          {/* Room Types Filter */}
          <div className='mb-6'>
            <p className='font-medium text-gray-800 pb-2'>Room Types</p>
            {roomTypes.map((room, index) => (
              <CheckBox 
                key={index} 
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>
          
          {/* Price Range Filter */}
          <div className='mb-6'>
            <p className='font-medium text-gray-800 pb-2'>Price Range</p>
            {priceRanges.map((range, index) => (
              <RadioButton 
                key={index} 
                label={`$${range}`}
                selected={selectedPriceRange === range}
                onChange={handlePriceRangeChange}
              />
            ))}
          </div>
          
          {/* Sort Options */}
          <div className='mb-4'>
            <p className='font-medium text-gray-800 pb-2'>Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton 
                key={index} 
                label={option}
                selected={sortOption === option}
                onChange={handleSortChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AllRooms