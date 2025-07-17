import { HiOutlineViewGrid } from 'react-icons/hi';
import clsx from 'clsx';

export default function JardinesLink({ isActive, navigate }) {
  return (
    <button
      onClick={() => navigate('/jardines')}
      className={clsx(
        'flex items-center gap-2 px-3 py-2 rounded-lg transition',
        isActive('/jardines')
          ? 'bg-green-50 text-green-700 font-semibold shadow'
          : 'hover:bg-gray-50 text-gray-700'
      )}
    >
      <HiOutlineViewGrid className="text-green-600" />
      Jardines
    </button>
  );
}