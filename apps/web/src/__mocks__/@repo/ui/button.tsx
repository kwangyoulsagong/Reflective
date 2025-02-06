export const Button = ({ children, onClick, variant }: any) => (
  <button onClick={onClick} data-variant={variant}>
    {children}
  </button>
);
