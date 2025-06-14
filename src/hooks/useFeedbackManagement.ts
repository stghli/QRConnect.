
import { useState, useEffect } from 'react';
import type { Feedback } from '../types';

export const useFeedbackManagement = () => {
  const [feedback, setFeedback] = useState<Feedback[]>(() => {
    try {
      const storedFeedback = window.localStorage.getItem('feedback');
      if (storedFeedback) {
        return JSON.parse(storedFeedback).map((f: Omit<Feedback, 'submittedAt'> & { submittedAt: string }) => ({
          ...f,
          submittedAt: new Date(f.submittedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error("Failed to read feedback from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('feedback', JSON.stringify(feedback));
    } catch (error) {
      console.error("Failed to write feedback to localStorage", error);
    }
  }, [feedback]);

  const addFeedback = (rating: number, comment: string) => {
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      rating,
      comment,
      submittedAt: new Date(),
    };
    setFeedback(prev => [...prev, newFeedback]);
  };

  return { feedback, addFeedback };
};

