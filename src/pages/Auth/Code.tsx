import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ ajout de useNavigate

const EnterVerificationCode: React.FC = () => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '']);
  const [timer, setTimer] = useState<number>(300); // 5min
  const navigate = useNavigate(); // ✅ hook de navigation

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
      if (value && index < 4) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');
    console.log('Code soumis:', code);

    // ✅ Redirection automatique sans vérification
    navigate('/DashboardAdmin');
  };

  const resendCode = () => {
    console.log('Renvoyer le code à l\'email');
    setTimer(300);
  };

  return (
    <div className="min-h-screen  w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter verification code</h2>
        <p className="text-gray-600 mb-6">
          Nous avons en envoyé un code de vérification envoyé par mail{' '}
          <span className="font-semibold text-blue-600">kassandrakakanakou@gmail.com</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {digits.map((digit, index) => (
              <input
                key={index}
                id={`digit-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-2xl font-medium"
                autoFocus={index === 0}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm">
            Resend code in {timer} seconds
          </p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Verify
          </button>
          <button
            onClick={resendCode}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition duration-300 mt-2"
            disabled={timer > 0}
          >
            Resend Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterVerificationCode;
