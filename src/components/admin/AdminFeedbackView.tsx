
import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Feedback } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface AdminFeedbackViewProps {
  feedback: Feedback[];
}

const AdminFeedbackView: React.FC<AdminFeedbackViewProps> = ({ feedback }) => {
  if (feedback.length === 0) {
    return (
      <Card className="bg-gray-800/20 border-gray-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-yellow-300" />
            Attendee Feedback
          </CardTitle>
          <CardDescription className="text-gray-400">
            No feedback has been submitted yet.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-500/50 mb-4" />
            <p className="text-gray-400">Waiting for feedback...</p>
        </CardContent>
      </Card>
    );
  }

  const averageRating = (feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
        <Card className="bg-gray-800/20 border-gray-700/40">
            <CardHeader>
                <CardTitle className="text-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-yellow-300" />
                    Feedback Summary
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold text-yellow-300">{averageRating}</div>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6" fill={i < Math.round(parseFloat(averageRating)) ? '#facc15' : 'none'} stroke={i < Math.round(parseFloat(averageRating)) ? '#facc15' : 'currentColor'} />
                        ))}
                    </div>
                    <div className="text-gray-400">Average rating from {feedback.length} review(s)</div>
                </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedback.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()).map(item => (
                <Card key={item.id} className="bg-gray-800/30 border-gray-700/50 flex flex-col">
                    <CardHeader className="pb-2">
                       <div className="flex justify-between items-center">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5" fill={i < item.rating ? '#facc15' : 'none'} stroke={i < item.rating ? '#facc15' : 'currentColor'} />
                                ))}
                            </div>
                            <p className="text-xs text-gray-400">{formatDistanceToNow(new Date(item.submittedAt), { addSuffix: true })}</p>
                       </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-gray-200">{item.comment || <em>No comment provided.</em>}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
};

export default AdminFeedbackView;

