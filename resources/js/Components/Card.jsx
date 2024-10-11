export default function Card({ className = "", children, ...props }) {
    return (
        <div
            {...props}
            className={`rounded-md border border-gray-300 p-4 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 ${className}`}
        >
            {children}
        </div>
    );
}
