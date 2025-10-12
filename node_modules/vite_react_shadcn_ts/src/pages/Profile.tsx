import { useState, useEffect, ChangeEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UserProfile {
  name: string;
  profilePhoto: string; // base64 string
  profession: string;
  age: number;
  studying: string;
  contact: string;
  email: string;
}

const defaultProfile: UserProfile = {
  name: "John Doe",
  profilePhoto: "",
  profession: "Student",
  age: 18,
  studying: "Science",
  contact: "",
  email: "user@gmail.com",
};

export default function Profile() {
  const { isLoggedIn } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user_profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prev) => ({ ...prev, profilePhoto: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    localStorage.setItem("user_profile", JSON.stringify(profile));
    setIsEditing(false);
  };

  if (!isLoggedIn)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg font-bold">
        Please login to view your profile.
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto p-6 bg-purple-100 shadow-lg rounded-xl border border-purple-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 mb-3 rounded-full overflow-hidden border-4 border-purple-300 shadow-md">
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-purple-200 flex items-center justify-center text-purple-400 font-bold">
                  No Photo
                </div>
              )}
            </div>
            {isEditing && (
              <Input type="file" accept="image/*" onChange={handlePhotoChange} className="text-sm" />
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Profession", name: "profession", type: "text" },
              { label: "Age", name: "age", type: "number" },
              { label: "Studying", name: "studying", type: "text" },
              { label: "Contact Number", name: "contact", type: "tel" },
              { label: "Email", name: "email", type: "email" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block mb-1 font-bold text-gray-700">{field.label}</label>
                <Input
                  type={field.type}
                  name={field.name}
                  value={profile[field.name as keyof UserProfile]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`bg-purple-50 border rounded-md ${
                    isEditing ? "border-purple-400" : "border-purple-300"
                  } shadow-sm font-bold focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50`}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            {!isEditing ? (
              <Button
                variant="outline"
                className="bg-purple-200 text-purple-700 hover:bg-purple-300 hover:text-purple-800 border border-purple-300"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-300"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-purple-600 text-white hover:bg-purple-700"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
