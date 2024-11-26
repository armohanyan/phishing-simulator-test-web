import React, {useState, useEffect} from 'react';
import axiosInstance from '../utils/axiosInstance'; // Import your configured Axios instance
import {toast} from 'react-toastify';
import Input from "../components/ui/Input";
import Button from "../components/ui/Button"; // For notifications

export default function PhishingSimulation() {
  const [phishingAttempts, setPhishingAttempts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPhishingAttempts = async () => {
    setLoading(true);
    try {
      const {data} = await axiosInstance.get('/phishing/attempts');
      setPhishingAttempts(data);
    } catch (error) {
      toast.error(error.response?.data?.message  || 'Failed to fetch phishing attempts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch phishing attempts on component mount
  useEffect(() => {
    fetchPhishingAttempts();
  }, []);

  // Handle form submission
  const handleSimulate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email')
    if (!email) {
      toast.error('Please enter a valid email address');
      return;
    }
    try {
      setLoading(true);
      const {data} = await axiosInstance.post('/phishing/send', {email});
      toast.success('Phishing attempt triggered successfully');
      setPhishingAttempts((prev) => [...prev, data]); // Add new attempt to the table
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to simulate phishing attempt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Phishing Simulation</h1>
      <form className="mb-6 flex gap-4 items-end" onSubmit={handleSimulate}>
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
        />
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Simulating...' : 'Simulate'}
        </Button>
      </form>
      <h2 className="text-xl font-bold">Phishing Attempts</h2>
      <table className="w-full mt-4 border-collapse">
        <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Recipient Email</th>
          <th className="border px-4 py-2">Email Content</th>
          <th className="border px-4 py-2">Status</th>
        </tr>
        </thead>
        <tbody>
        {phishingAttempts.length > 0 ? (
          phishingAttempts.map((attempt) => (
            <tr key={attempt.id}>
              <td className="border px-4 py-2">{attempt.id}</td>
              <td className="border px-4 py-2">{attempt.email}</td>
              <td className="border px-4 py-2">{attempt.content}</td>
              <td className="border px-4 py-2">{attempt.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="border px-4 py-2" colSpan="3">
              {loading ? 'Loading...' : 'No phishing attempts recorded yet'}
            </td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}
