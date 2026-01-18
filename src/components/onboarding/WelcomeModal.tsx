import { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Trophy, Zap } from 'lucide-react';
import { Modal, Button } from '@/components/common';

const STORAGE_KEY = 'dsa-game-welcome-shown';

interface WelcomeModalProps {
  forceShow?: boolean;
  onClose?: () => void;
}

export function WelcomeModal({ forceShow = false, onClose }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (forceShow) {
      setIsOpen(true);
      return;
    }

    const hasSeenWelcome = localStorage.getItem(STORAGE_KEY);
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, [forceShow]);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
    onClose?.();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const steps = [
    {
      icon: <Sparkles className="w-12 h-12 text-accent-500" />,
      title: 'Welcome to DSA Learning Game!',
      description: 'Master Data Structures and Algorithms through interactive challenges and games.',
      color: 'from-primary-500 to-accent-500',
    },
    {
      icon: <BookOpen className="w-12 h-12 text-primary-500" />,
      title: 'Learn by Doing',
      description: 'Complete quizzes, solve traversal challenges, match real-world applications, and fill in code blanks.',
      color: 'from-primary-500 to-blue-500',
    },
    {
      icon: <Trophy className="w-12 h-12 text-amber-500" />,
      title: 'Track Your Progress',
      description: 'Earn points, build streaks, and achieve a passing score of 70% in each module.',
      color: 'from-amber-500 to-coral-500',
    },
    {
      icon: <Zap className="w-12 h-12 text-mint-500" />,
      title: "Let's Get Started!",
      description: 'Choose a module from the menu and begin your learning journey.',
      color: 'from-mint-500 to-success-500',
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      showCloseButton={false}
      closeOnBackdrop={false}
      variant="celebration"
    >
      <div className="text-center py-4">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === currentStep
                  ? 'w-6 bg-gradient-to-r ' + currentStepData.color
                  : index < currentStep
                    ? 'bg-gray-400'
                    : 'bg-gray-200'}
              `}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4 animate-bounce-in">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${currentStepData.color} bg-opacity-10`}>
            {currentStepData.icon}
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3 animate-fade-in">
          {currentStepData.title}
        </h2>
        <p className="text-gray-600 mb-8 animate-fade-in">
          {currentStepData.description}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            variant="gradient"
            onClick={handleNext}
            className={currentStep === 0 ? 'w-full' : 'flex-1'}
            bounce
          >
            {currentStep === steps.length - 1 ? "Let's Go!" : 'Next'}
          </Button>
        </div>

        {/* Skip link */}
        {currentStep < steps.length - 1 && (
          <button
            onClick={handleClose}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip intro
          </button>
        )}
      </div>
    </Modal>
  );
}

export default WelcomeModal;
