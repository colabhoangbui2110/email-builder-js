import React from 'react';

type Props = {
  paletteColors: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function Swatch({ paletteColors, value, onChange }: Props) {
  const renderButton = (colorValue: string) => {
    const isSelected = value === colorValue;
    return (
      <button
        key={colorValue}
        type="button"
        onClick={() => onChange(colorValue)}
        className={
          `w-6 h-6 rounded border transition-colors duration-150 ` +
          `mr-1 mb-1 ` +
          (isSelected ? 'border-black ring-2 ring-black' : 'border-gray-200')
        }
        style={{ backgroundColor: colorValue }}
        aria-label={colorValue}
      />
    );
  };
  return (
    <div className="w-full grid gap-1" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
      {paletteColors.map((c) => renderButton(c))}
    </div>
  );
}
