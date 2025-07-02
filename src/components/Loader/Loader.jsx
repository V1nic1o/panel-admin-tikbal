// src/components/Loader.jsx
import { FaSpinner } from 'react-icons/fa';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-60 w-full">
      <FaSpinner className="animate-spin text-3xl text-primary" />
    </div>
  );
}