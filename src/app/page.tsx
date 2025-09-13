
'use client'
import Image from "next/image";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Calendar, Users, CheckCircle, AlertCircle } from 'lucide-react';

const FestivalTicketingPlatform = () => {
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [cart, setCart] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Mock events data - in real app, this would come from your backend
  const events = {
    AM: [
      { id: 'am1', name: 'Morning Yoga Session', time: '8:00 AM', capacity: 50 },
      { id: 'am2', name: 'Sunrise DJ Set', time: '9:00 AM', capacity: 100 },
      { id: 'am3', name: 'Coffee & Networking', time: '10:00 AM', capacity: 75 },
      { id: 'am4', name: 'Morning Workshop', time: '11:00 AM', capacity: 40 },
    ],
    PM: [
      { id: 'pm1', name: 'Afternoon Concert', time: '2:00 PM', capacity: 200 },
      { id: 'pm2', name: 'Food Tasting', time: '3:00 PM', capacity: 80 },
      { id: 'pm3', name: 'Art Exhibition', time: '4:00 PM', capacity: 60 },
      { id: 'pm4', name: 'Sunset Performance', time: '6:00 PM', capacity: 150 },
    ],
    DAY: [
      { id: 'day1', name: 'VIP Lounge Access', time: 'All Day', capacity: 30 },
      { id: 'day2', name: 'Meet & Greet', time: '1:00 PM', capacity: 25 },
    ]
  };

  // Fix the events object structure
  const allEvents = {
    AM: [
      { id: 'am1', name: 'Morning Yoga Session', time: '8:00 AM', capacity: 50 },
      { id: 'am2', name: 'Sunrise DJ Set', time: '9:00 AM', capacity: 100 },
      { id: 'am3', name: 'Coffee & Networking', time: '10:00 AM', capacity: 75 },
      { id: 'am4', name: 'Morning Workshop', time: '11:00 AM', capacity: 40 },
    ],
    PM: [
      { id: 'pm1', name: 'Afternoon Concert', time: '2:00 PM', capacity: 200 },
      { id: 'pm2', name: 'Food Tasting', time: '3:00 PM', capacity: 80 },
      { id: 'pm3', name: 'Art Exhibition', time: '4:00 PM', capacity: 60 },
      { id: 'pm4', name: 'Sunset Performance', time: '6:00 PM', capacity: 150 },
    ],
    DAY: [
      { id: 'am1', name: 'Morning Yoga Session', time: '8:00 AM', capacity: 50 },
      { id: 'am2', name: 'Sunrise DJ Set', time: '9:00 AM', capacity: 100 },
      { id: 'am3', name: 'Coffee & Networking', time: '10:00 AM', capacity: 75 },
      { id: 'am4', name: 'Morning Workshop', time: '11:00 AM', capacity: 40 },
      { id: 'pm1', name: 'Afternoon Concert', time: '2:00 PM', capacity: 200 },
      { id: 'pm2', name: 'Food Tasting', time: '3:00 PM', capacity: 80 },
      { id: 'pm3', name: 'Art Exhibition', time: '4:00 PM', capacity: 60 },
      { id: 'pm4', name: 'Sunset Performance', time: '6:00 PM', capacity: 150 },
      { id: 'day1', name: 'VIP Lounge Access', time: 'All Day', capacity: 30 },
      { id: 'day2', name: 'Meet & Greet', time: '1:00 PM', capacity: 25 },
    ]
  };

  const ticketPrices = {
    AM: 45,
    PM: 55,
    DAY: 85
  };

  const getMaxEvents = (any ticketType) => {
    switch(ticketType) {
      case 'AM': return 2;
      case 'PM': return 2;
      case 'DAY': return 4;
      default: return 0;
    }
  };

  const handleTicketTypeSelect = (type) => {
    setSelectedTicketType(type);
    setSelectedEvents([]);
    setCurrentStep(2);
  };

  const handleEventToggle = (event) => {
    const maxEvents = getMaxEvents(selectedTicketType);
    const isSelected = selectedEvents.some(e => e.id === event.id);

    if (isSelected) {
      setSelectedEvents(selectedEvents.filter(e => e.id !== event.id));
    } else if (selectedEvents.length < maxEvents) {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const handleAddToCart = () => {
    if (selectedEvents.length === 0) return;

    const ticket = {
      id: Date.now(),
      type: selectedTicketType,
      events: selectedEvents,
      price: ticketPrices[selectedTicketType]
    };

    setCart([...cart, ticket]);
    setSelectedTicketType('');
    setSelectedEvents([]);
    setCurrentStep(1);
  };

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.email) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make actual API call to your backend
      const orderData = {
        customer: customerInfo,
        tickets: cart,
        total: cart.reduce((sum, ticket) => sum + ticket.price, 0)
      };
      
      console.log('Order submitted:', orderData);
      alert('Order placed successfully! Check your email for confirmation.');
      
      // Reset form
      setCart([]);
      setCustomerInfo({ name: '', email: '', phone: '' });
      setCurrentStep(1);
      
    } catch (error) {
      alert('Error placing order. Please try again.');
    }
    
    setLoading(false);
  };

  const removeFromCart = (ticketId) => {
    setCart(cart.filter(ticket => ticket.id !== ticketId));
  };

  const totalPrice = cart.reduce((sum, ticket) => sum + ticket.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
            Summer Music Festival 2025
          </h1>
          <p className="text-xl text-gray-300">One Day • Multiple Experiences • Unforgettable Memories</p>
          <div className="flex justify-center items-center mt-4 space-x-6 text-sm text-gray-400">
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />June 15, 2025</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />8:00 AM - 10:00 PM</div>
            <div className="flex items-center"><Users className="w-4 h-4 mr-2" />Limited Capacity</div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map(step => (
              <React.Fragment key={step}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 4 && <div className={`w-16 h-1 ${currentStep > step ? 'bg-pink-500' : 'bg-gray-700'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Ticket Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Choose Your Experience</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(ticketPrices).map(([type, price]) => (
                    <div
                      key={type}
                      onClick={() => handleTicketTypeSelect(type)}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-pink-400 transition-all duration-300 cursor-pointer hover:scale-105"
                    >
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">{type} Pass</h3>
                        <div className="text-4xl font-bold text-pink-400 mb-4">${price}</div>
                        <p className="text-gray-300 mb-4">
                          Choose {getMaxEvents(type)} {getMaxEvents(type) === 1 ? 'event' : 'events'}
                        </p>
                        <div className="space-y-2 text-sm text-gray-400">
                          {type === 'AM' && <p>• Morning activities</p>}
                          {type === 'PM' && <p>• Afternoon/evening events</p>}
                          {type === 'DAY' && (
                            <>
                              <p>• All-day access</p>
                              <p>• Premium events included</p>
                            </>
                          )}
                        </div>
                        <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-6 py-3 rounded-full font-semibold transition-all duration-300">
                          Select {type} Pass
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Event Selection */}
            {currentStep === 2 && selectedTicketType && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">Select Your Events</h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{selectedTicketType} Pass - ${ticketPrices[selectedTicketType]}</span>
                    <span className="text-sm text-gray-300">
                      {selectedEvents.length} of {getMaxEvents(selectedTicketType)} events selected
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allEvents[selectedTicketType]?.map(event => {
                    const isSelected = selectedEvents.some(e => e.id === event.id);
                    const canSelect = selectedEvents.length < getMaxEvents(selectedTicketType);
                    
                    return (
                      <div
                        key={event.id}
                        onClick={() => handleEventToggle(event)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isSelected 
                            ? 'bg-pink-500/20 border-pink-400' 
                            : canSelect 
                              ? 'bg-white/5 border-white/20 hover:border-white/40' 
                              : 'bg-gray-800/50 border-gray-600 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{event.name}</h3>
                            <p className="text-sm text-gray-400 mb-2">{event.time}</p>
                            <p className="text-xs text-gray-500">{event.capacity} spots available</p>
                          </div>
                          {isSelected && <CheckCircle className="w-5 h-5 text-pink-400 flex-shrink-0 ml-2" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedEvents.length > 0 && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleAddToCart}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Customer Information */}
            {cart.length > 0 && currentStep < 4 && (
              <div className="mt-12 space-y-6">
                <h2 className="text-3xl font-bold">Customer Information</h2>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-2" />
                Your Cart
              </h3>
              
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(ticket => (
                    <div key={ticket.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{ticket.type} Pass</span>
                        <button
                          onClick={() => removeFromCart(ticket.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-2xl font-bold text-pink-400 mb-2">${ticket.price}</div>
                      <div className="space-y-1">
                        {ticket.events.map(event => (
                          <div key={event.id} className="text-sm text-gray-300">
                            • {event.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-pink-400">${totalPrice}</span>
                    </div>
                  </div>
                  
                  {customerInfo.name && customerInfo.email && (
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 mt-4"
                    >
                      {loading ? 'Processing...' : 'Complete Purchase'}
                    </button>
                  )}
                  
                  {(!customerInfo.name || !customerInfo.email) && (
                    <div className="text-center text-sm text-gray-400 mt-4">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Please fill in your details to checkout
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalTicketingPlatform;