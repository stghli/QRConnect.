
import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface FeedbackScreenProps {
  onSubmit: (rating: number, comment: string) => void;
  onBack: () => void;
}

const StarRating = ({ rating, setRating }: { rating: number, setRating: (rating: number) => void }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        className="focus:outline-none"
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <Star
                            className="w-8 h-8 transition-colors duration-200"
                            fill={ratingValue <= (hover || rating) ? '#facc15' : 'none'}
                            stroke={ratingValue <= (hover || rating) ? '#facc15' : 'currentColor'}
                        />
                    </button>
                );
            })}
        </div>
    );
};

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onSubmit, onBack }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating.');
      return;
    }
    onSubmit(rating, comment);
    toast.success('Thank you for your feedback!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 animate-fade-in">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Share Your Feedback</CardTitle>
          <CardDescription>We'd love to hear your thoughts on the event.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rating">Overall Experience</Label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comments (optional)</Label>
            <Textarea
              id="comment"
              placeholder="Tell us more about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-transparent text-white"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="text-white">Back</Button>
          <Button onClick={handleSubmit} className="elegant-button text-white border-0">
            <Send className="w-4 h-4 mr-2" />
            Submit Feedback
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeedbackScreen;

