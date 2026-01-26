interface AdPlaceholderProps {
  width?: number; // 横幅（デフォルト: 300）
  height?: number; // 高さ（デフォルト: 250）
  label?: string; // 表示テキスト（デフォルト: '広告表示エリア'）
}

export default function AdPlaceholder({
  width = 300,
  height = 250,
  label = '広告表示エリア',
}: AdPlaceholderProps) {
  return (
    <div
      className="bg-black rounded-md flex items-center justify-center"
      style={{ width, height }}
    >
      <span className="text-white text-sm">{label}</span>
    </div>
  );
}

