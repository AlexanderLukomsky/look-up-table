import { FC, useState, memo, HTMLInputTypeAttribute } from 'react';
import { divStyle, inputStyle } from './style';

export const EditableText: FC<EditableTextProps> = memo(
  ({ type = 'text', children, onChange, onBlur }) => {
    const [editMode, setEditMode] = useState(false);

    const handleBlur = async () => {
      await onBlur();
      setEditMode(false);
    };

    return editMode ? (
      <input
        style={inputStyle}
        type={type}
        value={children}
        onChange={(e) => onChange(e.currentTarget.value)}
        onBlur={handleBlur}
      />
    ) : (
      <div style={divStyle} role="presentation" onClick={() => setEditMode(true)}>
        {children}
      </div>
    );
  },
);

type EditableTextProps = {
  type?: HTMLInputTypeAttribute;
  children: string;
  onChange: (value: string) => void;
  onBlur: () => void | Promise<unknown>;
};

EditableText.displayName = 'EditableText';
