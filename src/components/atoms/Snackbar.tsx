import { useTimeout } from '../../hooks/useTimeout';

interface SnackbarProps {
  message: string;
  duration?: number;
  show: boolean;
  onClose: () => void;
}

const Snackbar = ({ message, duration = 6000, show, onClose }: SnackbarProps) => {
  useTimeout({
    callback: onClose,
    duration,
    condition: show
  });

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out z-50">
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Snackbar;
