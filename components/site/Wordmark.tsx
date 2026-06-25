export function Wordmark({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <span className={`wordmark ${className}`} style={{ fontSize: size }}>
      Hotel&nbsp;<em>Marea</em>
    </span>
  );
}
