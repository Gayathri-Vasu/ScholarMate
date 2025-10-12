import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackItem {
  id: string;
  content: string;
  createdAt: string;
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState("");

  // Load feedbacks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("feedbacks");
    if (saved) setFeedbacks(JSON.parse(saved));
  }, []);

  // Save feedbacks to localStorage
  const saveFeedback = (content: string) => {
    const feedback: FeedbackItem = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
    };
    const updated = [feedback, ...feedbacks]; // latest first
    setFeedbacks(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));
    setNewFeedback("");
    setShowForm(false);
  };

  return (
    <div className="container mx-auto py-10">
      {/* Initial screen */}
      {!showForm && (
        <div className="text-center space-y-4">
          <img
            src="/course-thumbnails/thinking.jpg"
            alt="Thinking"
            className="w-32 h-32 mx-auto"
          />
          <h2 className="text-2xl font-bold text-black">
            We’d love your thoughts!
          </h2>
          <p className="text-gray-700">
            Share your suggestions so we can make ScholarMate even better.
          </p>
          <Button
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => setShowForm(true)}
          >
            Send Feedback
          </Button>
        </div>
      )}

      {/* Feedback form */}
      {showForm && (
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-black">Your Feedback</h3>
          <Textarea
            placeholder="Write your feedback here..."
            value={newFeedback}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewFeedback(e.target.value)}
            className="border border-gray-300 rounded-md shadow-sm w-full"
            rows={6}
          />
          <div className="flex justify-end">
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => saveFeedback(newFeedback)}
              disabled={!newFeedback.trim()}
            >
              Upload Feedback
            </Button>
          </div>
        </div>
      )}

      {/* Display feedbacks */}
      {feedbacks.length > 0 && (
        <div className="mt-10 max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-black">User Feedbacks</h3>
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <p className="text-black font-semibold">{fb.content}</p>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(fb.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
