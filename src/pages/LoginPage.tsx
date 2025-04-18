import React, { useState, useRef, useEffect } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types for TypeScript
interface CaptchaData {
  type: string;
  question: string;
  answer: string | number | number[];
}

const LoginPage: React.FC = () => {
  // Original login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Captcha states
  const [captchaStep, setCaptchaStep] = useState<boolean>(true); // true = show captcha, false = show login
  const [currentCaptchaIndex, setCurrentCaptchaIndex] = useState<number>(0);
  const [captchaData, setCaptchaData] = useState<CaptchaData[]>([]);
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [captchaError, setCaptchaError] = useState<string>('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [captchasPassed, setCaptchasPassed] = useState<number>(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  // Generate captcha data on component mount
  useEffect(() => {
    generateCaptchaSequence();
  }, []);

  // Reset captcha input when changing captcha
  useEffect(() => {
    setCaptchaInput('');
    setSelectedCheckboxes([]);
    setSliderValue(50);
    setCaptchaError('');
    
    if (captchaData[currentCaptchaIndex]?.type === 'text') {
      drawTextCaptcha();
    }
  }, [currentCaptchaIndex, captchaData]);

  // Function to generate a sequence of 5 different captchas
  const generateCaptchaSequence = () => {
    const captchas: CaptchaData[] = [
      generateMathCaptcha(),
      generateTextCaptcha(),
      generateImagePatternCaptcha(),
      generateSliderCaptcha(),
      generateCheckboxPatternCaptcha()
    ];
    
    // Shuffle the captchas
    const shuffledCaptchas = [...captchas].sort(() => Math.random() - 0.5);
    setCaptchaData(shuffledCaptchas);
  };

  // Generate math captcha (e.g., "2 + 3 = ?")
  const generateMathCaptcha = (): CaptchaData => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer: number;
    let question: string;
    
    switch(operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case '-':
        // Ensure positive result
        if (num1 >= num2) {
          answer = num1 - num2;
          question = `${num1} - ${num2} = ?`;
        } else {
          answer = num2 - num1;
          question = `${num2} - ${num1} = ?`;
        }
        break;
      case '*':
        answer = num1 * num2;
        question = `${num1} × ${num2} = ?`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
    }
    
    return { type: 'math', question, answer: answer.toString() };
  };

  // Generate text captcha (random text to be entered)
  const generateTextCaptcha = (): CaptchaData => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    const length = 6;
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return { type: 'text', question: result, answer: result };
  };

  // Generate image pattern captcha
  const generateImagePatternCaptcha = (): CaptchaData => {
    const patterns = [
      { desc: "Select all squares with circles", answer: [0, 3, 6] },
      { desc: "Select all squares with triangles", answer: [1, 4, 7] },
      { desc: "Select all squares with squares", answer: [2, 5, 8] }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    return { type: 'pattern', question: selected.desc, answer: selected.answer };
  };

  // Generate slider captcha
  const generateSliderCaptcha = (): CaptchaData => {
    const targetValue = Math.floor(Math.random() * 91) + 5; // 5-95 range
    return { type: 'slider', question: `Move the slider to exactly ${targetValue}`, answer: targetValue };
  };

  // Generate checkbox pattern captcha
  const generateCheckboxPatternCaptcha = (): CaptchaData => {
    const patterns = [
      { desc: "Select boxes in a diagonal pattern from top-left to bottom-right", answer: [0, 4, 8] },
      { desc: "Select boxes in a diagonal pattern from top-right to bottom-left", answer: [2, 4, 6] },
      { desc: "Select the middle row of boxes", answer: [3, 4, 5] },
      { desc: "Select the middle column of boxes", answer: [1, 4, 7] }
    ];
    
    const selected = patterns[Math.floor(Math.random() * patterns.length)];
    return { type: 'checkbox', question: selected.desc, answer: selected.answer };
  };

  // Draw text captcha on canvas
  const drawTextCaptcha = () => {
    if (!canvasRef.current || !captchaData[currentCaptchaIndex]) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the text
    const captchaText = captchaData[currentCaptchaIndex].question;
    ctx.font = 'bold 24px sans-serif';
    
    // Add some noise and distortion
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`;
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    
    // Draw each character with different styles
    let xPos = 15;
    for (let i = 0; i < captchaText.length; i++) {
      // Random rotation
      ctx.save();
      ctx.translate(xPos, 30);
      ctx.rotate((Math.random() - 0.5) * 0.3);
      
      // Random color
      ctx.fillStyle = `rgb(${Math.floor(Math.random() * 80)},${Math.floor(Math.random() * 80)},${Math.floor(Math.random() * 80)})`;
      
      // Draw the character
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
      
      xPos += 20 + Math.random() * 10;
    }
    
    // Add some random lines
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  // Toggle checkbox selection
  const toggleCheckbox = (index: number) => {
    if (selectedCheckboxes.includes(index)) {
      setSelectedCheckboxes(selectedCheckboxes.filter(i => i !== index));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, index]);
    }
  };

  // Verify captcha input
  const verifyCaptcha = () => {
    setCaptchaError('');
    const currentCaptcha = captchaData[currentCaptchaIndex];
    
    if (!currentCaptcha) return;
    
    let isValid = false;
    
    switch (currentCaptcha.type) {
      case 'math':
      case 'text':
        isValid = captchaInput === currentCaptcha.answer;
        break;
        
      case 'pattern':
      case 'checkbox':
        // Compare arrays (need to sort for comparison)
        const sortedSelected = [...selectedCheckboxes].sort((a, b) => a - b);
        const sortedAnswer = [...(currentCaptcha.answer as number[])].sort((a, b) => a - b);
        isValid = sortedSelected.length === sortedAnswer.length && 
                 sortedSelected.every((value, index) => value === sortedAnswer[index]);
        break;
        
      case 'slider':
        // Allow a small margin of error for slider
        const targetValue = currentCaptcha.answer as number;
        isValid = Math.abs(sliderValue - targetValue) <= 2;
        break;
    }
    
    if (isValid) {
      // Increment captchas passed counter
      const newCaptchasPassed = captchasPassed + 1;
      setCaptchasPassed(newCaptchasPassed);
      
      if (newCaptchasPassed >= 5) {
        // All captchas passed, show login form
        setCaptchaStep(false);
      } else {
        // Move to next captcha
        setCurrentCaptchaIndex(newCaptchasPassed);
      }
    } else {
      setCaptchaError('Incorrect. Please try again.');
      
      // Generate a new captcha of the same type
      const newCaptcha = (() => {
        switch (currentCaptcha.type) {
          case 'math': return generateMathCaptcha();
          case 'text': return generateTextCaptcha();
          case 'pattern': return generateImagePatternCaptcha();
          case 'slider': return generateSliderCaptcha();
          case 'checkbox': return generateCheckboxPatternCaptcha();
          default: return generateTextCaptcha();
        }
      })();
      
      // Replace current captcha with new one
      const updatedCaptchas = [...captchaData];
      updatedCaptchas[currentCaptchaIndex] = newCaptcha;
      setCaptchaData(updatedCaptchas);
    }
  };

  // Handle login/register form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = isRegistering
        ? 'http://localhost:3002/api/auth/register' // Register endpoint
        : 'http://localhost:3002/api/auth/login';   // Login endpoint

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe })
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`${isRegistering ? 'Registration' : 'Login'} successful`, data);
        
        if (isRegistering) {
          // Registration successful, show success message
          setRegistrationSuccess(true);
          setTimeout(() => {
            setRegistrationSuccess(false);
            setIsRegistering(false); // Switch to login mode
          }, 3000); // Hide message after 3 seconds
        } else {
          // For login, store JWT token and redirect to home page
          localStorage.setItem('token', data.token); // Store the token
          navigate('/'); // Redirect to home page
        }
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset captcha sequence
  const resetCaptchas = () => {
    setCaptchaStep(true);
    setCurrentCaptchaIndex(0);
    setCaptchasPassed(0);
    generateCaptchaSequence();
  };

  // Render current captcha
  const renderCaptcha = () => {
    const currentCaptcha = captchaData[currentCaptchaIndex];
    
    if (!currentCaptcha) return null;
    
    switch (currentCaptcha.type) {
      case 'math':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Solve this math problem</h3>
            <div className="text-2xl font-bold text-center mb-4">{currentCaptcha.question}</div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter your answer"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              type="button"
              onClick={verifyCaptcha}
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
          </div>
        );
        
      case 'text':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Enter the text you see</h3>
            <canvas 
              ref={canvasRef} 
              width="200" 
              height="60" 
              className="border border-gray-300 rounded-md mb-4 mx-auto"
            />
            <div className="flex mb-4">
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter the text above"
                className="flex-grow p-2 border border-gray-300 rounded-l-md"
              />
              <button
                type="button"
                onClick={() => {
                  const newCaptcha = generateTextCaptcha();
                  const updatedCaptchas = [...captchaData];
                  updatedCaptchas[currentCaptchaIndex] = newCaptcha;
                  setCaptchaData(updatedCaptchas);
                }}
                className="bg-gray-200 p-2 rounded-r-md hover:bg-gray-300"
              >
                <RefreshCw size={20} />
              </button>
            </div>
            <button
              type="button"
              onClick={verifyCaptcha}
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
          </div>
        );
        
      case 'pattern':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">{currentCaptcha.question}</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Array(9).fill(null).map((_, index) => (
                <div
                  key={index}
                  onClick={() => toggleCheckbox(index)}
                  className={`w-16 h-16 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer ${
                    selectedCheckboxes.includes(index) ? 'bg-blue-200 border-blue-500' : 'bg-white'
                  }`}
                >
                  {/* Display different shapes based on index */}
                  {index % 3 === 0 && (
                    <div className="w-8 h-8 rounded-full border-2 border-gray-600"></div> // Circle
                  )}
                  {index % 3 === 1 && (
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-gray-600"></div> // Triangle
                  )}
                  {index % 3 === 2 && (
                    <div className="w-8 h-8 border-2 border-gray-600"></div> // Square
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={verifyCaptcha}
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
          </div>
        );
        
      case 'slider':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">{currentCaptcha.question}</h3>
            <div className="mb-2 text-center text-xl font-bold">{sliderValue}</div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full mb-4"
            />
            <button
              type="button"
              onClick={verifyCaptcha}
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">{currentCaptcha.question}</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Array(9).fill(null).map((_, index) => (
                <div
                  key={index}
                  onClick={() => toggleCheckbox(index)}
                  className={`w-16 h-16 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer ${
                    selectedCheckboxes.includes(index) ? 'bg-blue-200 border-blue-500' : 'bg-white'
                  }`}
                >
                  {selectedCheckboxes.includes(index) && (
                    <CheckCircle className="text-blue-500" size={24} />
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={verifyCaptcha}
              className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Verify
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {captchaStep 
            ? `Security Check (${captchasPassed + 1}/5)`
            : (isRegistering ? 'Create an account' : 'Sign in to your account')
          }
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Show captcha verification first */}
        {captchaStep ? (
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {captchaError && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <div className="text-sm text-red-700">{captchaError}</div>
                </div>
              </div>
            )}
            
            {renderCaptcha()}
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">
                <span className="text-gray-500">
                  Captcha {currentCaptchaIndex + 1} of 5
                </span>
              </div>
              
              <button
                type="button"
                onClick={resetCaptchas}
                className="text-sm text-blue-900 hover:text-blue-700"
              >
                Reset captchas
              </button>
            </div>
          </div>
        ) : (
          // Show login/register form after captcha verification
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                </div>
              )}

              {registrationSuccess && (
                <div className="rounded-md bg-green-50 p-4 mb-4">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <div className="text-sm text-green-700">Registration successful! Please log in.</div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-900 focus:border-blue-500 sm:text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? 
                      <EyeOff className="h-5 w-5 text-gray-400" /> : 
                      <Eye className="h-5 w-5 text-gray-400" />
                    }
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-900 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-900 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      {isRegistering ? 'Register' : 'Sign in'}
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm font-medium text-blue-900 hover:text-blue-500"
              >
                {isRegistering ? 'Already have an account? Sign in' : 'Don\'t have an account? Register'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;