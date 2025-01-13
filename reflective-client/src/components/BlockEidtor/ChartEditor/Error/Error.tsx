interface ErrorMessageProps {
  message: string;
}

const Error: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{message}</div>
  );
};
export default Error;
