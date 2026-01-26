interface ImagePlaceholderProps {
  width?: number; // 横幅（デフォルト: 200）
  height?: number; // 高さ（デフォルト: 150）
  label?: string; // 表示テキスト（デフォルト: 'イラスト'）
}

export default function ImagePlaceholder({
  width = 200,
  height = 150,
  label = 'イラスト',
}: ImagePlaceholderProps) {
  return (
    <div
      className="bg-gray-200 rounded-lg flex items-center justify-center"
      style={{ width, height }}
    >
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
  );
}

