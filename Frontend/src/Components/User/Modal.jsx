export default function Modal({ open, onClose, type, title, text, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex justify-center items-center z-50">
      <div className="bg-gradient-to-tr from-indigo-500 to-purple-700 border-2 border-white/30 rounded-2xl p-8 text-center w-11/12 max-w-md">
        <div className="text-5xl mb-3">
          {type === "warning" ? "⚠️" : "✅"}
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-white/90 mb-6">{text}</p>
        {children}
      </div>
    </div>
  );
}
