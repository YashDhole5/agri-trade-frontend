
import React, { useState } from 'react';
import { Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const AIAssistant = ({ userRole = 'farmer' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: userRole === 'farmer' 
        ? "Hello! I'm your farming assistant. I can help you with crop management, pricing strategies, and agricultural best practices. How can I assist you today?"
        : "Hello! I'm your dealer assistant. I can help you find the best crops, negotiate prices, and manage your orders. What would you like to know?"
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQuestions = userRole === 'farmer' ? [
    "What's the best time to plant rice?",
    "How do I price my crops competitively?",
    "What are common crop diseases?",
    "How to improve soil quality?",
    "Best practices for crop storage?"
  ] : [
    "How to find quality crops?",
    "What's a fair price for wheat?",
    "How to verify farmer credentials?",
    "Best payment methods for farmers?",
    "Seasonal crop availability?"
  ];

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage.trim();
    setCurrentMessage('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage, userRole);
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question, role) => {
    // Simple response generator - replace with actual AI API
    const farmerResponses = {
      'rice': "For rice cultivation, the best planting time is during monsoon season (June-July). Ensure proper water management and use quality seeds. Consider soil pH levels between 5.5-6.5 for optimal growth.",
      'price': "To price competitively, research local market rates, consider crop quality, seasonal demand, and transportation costs. Use our platform's price analytics for better insights.",
      'disease': "Common crop diseases include blast, blight, and rust. Prevention includes crop rotation, proper spacing, organic pesticides, and regular field inspection.",
      'soil': "Improve soil quality through organic compost, proper drainage, cover crops, and regular soil testing. Avoid over-fertilization and maintain proper pH levels.",
      'storage': "Proper storage requires dry, ventilated spaces, pest control, moisture management, and regular quality checks. Use proper containers and avoid direct ground contact."
    };

    const dealerResponses = {
      'quality': "Look for crops with proper certification, check for pest damage, verify harvest dates, and inspect storage conditions. Our quality rating system helps you identify premium crops.",
      'wheat': "Current wheat prices range from ₹20-25/kg depending on quality and location. Check our real-time pricing dashboard for accurate market rates in your area.",
      'verify': "Verify farmers through our platform's rating system, check their certification documents, review past transaction history, and read feedback from other dealers.",
      'payment': "Secure payment options include online banking, UPI, digital wallets, and our escrow service. We recommend using platform-mediated payments for security.",
      'seasonal': "Seasonal availability varies by region. Kharif crops (rice, cotton) are available post-monsoon, while Rabi crops (wheat, mustard) are available in spring."
    };

    const responses = role === 'farmer' ? farmerResponses : dealerResponses;
    
    for (const [key, response] of Object.entries(responses)) {
      if (question.toLowerCase().includes(key)) {
        return response;
      }
    }

    return role === 'farmer' 
      ? "I understand your farming concern. For specific agricultural advice, I recommend consulting with local agricultural experts or extension services. You can also explore our resource center for detailed guides."
      : "That's a great question about dealing! I suggest checking our marketplace analytics and connecting with successful dealers in our community forum for detailed insights.";
  };

  const handleQuickQuestion = (question) => {
    setCurrentMessage(question);
  };

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <div className="ai-assistant">
        <Button
          variant={userRole === 'farmer' ? 'success' : 'primary'}
          size="lg"
          className="rounded-circle shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: '60px', height: '60px' }}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} className="icon-bounce" />}
        </Button>
      </div>

      {/* AI Chat Interface */}
      {isOpen && (
        <Card 
          className="position-fixed shadow-lg ai-chat-bubble"
          style={{
            bottom: '100px',
            right: '20px',
            width: '350px',
            maxHeight: '500px',
            zIndex: 999
          }}
        >
          <Card.Header className={`bg-${userRole === 'farmer' ? 'success' : 'primary'} text-white d-flex align-items-center`}>
            <Bot size={20} className="me-2" />
            <h6 className="mb-0">
              {userRole === 'farmer' ? '🌾 Farm Assistant' : '🤝 Deal Assistant'}
            </h6>
          </Card.Header>

          <Card.Body 
            className="p-0" 
            style={{ height: '300px', overflowY: 'auto' }}
          >
            <div className="p-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`d-flex mb-3 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div className="d-flex align-items-start" style={{ maxWidth: '80%' }}>
                    {message.type === 'ai' && (
                      <div className={`bg-${userRole === 'farmer' ? 'success' : 'primary'} text-white rounded-circle p-1 me-2 flex-shrink-0`}>
                        <Bot size={16} />
                      </div>
                    )}
                    <div
                      className={`p-2 rounded ${
                        message.type === 'user'
                          ? 'bg-light text-dark'
                          : userRole === 'farmer'
                          ? 'bg-success-subtle'
                          : 'bg-primary-subtle'
                      }`}
                    >
                      <small>{message.content}</small>
                    </div>
                    {message.type === 'user' && (
                      <div className="bg-secondary text-white rounded-circle p-1 ms-2 flex-shrink-0">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="d-flex justify-content-start mb-3">
                  <div className="d-flex align-items-center">
                    <div className={`bg-${userRole === 'farmer' ? 'success' : 'primary'} text-white rounded-circle p-1 me-2`}>
                      <Bot size={16} />
                    </div>
                    <div className="bg-light p-2 rounded">
                      <Spinner animation="grow" size="sm" className="me-1" />
                      <Spinner animation="grow" size="sm" className="me-1" />
                      <Spinner animation="grow" size="sm" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card.Body>

          <Card.Footer className="p-2">
            {/* Quick Questions */}
            <div className="mb-2">
              <small className="text-muted">Quick questions:</small>
              <div className="d-flex flex-wrap gap-1 mt-1">
                {predefinedQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline-secondary"
                    size="sm"
                    className="text-truncate"
                    style={{ fontSize: '0.7rem', maxWidth: '100px' }}
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question.split(' ').slice(0, 3).join(' ')}...
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Ask me anything..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                size="sm"
                disabled={isLoading}
              />
              <Button
                variant={userRole === 'farmer' ? 'success' : 'primary'}
                size="sm"
                className="ms-1"
                onClick={handleSendMessage}
                disabled={isLoading || !currentMessage.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
